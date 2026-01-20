"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, Locate, Maximize } from "lucide-react";

type MapContextValue = {
  map: maplibregl.Map | null;
  isLoaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

type MapProps = {
  children?: ReactNode;
  className?: string;
} & Omit<maplibregl.MapOptions, "container" | "style">;

type MapRef = maplibregl.Map;

const Map = forwardRef<MapRef, MapProps>(function Map(
  { children, className = "", ...props },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useImperativeHandle(ref, () => mapInstance as maplibregl.Map, [mapInstance]);

  useEffect(() => {
    if (!containerRef.current || mapInstance) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [-0.1278, 51.5074], // London [lng, lat]
      zoom: 12,
      attributionControl: {
        compact: true,
      },
      ...props,
    });

    map.on("load", () => setIsLoaded(true));
    setMapInstance(map);

    return () => {
      map.remove();
      setIsLoaded(false);
      setMapInstance(null);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      map: mapInstance,
      isLoaded,
    }),
    [mapInstance, isLoaded]
  );

  return (
    <MapContext.Provider value={contextValue}>
      <div ref={containerRef} className={`w-full h-full ${className}`}>
        {mapInstance && children}
      </div>
    </MapContext.Provider>
  );
});

// Marker Context
type MarkerContextValue = {
  marker: maplibregl.Marker;
  map: maplibregl.Map | null;
};

const MarkerContext = createContext<MarkerContextValue | null>(null);

function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}

type MapMarkerProps = {
  longitude: number;
  latitude: number;
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  draggable?: boolean;
  onDragEnd?: (lngLat: { lng: number; lat: number }) => void;
};

function MapMarker({
  longitude,
  latitude,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  draggable = false,
  onDragEnd,
}: MapMarkerProps) {
  const { map } = useMap();

  const marker = useMemo(() => {
    const markerInstance = new maplibregl.Marker({
      element: document.createElement("div"),
      draggable,
    }).setLngLat([longitude, latitude]);

    const handleClick = (e: MouseEvent) => onClick?.(e);
    const handleMouseEnter = (e: MouseEvent) => onMouseEnter?.(e);
    const handleMouseLeave = (e: MouseEvent) => onMouseLeave?.(e);

    markerInstance.getElement()?.addEventListener("click", handleClick);
    markerInstance.getElement()?.addEventListener("mouseenter", handleMouseEnter);
    markerInstance.getElement()?.addEventListener("mouseleave", handleMouseLeave);

    if (onDragEnd) {
      markerInstance.on("dragend", () => {
        const lngLat = markerInstance.getLngLat();
        onDragEnd({ lng: lngLat.lng, lat: lngLat.lat });
      });
    }

    return markerInstance;
  }, []);

  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => {
      marker.remove();
    };
  }, [map, marker]);

  // Update marker position if props change
  if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
    marker.setLngLat([longitude, latitude]);
  }
  if (marker.isDraggable() !== draggable) {
    marker.setDraggable(draggable);
  }

  return (
    <MarkerContext.Provider value={{ marker, map }}>
      {children}
    </MarkerContext.Provider>
  );
}

type MarkerContentProps = {
  children?: ReactNode;
  className?: string;
};

function MarkerContent({ children, className = "" }: MarkerContentProps) {
  const { marker } = useMarkerContext();

  return createPortal(
    <div className={`relative cursor-pointer ${className}`}>
      {children || <DefaultMarkerIcon />}
    </div>,
    marker.getElement()
  );
}

function DefaultMarkerIcon() {
  return (
    <div className="relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
  );
}

type MarkerPopupProps = {
  children: ReactNode;
  className?: string;
  offset?: number;
};

function MarkerPopup({ children, className = "", offset = 16 }: MarkerPopupProps) {
  const { marker, map } = useMarkerContext();
  const container = useMemo(() => document.createElement("div"), []);

  const popup = useMemo(() => {
    return new maplibregl.Popup({
      offset,
      closeButton: false,
    })
      .setMaxWidth("none")
      .setDOMContent(container);
  }, [offset, container]);

  useEffect(() => {
    if (!map) return;
    popup.setDOMContent(container);
    marker.setPopup(popup);
    return () => {
      marker.setPopup(null);
    };
  }, [map, popup, marker, container]);

  return createPortal(
    <div className={`relative rounded-lg border bg-white p-3 shadow-lg ${className}`}>
      {children}
    </div>,
    container
  );
}

type MapControlsProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showZoom?: boolean;
  showLocate?: boolean;
  showFullscreen?: boolean;
  className?: string;
  onLocate?: (coords: { longitude: number; latitude: number }) => void;
};

const positionClasses = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-10 right-2",
};

function MapControls({
  position = "bottom-right",
  showZoom = true,
  showLocate = false,
  showFullscreen = false,
  className = "",
  onLocate,
}: MapControlsProps) {
  const { map } = useMap();
  const [waitingForLocation, setWaitingForLocation] = useState(false);

  const handleZoomIn = useCallback(() => {
    map?.zoomTo(map.getZoom() + 1, { duration: 300 });
  }, [map]);

  const handleZoomOut = useCallback(() => {
    map?.zoomTo(map.getZoom() - 1, { duration: 300 });
  }, [map]);

  const handleLocate = useCallback(() => {
    setWaitingForLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          };
          map?.flyTo({
            center: [coords.longitude, coords.latitude],
            zoom: 14,
            duration: 1500,
          });
          onLocate?.(coords);
          setWaitingForLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setWaitingForLocation(false);
        }
      );
    }
  }, [map, onLocate]);

  const handleFullscreen = useCallback(() => {
    const container = map?.getContainer();
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }, [map]);

  return (
    <div className={`absolute z-10 flex flex-col gap-1.5 ${positionClasses[position]} ${className}`}>
      {showZoom && (
        <div className="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
          <button
            onClick={handleZoomIn}
            aria-label="Zoom in"
            type="button"
            className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="border-t border-gray-200"></div>
          <button
            onClick={handleZoomOut}
            aria-label="Zoom out"
            type="button"
            className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      )}
      {showLocate && (
        <div className="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
          <button
            onClick={handleLocate}
            aria-label="Find my location"
            disabled={waitingForLocation}
            type="button"
            className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <Locate className="w-4 h-4" />
          </button>
        </div>
      )}
      {showFullscreen && (
        <div className="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
          <button
            onClick={handleFullscreen}
            aria-label="Toggle fullscreen"
            type="button"
            className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 transition-colors"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

type MapRouteProps = {
  id?: string;
  coordinates: [number, number][]; // [lng, lat]
  color?: string;
  width?: number;
  opacity?: number;
  dashArray?: [number, number];
};

function MapRoute({
  id: propId,
  coordinates,
  color = "#4f46e5",
  width = 4,
  opacity = 0.8,
  dashArray,
}: MapRouteProps) {
  const { map, isLoaded } = useMap();
  const autoId = useId();
  const id = propId ?? autoId;
  const sourceId = `route-source-${id}`;
  const layerId = `route-layer-${id}`;

  useEffect(() => {
    if (!isLoaded || !map) return;

    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: [] },
      },
    });

    map.addLayer({
      id: layerId,
      type: "line",
      source: sourceId,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": color,
        "line-width": width,
        "line-opacity": opacity,
        ...(dashArray && { "line-dasharray": dashArray }),
      },
    });

    return () => {
      try {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
        // ignore
      }
    };
  }, [isLoaded, map, sourceId, layerId, color, width, opacity, dashArray]);

  useEffect(() => {
    if (!isLoaded || !map || coordinates.length < 2) return;

    const source = map.getSource(sourceId) as maplibregl.GeoJSONSource;
    if (source) {
      source.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates },
      });

      // Fit bounds to show entire route
      const bounds = new maplibregl.LngLatBounds();
      coordinates.forEach((coord) => bounds.extend(coord as [number, number]));
      map.fitBounds(bounds, {
        padding: { top: 100, bottom: 100, left: 50, right: 50 },
      });
    }
  }, [isLoaded, map, coordinates, sourceId]);

  return null;
}

export { Map, MapMarker, MarkerContent, MarkerPopup, MapControls, MapRoute, useMap };
