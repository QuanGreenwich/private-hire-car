import React, { useState, useEffect } from 'react';
import { Screen, Vehicle } from '@/types';
import { Map, MapMarker, MarkerContent, MapRoute, PaymentModal } from '@/components';
import { ArrowLeft, MapPin, PlusCircle, CreditCard, ChevronRight, User, Clock, CheckCircle2, Navigation2 } from 'lucide-react';
import { VEHICLES } from '@/constants';
import { calculateRoute, formatDistance, formatDuration, formatPrice, RouteResult } from '@/utils/routing';

interface Props {
  onNavigate: (screen: Screen) => void;
  onBookingComplete?: (bookingData: {
    pickup: { name: string; coords: [number, number] };
    destination: { name: string; coords: [number, number] };
    vehicle: string;
    vehicleModel: string;
    vehicleColor: string;
    fare: number;
    distance: number;
    duration: number;
  }) => void;
}

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

// Random vehicle assignment function
const getRandomVehicle = (vehicleTypeId: string) => {
  const fleet = VEHICLE_FLEET[vehicleTypeId as keyof typeof VEHICLE_FLEET] || VEHICLE_FLEET['1'];
  const randomVehicle = fleet[Math.floor(Math.random() * fleet.length)];
  const randomColor = randomVehicle.colors[Math.floor(Math.random() * randomVehicle.colors.length)];
  return {
    model: randomVehicle.model,
    color: randomColor
  };
};

// Common London locations
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
  { id: '21', name: 'St Pancras International', coords: [-0.1263, 51.5309] as [number, number] },
  { id: '22', name: 'Hyde Park Corner', coords: [-0.1523, 51.5027] as [number, number] },
  { id: '23', name: 'London Bridge Station', coords: [-0.0864, 51.5048] as [number, number] },
  { id: '24', name: 'Wembley Stadium', coords: [-0.2795, 51.5560] as [number, number] },
  { id: '25', name: 'Greenwich Observatory', coords: [-0.0015, 51.4769] as [number, number] },
];

const BookingLocalScreen: React.FC<Props> = ({ onNavigate, onBookingComplete }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>(VEHICLES[0].id);
  const [pickup, setPickup] = useState(LONDON_LOCATIONS[0]);
  const [destination, setDestination] = useState<typeof LONDON_LOCATIONS[0] | null>(null);
  const [routeData, setRouteData] = useState<RouteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBookingData, setPendingBookingData] = useState<any>(null);

  const selectedVehicleData = VEHICLES.find(v => v.id === selectedVehicle) || VEHICLES[0];

  const handleBookTrip = () => {
    if (!destination) {
      alert('Please select a destination');
      return;
    }
    if (!routeData) {
      alert('Please wait for route calculation');
      return;
    }
    
    const assignedVehicle = getRandomVehicle(selectedVehicle);
    const bookingData = {
      pickup: { name: pickup.name, coords: pickup.coords },
      destination: { name: destination.name, coords: destination.coords },
      vehicle: selectedVehicleData.name,
      vehicleModel: assignedVehicle.model,
      vehicleColor: assignedVehicle.color,
      fare: routeData.price * (selectedVehicle === '1' ? 1 : selectedVehicle === '2' ? 1.4 : 1.8),
      distance: routeData.distance,
      duration: routeData.duration,
      bookingType: 'local'
    };
    
    // Show payment modal instead of booking directly
    setPendingBookingData(bookingData);
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async (paymentMethod: 'card' | 'cash') => {
    setShowPaymentModal(false);
    
    if (pendingBookingData) {
      // Navigate to activity screen with booking data
      if (onBookingComplete) {
        onBookingComplete({ 
          ...pendingBookingData, 
          paymentMethod
        });
      }
    }
  };

  // Calculate route when pickup or destination changes
  useEffect(() => {
    if (pickup && destination) {
      const fetchRoute = async () => {
        setIsCalculating(true);
        try {
          // Always calculate with 'standard' vehicle to get base price
          // Then multiply by vehicle-specific multiplier when displaying
          const route = await calculateRoute(
            { longitude: pickup.coords[0], latitude: pickup.coords[1] },
            { longitude: destination.coords[0], latitude: destination.coords[1] },
            'standard'
          );
          setRouteData(route);
        } catch (error) {
          console.error('Route calculation failed:', error);
          alert('Failed to calculate route. Please try again or select different locations.');
          setRouteData(null);
        } finally {
          setIsCalculating(false);
        }
      };
      fetchRoute();
    } else {
      setRouteData(null);
    }
  }, [pickup, destination]); // Removed selectedVehicle - always calculate base price

  return (
    <div className="relative h-screen flex flex-col bg-bg-light overflow-hidden">
      {/* Map Header - Fixed with real route */}
      <div className="relative w-full h-[35vh] bg-slate-900 overflow-hidden shadow-xl z-0 shrink-0">
        {pickup && destination && routeData ? (
          <Map center={[(pickup.coords[0] + destination.coords[0]) / 2, (pickup.coords[1] + destination.coords[1]) / 2]} zoom={11}>
            {/* Route Line */}
            <MapRoute 
              coordinates={routeData.coordinates}
              color="#4f46e5"
              width={4}
              opacity={0.8}
            />
            
            {/* Pickup Marker */}
            <MapMarker longitude={pickup.coords[0]} latitude={pickup.coords[1]}>
              <MarkerContent>
                <div className="w-10 h-10 rounded-full bg-green-500 border-4 border-white shadow-lg flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
              </MarkerContent>
            </MapMarker>
            
            {/* Destination Marker */}
            <MapMarker longitude={destination.coords[0]} latitude={destination.coords[1]}>
              <MarkerContent>
                <div className="w-10 h-10 rounded-full bg-red-500 border-4 border-white shadow-lg flex items-center justify-center">
                  <Navigation2 size={20} className="text-white" />
                </div>
              </MarkerContent>
            </MapMarker>
          </Map>
        ) : (
          <Map center={[-0.1276, 51.5074]} zoom={12}>
            <MapMarker longitude={pickup.coords[0]} latitude={pickup.coords[1]}>
              <MarkerContent>
                <div className="w-10 h-10 rounded-full bg-green-500 border-4 border-white shadow-lg flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
              </MarkerContent>
            </MapMarker>
          </Map>
        )}
        
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-50">
          <button onClick={() => onNavigate(Screen.HOME)} className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 transition-colors hover:bg-white/30 shadow-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-white text-xl font-bold tracking-tight drop-shadow-lg">Local Journey</h1>
          <div className="w-9"></div>
        </div>
        
        {/* Trip Info Overlay */}
        {routeData && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Distance</span>
                  <p className="text-base font-bold text-midnight">{formatDistance(routeData.distance)}</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="text-sm">
                  <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Duration</span>
                  <p className="text-base font-bold text-midnight">{formatDuration(routeData.duration)}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Fare</span>
                <p className="text-xl font-bold text-primary">{formatPrice(routeData.price)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="relative -mt-10 z-10 flex-1 overflow-y-auto px-5 pb-36">
        <div className="w-full max-w-md mx-auto flex flex-col gap-2.5">
        {/* Input Card with Dropdowns */}
        <div className="bg-white rounded-2xl shadow-float p-3.5 relative">
             <div className="absolute left-[27px] top-[42px] bottom-[42px] w-0.5 bg-slate-200 z-0"></div>
             
             {/* Pickup */}
             <div className="relative">
               <div className="relative flex items-center gap-3 h-11 border-b border-slate-100 z-10">
                  <div className="w-4 h-4 rounded-full border-[3px] border-green-500 bg-white z-10 shrink-0"></div>
                  <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Pickup</label>
                      <button 
                        onClick={() => {
                          setShowPickupDropdown(!showPickupDropdown);
                          setShowDestDropdown(false);
                        }}
                        className="w-full text-left p-0 bg-transparent border-none text-base font-semibold text-slate-900 focus:ring-0"
                      >
                        {pickup.name}
                      </button>
                  </div>
                  <button 
                    onClick={() => {
                      setShowPickupDropdown(!showPickupDropdown);
                      setShowDestDropdown(false);
                    }}
                    className="text-slate-400 hover:text-primary"
                  >
                    <MapPin size={20} />
                  </button>
               </div>
               
               {/* Pickup Dropdown */}
               {showPickupDropdown && (
                 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-[60]">
                   {LONDON_LOCATIONS.map((loc) => (
                     <button
                       key={loc.id}
                       onClick={() => {
                         setPickup(loc);
                         setShowPickupDropdown(false);
                       }}
                       className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm font-semibold text-slate-700 border-b border-slate-50 last:border-0"
                     >
                       {loc.name}
                     </button>
                   ))}
                 </div>
               )}
             </div>

             {/* Destination */}
             <div className="relative">
               <div className="relative flex items-center gap-3 h-11 pt-2 z-10">
                  <div className="w-4 h-4 bg-red-500 z-10 shrink-0 shadow-sm rounded-sm"></div>
                  <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination</label>
                      <button 
                        onClick={() => {
                          setShowDestDropdown(!showDestDropdown);
                          setShowPickupDropdown(false);
                        }}
                        className="w-full text-left p-0 bg-transparent border-none text-base font-semibold text-slate-900 focus:ring-0 placeholder:text-slate-400"
                      >
                        {destination ? destination.name : 'Where are you going?'}
                      </button>
                  </div>
                  <button 
                    onClick={() => {
                      setShowDestDropdown(!showDestDropdown);
                      setShowPickupDropdown(false);
                    }}
                    className="text-slate-400 hover:text-primary"
                  >
                    <MapPin size={20} />
                  </button>
               </div>
               
               {/* Destination Dropdown */}
               {showDestDropdown && (
                 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-[60]">
                   {LONDON_LOCATIONS.filter(loc => loc.id !== pickup.id).map((loc) => (
                     <button
                       key={loc.id}
                       onClick={() => {
                         setDestination(loc);
                         setShowDestDropdown(false);
                       }}
                       className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm font-semibold text-slate-700 border-b border-slate-50 last:border-0"
                     >
                       {loc.name}
                     </button>
                   ))}
                 </div>
               )}
             </div>
        </div>

        {/* Vehicle Selection */}
        <div className="w-full">
            <div className="flex items-center justify-between mb-2 px-1">
                <h3 className="text-base font-semibold text-slate-900">Choose Vehicle</h3>
                <span className="text-xs uppercase font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">15% Off</span>
            </div>
            
            <div className="flex flex-col gap-2">
                {VEHICLES.map((vehicle) => (
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
                                        <User size={10} /> {vehicle.passengers}
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
                            {selectedVehicle === vehicle.id && (
                                <div className="absolute -top-1.5 -right-1.5 bg-primary rounded-full shadow-sm">
                                    <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                                </div>
                            )}
                        </div>
                    </label>
                ))}
            </div>
        </div>
        </div>
      </div>

      {/* Bottom Action - Fixed */}
      <div className="fixed bottom-0 left-0 w-full z-40 px-5 pb-5 bg-gradient-to-t from-bg-light via-bg-light to-transparent pt-3">
            <div className="max-w-md mx-auto flex flex-col gap-2.5">
                <button 
                    onClick={handleBookTrip}
                    disabled={!destination || isCalculating}
                    className="w-full h-12 bg-midnight text-white rounded-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="text-base font-bold">
                      {!destination ? 'Select Destination' : isCalculating ? 'Calculating...' : `Book ${selectedVehicleData.name}`}
                    </span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && pendingBookingData && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handlePaymentConfirm}
          bookingData={pendingBookingData}
        />
      )}
    </div>
  );
};

export default BookingLocalScreen;