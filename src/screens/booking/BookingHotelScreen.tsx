import React, { useState, useEffect } from 'react';
import { Screen } from '@/types';
import { ArrowLeft, Map, Bed, Search, MapPin, Clock, TrendingUp, Star, Navigation, ArrowUpDown } from 'lucide-react';
import { VEHICLES } from '@/constants';
import { calculateRoute, formatDistance, formatDuration, formatPrice, RouteResult } from '@/utils/routing';

// Realistic vehicle fleet for each category
const VEHICLE_FLEET = {
  '1': [ // Standard SUVs
    { model: 'Toyota RAV4', colors: ['Pearl White', 'Midnight Black', 'Silver Metallic', 'Deep Blue'] },
    { model: 'Honda CR-V', colors: ['Platinum White', 'Crystal Black', 'Lunar Silver', 'Sonic Gray'] },
    { model: 'Nissan Qashqai', colors: ['Pearl White', 'Gun Metallic', 'Burgundy', 'Pearl Black'] },
    { model: 'Mazda CX-5', colors: ['Snowflake White', 'Jet Black', 'Machine Gray', 'Soul Red'] },
    { model: 'Volkswagen Tiguan', colors: ['Pure White', 'Deep Black', 'Platinum Gray', 'Oryx White'] }
  ],
  '2': [ // Executive Sedans
    { model: 'Mercedes E-Class', colors: ['Obsidian Black', 'Polar White', 'Selenite Gray', 'Cavansite Blue'] },
    { model: 'BMW 5 Series', colors: ['Alpine White', 'Black Sapphire', 'Phytonic Blue', 'Mineral Gray'] },
    { model: 'Audi A6', colors: ['Glacier White', 'Mythos Black', 'Navarra Blue', 'Florett Silver'] },
    { model: 'Jaguar XF', colors: ['Fuji White', 'Santorini Black', 'Eiger Gray', 'Loire Blue'] },
    { model: 'Lexus ES', colors: ['Sonic Quartz', 'Caviar', 'Atomic Silver', 'Nightfall Mica'] }
  ],
  '3': [ // Luxury MPVs
    { model: 'Mercedes V-Class', colors: ['Diamond White', 'Obsidian Black', 'Brilliant Silver', 'Cavansite Blue'] },
    { model: 'BMW X7', colors: ['Alpine White', 'Carbon Black', 'Mineral White', 'Phytonic Blue'] },
    { model: 'Audi Q7', colors: ['Glacier White', 'Mythos Black', 'Navarra Blue', 'Samurai Gray'] },
    { model: 'Range Rover Sport', colors: ['Fuji White', 'Santorini Black', 'Silicon Silver', 'Byron Blue'] },
    { model: 'Volvo XC90', colors: ['Crystal White', 'Onyx Black', 'Silver Dawn', 'Denim Blue'] }
  ]
};

const getRandomVehicle = (vehicleTypeId: string) => {
  const fleet = VEHICLE_FLEET[vehicleTypeId as keyof typeof VEHICLE_FLEET] || VEHICLE_FLEET['1'];
  const randomVehicle = fleet[Math.floor(Math.random() * fleet.length)];
  const randomColor = randomVehicle.colors[Math.floor(Math.random() * randomVehicle.colors.length)];
  return {
    model: randomVehicle.model,
    color: randomColor
  };
};

interface Props {
  onNavigate: (screen: Screen) => void;
  onBookingComplete?: (bookingData: {
    pickup: { name: string; coords: [number, number] };
    destination: { name: string; coords: [number, number] };
    vehicle: string;
    vehicleModel?: string;
    vehicleColor?: string;
    fare: number;
    distance: number;
    duration: number;
  }) => void;
}

interface Hotel {
  id: string;
  name: string;
  address: string;
  rating: number;
  coords: [number, number];
}

interface VehicleOption {
  id: string;
  name: string;
  type: string;
  price: number;
  eta: string;
  icon: string;
}

// Famous London hotels with real coordinates
const LONDON_HOTELS: Hotel[] = [
  { id: '1', name: 'The Ritz London', address: '150 Piccadilly, Mayfair', rating: 5.0, coords: [-0.1419, 51.5074] },
  { id: '2', name: 'The Savoy', address: 'Strand, Westminster', rating: 4.9, coords: [-0.1206, 51.5101] },
  { id: '3', name: 'Claridge\'s', address: 'Brook Street, Mayfair', rating: 4.9, coords: [-0.1486, 51.5128] },
  { id: '4', name: 'The Dorchester', address: 'Park Lane, Mayfair', rating: 4.8, coords: [-0.1529, 51.5076] },
  { id: '5', name: 'Shangri-La The Shard', address: 'The Shard, London Bridge', rating: 4.7, coords: [-0.0865, 51.5045] },
  { id: '6', name: 'The Langham London', address: 'Regent Street, Marylebone', rating: 4.8, coords: [-0.1435, 51.5173] },
  { id: '7', name: 'Rosewood London', address: 'High Holborn, Covent Garden', rating: 4.7, coords: [-0.1198, 51.5171] },
  { id: '8', name: 'The Ned', address: 'Poultry, City of London', rating: 4.6, coords: [-0.0899, 51.5134] },
  { id: '9', name: 'Four Seasons Park Lane', address: 'Hamilton Place, Mayfair', rating: 4.8, coords: [-0.1507, 51.5056] },
  { id: '10', name: 'Mandarin Oriental Hyde Park', address: 'Knightsbridge', rating: 4.7, coords: [-0.1608, 51.5023] },
];

// London locations for destination when in swap mode
const LONDON_LOCATIONS = [
  { id: '1', name: 'Baker Street Station', coords: [-0.1586, 51.5226] as [number, number] },
  { id: '2', name: 'King\'s Cross Station', coords: [-0.1240, 51.5308] as [number, number] },
  { id: '3', name: 'Piccadilly Circus', coords: [-0.1347, 51.5101] as [number, number] },
  { id: '4', name: 'Tower Bridge', coords: [-0.0754, 51.5055] as [number, number] },
  { id: '5', name: 'Canary Wharf', coords: [-0.0199, 51.5051] as [number, number] },
  { id: '6', name: 'Oxford Street', coords: [-0.1419, 51.5152] as [number, number] },
  { id: '7', name: 'Heathrow Airport T5', coords: [-0.4543, 51.4700] as [number, number] },
  { id: '8', name: 'London City Airport', coords: [0.0553, 51.5050] as [number, number] },
  { id: '9', name: 'Westminster Abbey', coords: [-0.1270, 51.4994] as [number, number] },
  { id: '10', name: 'The Shard', coords: [-0.0865, 51.5045] as [number, number] },
  { id: '11', name: 'Buckingham Palace', coords: [-0.1419, 51.5014] as [number, number] },
  { id: '12', name: 'Covent Garden', coords: [-0.1243, 51.5118] as [number, number] },
  { id: '13', name: 'Liverpool Street Station', coords: [-0.0815, 51.5176] as [number, number] },
  { id: '14', name: 'Paddington Station', coords: [-0.1763, 51.5154] as [number, number] },
  { id: '15', name: 'Victoria Station', coords: [-0.1448, 51.4952] as [number, number] },
  { id: '16', name: 'Waterloo Station', coords: [-0.1131, 51.5031] as [number, number] },
  { id: '17', name: 'Natural History Museum', coords: [-0.1763, 51.4967] as [number, number] },
  { id: '18', name: 'British Museum', coords: [-0.1269, 51.5194] as [number, number] },
  { id: '19', name: 'Harrods', coords: [-0.1634, 51.4994] as [number, number] },
  { id: '20', name: 'Borough Market', coords: [-0.0908, 51.5055] as [number, number] },
];

const VEHICLE_OPTIONS: VehicleOption[] = [
  { id: 'sedan', name: 'Sedan', type: 'Executive', price: 45.00, eta: '3 min', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>' },
  { id: 'standard', name: 'Standard', type: 'Sedan', price: 32.50, eta: '8 min', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>' },
  { id: 'mpv', name: 'MPV', type: 'Luxury', price: 65.00, eta: '12 min', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>' },
];

const BookingHotelScreen: React.FC<Props> = ({ onNavigate, onBookingComplete }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>(VEHICLES[0].id);
  const [isSwapped, setIsSwapped] = useState(false); // false: Current → Hotel, true: Hotel → Location
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof LONDON_LOCATIONS[0] | null>(null);
  const [routeData, setRouteData] = useState<RouteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showHotelDropdown, setShowHotelDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  
  const selectedVehicleData = VEHICLES.find(v => v.id === selectedVehicle) || VEHICLES[0];
  
  // Current location (Central London)
  const currentLocation = { name: 'Current Location', coords: [-0.1276, 51.5074] as [number, number] };
  
  // Determine pickup and destination based on swap mode
  const pickup = isSwapped ? selectedHotel : currentLocation;
  const destination = isSwapped ? selectedLocation : selectedHotel;
  
  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    setSelectedHotel(null);
    setSelectedLocation(null);
    setRouteData(null);
  };

  const handleBookTrip = () => {
    if (pickup && destination && routeData && onBookingComplete) {
      const assignedVehicle = getRandomVehicle(selectedVehicle);
      onBookingComplete({
        pickup: { name: pickup.name, coords: pickup.coords },
        destination: { name: destination.name, coords: destination.coords },
        vehicle: selectedVehicleData.name,
        vehicleModel: assignedVehicle.model,
        vehicleColor: assignedVehicle.color,
        fare: routeData.price * (selectedVehicle === '1' ? 1 : selectedVehicle === '2' ? 1.4 : 1.8),
        distance: routeData.distance,
        duration: routeData.duration
      });
    } else {
      onNavigate(Screen.ACTIVITY);
    }
  };

  // Calculate route when pickup or destination changes
  useEffect(() => {
    if (pickup && destination && pickup.coords && destination.coords) {
      const fetchRoute = async () => {
        setIsCalculating(true);
        try {
          const route = await calculateRoute(
            { longitude: pickup.coords[0], latitude: pickup.coords[1] },
            { longitude: destination.coords[0], latitude: destination.coords[1] },
            'standard'
          );
          setRouteData(route);
        } catch (error) {
          console.error('Route calculation failed:', error);
        } finally {
          setIsCalculating(false);
        }
      };
      fetchRoute();
    } else {
      setRouteData(null);
    }
  }, [pickup, destination]);

  return (
    <div className="relative h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-3 shadow-sm shrink-0">
        <div className="flex items-center justify-between">
          <button onClick={() => onNavigate(Screen.HOME)} className="w-9 h-9 rounded-full flex items-center justify-center">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-semibold text-slate-900">Hotel Pickup</h1>
          <button className="w-9 h-9 rounded-full flex items-center justify-center">
            <Map size={22} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-32">
        {/* Location Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">
          {/* Pick-up Location */}
          <div className="mb-4 relative">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {isSwapped ? 'Pick-up Hotel' : 'Pick-up Location'}
            </p>
            <div className="relative flex items-center gap-2.5 mb-3">
              <div className={`w-8 h-8 rounded-full ${isSwapped ? 'bg-amber-500' : 'bg-green-500'} flex items-center justify-center shrink-0`}>
                {isSwapped ? <Bed size={18} className="text-white" /> : <Navigation size={18} className="text-white" />}
              </div>
              
              {/* If not swapped, show current location (fixed) */}
              {!isSwapped ? (
                <div className="flex-1 text-left text-base text-slate-900 font-semibold">
                  Current Location
                </div>
              ) : (
                <>
                  {/* If swapped, show hotel dropdown */}
                  <button
                    onClick={() => {
                      setShowHotelDropdown(!showHotelDropdown);
                      setShowDestDropdown(false);
                    }}
                    className="flex-1 text-left text-base text-slate-900 bg-transparent border-none focus:outline-none font-semibold"
                  >
                    {selectedHotel ? selectedHotel.name : 'Select your hotel...'}
                  </button>
                  <MapPin size={18} className="text-slate-300" />
                </>
              )}
            </div>

            {/* Hotel Dropdown (only in swapped mode) */}
            {showHotelDropdown && isSwapped && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-[60]">
                {LONDON_HOTELS.map((hotel) => (
                  <button
                    key={hotel.id}
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setShowHotelDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{hotel.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{hotel.address}</p>
                      </div>
                      <div className="flex items-center gap-0.5 ml-2">
                        <Star size={12} className="text-gold fill-gold" />
                        <span className="text-xs font-bold text-slate-600">{hotel.rating}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="relative h-8 mb-4 flex items-center justify-center">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            <button
              onClick={handleSwap}
              className="relative z-10 w-10 h-10 rounded-full bg-primary shadow-md flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ArrowUpDown size={20} className="text-white" />
            </button>
          </div>

          {/* Drop-off Location */}
          <div className="relative">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {isSwapped ? 'Destination' : 'Hotel Destination'}
            </p>
            <div className="relative flex items-center gap-2.5">
              <div className={`w-8 h-8 shrink-0 shadow-sm ${isSwapped ? 'bg-red-500 rounded-sm' : 'bg-amber-500 rounded-full'} flex items-center justify-center`}>
                {isSwapped ? <MapPin size={18} className="text-white" /> : <Bed size={18} className="text-white" />}
              </div>
              <button
                onClick={() => {
                  setShowDestDropdown(!showDestDropdown);
                  setShowHotelDropdown(false);
                }}
                className="flex-1 text-left text-base text-slate-900 bg-transparent border-none focus:outline-none font-semibold"
              >
                {destination ? destination.name : (isSwapped ? 'Select destination...' : 'Select hotel...')}
              </button>
              <Navigation size={18} className="text-slate-300" />
            </div>

            {/* Destination Dropdown - Hotels (normal mode) or Locations (swapped mode) */}
            {showDestDropdown && !isSwapped && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-[60]">
                {LONDON_HOTELS.map((hotel) => (
                  <button
                    key={hotel.id}
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setShowDestDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{hotel.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{hotel.address}</p>
                      </div>
                      <div className="flex items-center gap-0.5 ml-2">
                        <Star size={12} className="text-gold fill-gold" />
                        <span className="text-xs font-bold text-slate-600">{hotel.rating}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* Location Dropdown (swapped mode) */}
            {showDestDropdown && isSwapped && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-[60]">
                {LONDON_LOCATIONS.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowDestDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0"
                  >
                    <p className="text-sm font-semibold text-slate-900">{location.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Travel Info */}
        {routeData && (
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-sm">
              <Clock size={14} className="text-primary" />
              <span className="text-xs font-bold text-slate-900">{formatDuration(routeData.duration)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400">Distance</span>
              <span className="text-xs font-bold text-slate-900">{formatDistance(routeData.distance)}</span>
            </div>
          </div>
        )}

        {/* Select Vehicle */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-base font-semibold text-slate-900">Select Vehicle</h3>
            <span className="text-xs uppercase font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">15% Off</span>
          </div>
          <div className="flex flex-col gap-2">
            {VEHICLES.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;
              return (
                <label key={vehicle.id} className="relative cursor-pointer group w-full">
                  <input 
                    type="radio" 
                    name="vehicle" 
                    className="peer sr-only" 
                    checked={selectedVehicle === vehicle.id}
                    onChange={() => setSelectedVehicle(vehicle.id)}
                  />
                  <div className="flex items-center p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-checked:bg-blue-50/50">
                    <div className="w-12 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <div className="w-7 h-7 text-slate-900" dangerouslySetInnerHTML={{ __html: vehicle.image }} />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-semibold text-slate-900">{vehicle.name}</h4>
                        <span className="flex items-center text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md gap-0.5">
                          {vehicle.passengers} seats
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{vehicle.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-base font-bold text-slate-900">
                          {routeData ? formatPrice(routeData.price * (vehicle.id === '1' ? 1 : vehicle.id === '2' ? 1.4 : 1.8)) : `£${vehicle.price.toFixed(2)}`}
                        </span>
                        <span className="text-[10px] font-semibold text-green-600">{vehicle.eta} min</span>
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>


      </div>

      {/* Bottom Action - Fixed */}
      <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-5 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-3">
        <div className="max-w-md mx-auto flex flex-col gap-2.5">
          {/* Payment Method */}
          <button className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-7 bg-slate-900 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-white">💳</span>
              </div>
              <span className="text-xs font-semibold text-slate-900">Personal •••• 4242</span>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Confirm Button */}
          <button
            onClick={() => onNavigate(Screen.ACTIVITY)}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold text-base shadow-xl flex items-center justify-between px-5 transition-all active:scale-[0.98]"
          >
            <span>Confirm Pickup</span>
            <div className="flex items-center gap-2">
              <span className="text-base">£{selectedVehicleData.price.toFixed(2)}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingHotelScreen;
