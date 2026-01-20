import React, { useState, useEffect } from 'react';
import { Screen } from '@/types';
import { Map, MapMarker, MarkerContent, MapControls, MapRoute } from '@/components';
import locationsData from '@/data/locations.json';
import { ArrowLeft, Search, MapPin, Navigation, X } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

interface Location {
  id: string;
  name: string;
  address: string;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  popular: boolean;
  estimatedFare: string;
}

const BookingMapScreen: React.FC<Props> = ({ onNavigate }) => {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [selectingFor, setSelectingFor] = useState<'pickup' | 'destination' | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const locations = locationsData as Location[];

  // Search locations
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(locations.filter(loc => loc.popular));
    } else {
      const filtered = locations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  const handleSelectLocation = (location: Location) => {
    if (selectingFor === 'pickup') {
      setPickup(location);
    } else if (selectingFor === 'destination') {
      setDestination(location);
    }
    setShowSearch(false);
    setSelectingFor(null);
    setSearchQuery('');
  };

  const handleConfirmBooking = () => {
    if (pickup && destination) {
      // Navigate to vehicle selection or booking confirmation
      onNavigate(Screen.BOOKING_LOCAL);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      {/* Map Container */}
      <div className="relative w-full h-screen">
        <Map 
          center={pickup ? [pickup.coordinates.lng, pickup.coordinates.lat] : [-0.1278, 51.5074]}
          zoom={pickup && destination ? 11 : 12}
        >
          {pickup && destination && (
            <MapRoute 
              coordinates={[
                [pickup.coordinates.lng, pickup.coordinates.lat],
                [destination.coordinates.lng, destination.coordinates.lat]
              ]}
              color="#4f46e5"
              width={4}
              opacity={0.8}
            />
          )}
          {pickup && (
            <MapMarker longitude={pickup.coordinates.lng} latitude={pickup.coordinates.lat}>
              <MarkerContent>
                <div className="w-8 h-8 rounded-full bg-midnight border-4 border-white shadow-lg"></div>
              </MarkerContent>
            </MapMarker>
          )}
          {destination && (
            <MapMarker longitude={destination.coordinates.lng} latitude={destination.coordinates.lat}>
              <MarkerContent>
                <div className="w-8 h-8 rounded-full bg-gold border-4 border-white shadow-lg"></div>
              </MarkerContent>
            </MapMarker>
          )}
          <MapControls position="top-right" showZoom />
        </Map>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate(Screen.HOME)} 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="px-4 py-2 bg-white rounded-full shadow-lg">
              <span className="text-sm font-bold">Book a Ride</span>
            </div>
            <div className="w-12"></div>
          </div>
        </div>

        {/* Location Cards */}
        {!showSearch && (
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-3xl shadow-2xl p-6 pb-8">
            {/* Pickup */}
            <button
              onClick={() => {
                setSelectingFor('pickup');
                setShowSearch(true);
              }}
              className="w-full flex items-center gap-4 p-4 mb-3 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-indigo-700 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white">
                <Navigation size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-bold text-gray-500 uppercase">Pickup</p>
                <p className="text-base font-bold text-black">
                  {pickup ? pickup.name : 'Select pickup location'}
                </p>
                {pickup && <p className="text-xs text-gray-500">{pickup.address}</p>}
              </div>
              <MapPin size={20} className="text-gray-400" />
            </button>

            {/* Destination */}
            <button
              onClick={() => {
                setSelectingFor('destination');
                setShowSearch(true);
              }}
              className="w-full flex items-center gap-4 p-4 mb-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-indigo-700 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white">
                <MapPin size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-bold text-gray-500 uppercase">Destination</p>
                <p className="text-base font-bold text-black">
                  {destination ? destination.name : 'Where to?'}
                </p>
                {destination && <p className="text-xs text-gray-500">{destination.address}</p>}
              </div>
              <MapPin size={20} className="text-gray-400" />
            </button>

            {/* Confirm Button */}
            {pickup && destination && (
              <button
                onClick={handleConfirmBooking}
                className="w-full bg-indigo-700 text-white py-4 rounded-xl font-bold text-base shadow-lg hover:bg-indigo-800 transition-all flex items-center justify-between px-6"
              >
                <span>Continue to Book</span>
                <span>{destination.estimatedFare}</span>
              </button>
            )}
          </div>
        )}

        {/* Search Panel */}
        {showSearch && (
          <div className="absolute inset-0 bg-white z-20 flex flex-col">
            {/* Search Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <button 
                  onClick={() => {
                    setShowSearch(false);
                    setSelectingFor(null);
                  }}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-lg font-bold">
                  {selectingFor === 'pickup' ? 'Select Pickup' : 'Select Destination'}
                </h2>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locations..."
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-700 text-base"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {searchResults.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No locations found</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">
                      {searchQuery ? 'Search Results' : 'Popular Locations'}
                    </h3>
                    <div className="space-y-2">
                      {searchResults.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => handleSelectLocation(location)}
                          className="w-full flex items-start gap-4 p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 hover:border-indigo-700 transition-all text-left"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            location.type === 'airport' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <MapPin size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-bold text-black truncate">{location.name}</p>
                            <p className="text-xs text-gray-500">{location.address}</p>
                            {location.popular && (
                              <span className="inline-block mt-1 text-xs font-bold text-indigo-700">Popular</span>
                            )}
                          </div>
                          <div className="text-xs font-bold text-gray-900">{location.estimatedFare}</div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingMapScreen;
