import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import driversData from '@/data/drivers.json';

// Custom marker icons using CDN
const DriverIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const PickupIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNCIgZmlsbD0iIzBmMTcyYSIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjYiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

const DestinationIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNCIgZmlsbD0iI2Q0YWYzNyIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjYiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

interface MapProps {
  center?: [number, number];
  zoom?: number;
  showDrivers?: boolean;
  showRoute?: boolean;
  pickup?: [number, number];
  destination?: [number, number];
  driverLocation?: [number, number];
}

const Map: React.FC<MapProps> = ({ 
  center = [51.5074, -0.1278], // London center
  zoom = 13,
  showDrivers = true,
  showRoute = false,
  pickup,
  destination,
  driverLocation
}) => {
  // Route coordinates (simulated path)
  const routeCoordinates: [number, number][] = pickup && destination ? [
    pickup,
    ...(driverLocation ? [driverLocation] : []),
    destination
  ] : [];

  return (
    <div className="h-full w-full">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        touchZoom={true}
        doubleClickZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Route line */}
        {showRoute && routeCoordinates.length > 0 && (
          <>
            <Polyline 
              positions={routeCoordinates} 
              color="#4f46e5"
              weight={4}
              opacity={0.8}
              dashArray="10, 10"
            />
            
            {/* Pickup marker */}
            {pickup && (
              <Marker position={pickup} icon={PickupIcon}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-sm">Pickup Location</h3>
                    <p className="text-xs text-gray-600">15 Baker Street, London</p>
                  </div>
                </Popup>
              </Marker>
            )}
            
            {/* Destination marker */}
            {destination && (
              <Marker position={destination} icon={DestinationIcon}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-sm">Destination</h3>
                    <p className="text-xs text-gray-600">Heathrow Airport</p>
                  </div>
                </Popup>
              </Marker>
            )}
            
            {/* Driver current location */}
            {driverLocation && (
              <>
                <Marker position={driverLocation} icon={DriverIcon}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-sm">Nguyễn Quân</h3>
                      <p className="text-xs text-gray-600">Mercedes E-Class</p>
                      <p className="text-xs text-green-600 font-semibold">Arriving in 5 mins</p>
                    </div>
                  </Popup>
                </Marker>
                <Circle 
                  center={driverLocation} 
                  radius={200} 
                  fillColor="#4f46e5"
                  fillOpacity={0.2}
                  stroke={false}
                />
              </>
            )}
          </>
        )}
        
        {/* Available drivers */}
        {showDrivers && !showRoute && driversData
          .filter(driver => driver.available)
          .map(driver => (
            <Marker
              key={driver.id}
              position={[driver.currentLocation.lat, driver.currentLocation.lng]}
              icon={DriverIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{driver.name}</h3>
                  <p className="text-sm">{driver.vehicleType}</p>
                  <p className="text-sm text-gray-600">{driver.vehicleColor} • {driver.licensePlate}</p>
                  <p className="text-sm mt-1">⭐ {driver.rating} ({driver.totalTrips} trips)</p>
                  <p className="text-xs text-green-600 font-semibold mt-1">Available</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
