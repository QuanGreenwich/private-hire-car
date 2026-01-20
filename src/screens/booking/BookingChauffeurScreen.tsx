import React, { useState } from 'react';
import { Screen } from '@/types';
import { MapBackground } from '@/components';
import { ArrowLeft, MoreHorizontal, Navigation, Edit2, Car, Luggage, User, Check, Verified, ChevronRight, Info, PenLine, MapPin } from 'lucide-react';
import { VEHICLES } from '@/constants';

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

// London locations for pickup
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
  { id: '21', name: 'St Pancras Station', coords: [-0.1262, 51.5308] as [number, number] },
  { id: '22', name: 'Hyde Park Corner', coords: [-0.1523, 51.5027] as [number, number] },
  { id: '23', name: 'London Bridge', coords: [-0.0877, 51.5078] as [number, number] },
  { id: '24', name: 'Wembley Stadium', coords: [-0.2795, 51.5560] as [number, number] },
  { id: '25', name: 'Greenwich Observatory', coords: [-0.0014, 51.4769] as [number, number] },
];

// Vehicle fleet for chauffeur service
const VEHICLE_FLEET = {
  'sedan': [ // Premium Sedans
    { model: 'Mercedes S-Class', colors: ['Obsidian Black', 'Polar White', 'Selenite Gray', 'Cavansite Blue'] },
    { model: 'BMW 7 Series', colors: ['Alpine White', 'Black Sapphire', 'Phytonic Blue', 'Mineral Gray'] },
    { model: 'Audi A8', colors: ['Glacier White', 'Mythos Black', 'Navarra Blue', 'Florett Silver'] },
    { model: 'Jaguar XJ', colors: ['Fuji White', 'Santorini Black', 'Eiger Gray', 'Loire Blue'] },
    { model: 'Lexus LS', colors: ['Sonic Quartz', 'Caviar', 'Atomic Silver', 'Nightfall Mica'] }
  ],
  'mpv': [ // Luxury MPVs
    { model: 'Mercedes V-Class', colors: ['Diamond White', 'Obsidian Black', 'Brilliant Silver', 'Cavansite Blue'] },
    { model: 'BMW X7', colors: ['Alpine White', 'Carbon Black', 'Mineral White', 'Phytonic Blue'] },
    { model: 'Audi Q7', colors: ['Glacier White', 'Mythos Black', 'Navarra Blue', 'Samurai Gray'] },
    { model: 'Range Rover Sport', colors: ['Fuji White', 'Santorini Black', 'Silicon Silver', 'Byron Blue'] },
    { model: 'Volvo XC90', colors: ['Crystal White', 'Onyx Black', 'Silver Dawn', 'Denim Blue'] }
  ]
};

const getRandomVehicle = (vehicleType: 'sedan' | 'mpv') => {
  const fleet = VEHICLE_FLEET[vehicleType];
  const randomVehicle = fleet[Math.floor(Math.random() * fleet.length)];
  const randomColor = randomVehicle.colors[Math.floor(Math.random() * randomVehicle.colors.length)];
  return {
    model: randomVehicle.model,
    color: randomColor
  };
};

const BookingChauffeurScreen: React.FC<Props> = ({ onNavigate, onBookingComplete }) => {
  const [duration, setDuration] = useState('8h');
  const [rentalType, setRentalType] = useState<'hourly' | 'daily'>('hourly');
  const [selectedVehicle, setSelectedVehicle] = useState<'sedan' | 'mpv'>('sedan');
  const [selectedLocation, setSelectedLocation] = useState(LONDON_LOCATIONS[0]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  // Dynamic pricing based on duration
  const getBasePrice = () => {
    const sedanHourlyRate = 60;
    const mpvHourlyRate = 78;
    const sedanDailyRate = 320;
    const mpvDailyRate = 415;
    
    const hourlyRate = selectedVehicle === 'sedan' ? sedanHourlyRate : mpvHourlyRate;
    const dailyRate = selectedVehicle === 'sedan' ? sedanDailyRate : mpvDailyRate;
    
    if (rentalType === 'hourly') {
      const hours = parseInt(duration);
      return hourlyRate * hours;
    } else {
      const days = parseInt(duration);
      return dailyRate * days;
    }
  };
  
  const basePrice = getBasePrice();
  const finalPrice = Math.round(basePrice * 0.85);
  
  const handleBooking = () => {
    if (onBookingComplete) {
      const assignedVehicle = getRandomVehicle(selectedVehicle);
      const vehicleData = selectedVehicle === 'sedan' ? VEHICLES[1] : VEHICLES[2]; // Executive or Luxury
      
      onBookingComplete({
        pickup: { name: selectedLocation.name, coords: selectedLocation.coords },
        destination: { name: 'Chauffeur Service', coords: selectedLocation.coords },
        vehicle: vehicleData.name,
        vehicleModel: assignedVehicle.model,
        vehicleColor: assignedVehicle.color,
        fare: finalPrice,
        distance: 0, // Chauffeur service doesn't have fixed route
        duration: rentalType === 'hourly' ? parseInt(duration) * 60 : parseInt(duration) * 24 * 60
      });
    } else {
      onNavigate(Screen.ACTIVITY);
    }
  };

  return (
    <div className="relative h-screen flex flex-col bg-bg-light overflow-hidden">
        {/* Header Section - Fixed */}
        <div className="relative w-full h-[20vh] rounded-b-3xl overflow-hidden shadow-xl z-0 bg-slate-900 shrink-0">
             <MapBackground className="w-full h-full">
                 <div className="absolute top-4 left-0 w-full px-5 flex items-center justify-between z-40">
                    <button onClick={() => onNavigate(Screen.HOME)} className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:bg-white/20 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-white text-xl font-semibold tracking-tight">Chauffeur Hire</h1>
                    <button className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:bg-white/20 transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                 </div>
                 
                 <div className="absolute bottom-4 left-5 right-5 z-30">
                    <div className="relative bg-white/95 backdrop-blur-lg rounded-xl p-3 flex items-center gap-3 shadow-lg border-l-4 border-gold">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 text-gold">
                            <Navigation size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs uppercase tracking-wider font-semibold text-gold mb-0.5">Pickup Location</p>
                            <h2 className="text-base font-bold text-slate-900 truncate">{selectedLocation.name}</h2>
                        </div>
                        <button 
                            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                            className="text-xs font-bold text-primary px-2 py-0.5 bg-slate-100 rounded-md"
                        >
                            Edit
                        </button>
                        
                        {/* Location Dropdown */}
                        {showLocationDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-[70]">
                            {LONDON_LOCATIONS.map((location) => (
                              <button
                                key={location.id}
                                onClick={() => {
                                  setSelectedLocation(location);
                                  setShowLocationDropdown(false);
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex items-center gap-2"
                              >
                                <MapPin size={14} className="text-gold shrink-0" />
                                <p className="text-sm font-semibold text-slate-900">{location.name}</p>
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                 </div>
             </MapBackground>
        </div>


        <div className="flex-1 overflow-y-auto px-5 mt-2 relative z-10 pb-32">
          <div className="w-full max-w-md mx-auto space-y-3.5">
            {/* Duration Section */}
            <section>
                <div className="flex items-center justify-between mb-2.5">
                    <h3 className="text-base font-semibold text-slate-900">Rental Duration</h3>
                    <div className="flex bg-slate-200 rounded-lg p-0.5">
                        <button 
                            onClick={() => {
                                setRentalType('hourly');
                                setDuration('8h');
                            }}
                            className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition-all ${rentalType === 'hourly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Hourly
                        </button>
                        <button 
                            onClick={() => {
                                setRentalType('daily');
                                setDuration('2d');
                            }}
                            className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition-all ${rentalType === 'daily' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Daily
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {(rentalType === 'hourly' 
                        ? [{value: '4h', label: 'Minimum'}, {value: '8h', label: 'Full Day', badge: true}, {value: '12h', label: 'Extended'}, {value: '24h', label: 'Multi-day'}]
                        : [{value: '1d', label: 'Single Day'}, {value: '2d', label: 'Weekend', badge: true}, {value: '3d', label: 'Short Trip'}, {value: '7d', label: 'Weekly'}]
                    ).map((option) => {
                        const isSelected = duration === option.value;
                        return (
                            <button 
                                key={option.value}
                                onClick={() => setDuration(option.value)}
                                className={`relative w-full h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${isSelected ? 'bg-gold/5 border-gold shadow-glow' : 'bg-white border-slate-100'}`}
                            >
                                {option.badge && (
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gold text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                        Best
                                    </div>
                                )}
                                <span className={`text-base font-bold ${isSelected ? 'text-slate-900' : 'text-slate-900'}`}>
                                    {rentalType === 'hourly' ? option.value : option.value.replace('d', 'd')}
                                </span>
                                <span className={`text-[10px] font-medium ${isSelected ? 'text-gold' : 'text-slate-400'}`}>
                                    {option.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </section>

            {/* Vehicle Selection */}
            <section>
                <h3 className="text-base font-semibold text-slate-900 mb-2.5">Select Vehicle Class</h3>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setSelectedVehicle('sedan')}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all ${selectedVehicle === 'sedan' ? 'bg-gold/5 border-gold' : 'bg-white border-slate-200'}`}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-base">Premium Sedan</h4>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedVehicle === 'sedan' ? 'border-gold bg-gold' : 'border-slate-300'}`}>
                                {selectedVehicle === 'sedan' && <Check size={10} className="text-white" />}
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">Mercedes S-Class • BMW 7 • Audi A8</p>
                        <p className="text-sm font-bold text-gold mt-1">£{selectedVehicle === 'sedan' ? basePrice : (rentalType === 'hourly' ? 60 * parseInt(duration) : 320 * parseInt(duration))}</p>
                    </button>
                    <button 
                        onClick={() => setSelectedVehicle('mpv')}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all ${selectedVehicle === 'mpv' ? 'bg-gold/5 border-gold' : 'bg-white border-slate-200'}`}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-base">Luxury MPV</h4>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedVehicle === 'mpv' ? 'border-gold bg-gold' : 'border-slate-300'}`}>
                                {selectedVehicle === 'mpv' && <Check size={10} className="text-white" />}
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">Mercedes V-Class • BMW X7 • Audi Q7</p>
                        <p className="text-sm font-bold text-gold mt-1">£{selectedVehicle === 'mpv' ? basePrice : (rentalType === 'hourly' ? 78 * parseInt(duration) : 415 * parseInt(duration))}</p>
                    </button>
                </div>
            </section>

            {/* Chauffeur Details */}
            <section className="bg-white rounded-xl p-3.5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-2.5">Chauffeur Details</h3>
                <div className="space-y-2.5.5">
                    <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                            <User size={14} className="text-gold" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-base font-semibold text-slate-900">Professional Chauffeur</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Uniformed, licensed, background checked.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                            <Verified size={14} className="text-gold" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-base font-semibold text-slate-900">Premium Service</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Meet & greet, luggage assistance.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                            <Luggage size={14} className="text-gold" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-base font-semibold text-slate-900">Refreshments</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Mineral water and Wi-Fi on board.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Breakdown */}
            <section className="bg-white rounded-xl p-3.5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Rate ({duration})</span>
                    <span className="text-sm font-semibold text-slate-900">£{basePrice}.00</span>
                </div>
                <div className="flex items-center justify-between mb-2.5 pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">%</span>
                        </div>
                        <span className="text-sm text-gold font-medium">First Time (15%)</span>
                    </div>
                    <span className="text-sm font-semibold text-gold">-£{Math.round(basePrice * 0.15)}.00</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-900">Total Estimate</span>
                    <span className="text-base font-bold text-slate-900">£{finalPrice}.00</span>
                </div>
            </section>
          </div>
        </div>

      {/* Bottom Action - Fixed */}
      <div className="fixed bottom-0 left-0 w-full z-40 px-5 pb-5 bg-gradient-to-t from-bg-light via-bg-light to-transparent pt-3">
            <div className="max-w-md mx-auto flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-3 bg-white rounded-lg p-2 shadow-md">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-5 bg-slate-800 rounded flex items-center justify-center">
                            <span className="text-[9px] font-bold text-white tracking-widest">VISA</span>
                        </div>
                        <div className="flex-1">
                            <span className="text-xs font-semibold text-slate-900">Personal •••• 4242</span>
                        </div>
                    </div>
                    <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors">Change</button>
                </div>
                <button 
                    onClick={handleBooking}
                    className="w-full h-12 bg-midnight text-white rounded-lg shadow-lg shadow-midnight/20 active:scale-[0.98] transition-all flex items-center justify-between px-5 group"
                >
                    <span className="text-base font-bold">Confirm Booking</span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold">£{finalPrice}.00</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>
            </div>
      </div>
    </div>
  );
};

export default BookingChauffeurScreen;