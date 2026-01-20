import React, { useState } from 'react';
import { Screen } from '@/types';
import { ArrowLeft, MoreVertical, PlaneLanding, Badge, ArrowRight, Verified, PenLine, Check } from 'lucide-react';
import { VEHICLES } from '@/constants';

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

const BookingAirportScreen: React.FC<Props> = ({ onNavigate, onBookingComplete }) => {
  const [meetGreet, setMeetGreet] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<string>(VEHICLES[0].id);
  const [airport, setAirport] = useState('London Heathrow (LHR)');
  
  const selectedVehicleData = VEHICLES.find(v => v.id === selectedVehicle) || VEHICLES[0];
  // Fixed airport transfer booking fee based on vehicle type
  const bookingFees: Record<string, number> = {
    'standard': 45.00,
    'executive': 65.00,
    'luxury': 85.00
  };
  const basePrice = bookingFees[selectedVehicle] || 45.00;
  const meetGreetFee = 15.00;
  const totalPrice = basePrice + (meetGreet ? meetGreetFee : 0);

  // Airport coordinates
  const airportLocations: Record<string, { coords: [number, number], name: string }> = {
    'London Heathrow (LHR)': { coords: [-0.4543, 51.4700], name: 'Heathrow Airport Terminal 5' },
    'London Gatwick (LGW)': { coords: [-0.1903, 51.1537], name: 'Gatwick Airport' },
    'London Stansted (STN)': { coords: [0.2340, 51.8860], name: 'Stansted Airport' }
  };

  const handleBookTrip = () => {
    const selectedAirport = airportLocations[airport];
    const pickupLocation = { coords: [-0.1276, 51.5074] as [number, number], name: 'Central London' }; // Default pickup
    const assignedVehicle = getRandomVehicle(selectedVehicle);

    if (onBookingComplete && selectedAirport) {
      onBookingComplete({
        pickup: pickupLocation,
        destination: { name: selectedAirport.name, coords: selectedAirport.coords },
        vehicle: selectedVehicleData.name,
        vehicleModel: assignedVehicle.model,
        vehicleColor: assignedVehicle.color,
        fare: totalPrice,
        distance: 25000, // ~25km average to airports
        duration: 2400 // ~40 mins average
      });
    } else {
      onNavigate(Screen.ACTIVITY);
    }
  };
  
  return (
    <div className="relative h-screen w-full flex flex-col max-w-md mx-auto bg-bg-light overflow-hidden">
        <div className="relative w-full h-[20vh] bg-gradient-to-br from-primary via-primary-dark to-primary rounded-b-3xl overflow-hidden shadow-xl z-10 shrink-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex items-center justify-between px-5 pt-5 z-20">
                <button onClick={() => onNavigate(Screen.HOME)} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-white text-xl font-semibold tracking-tight">Airport Transfer</h1>
                <div className="w-9"></div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 -mt-4 relative z-20 pb-32">
          <div className="space-y-2.5">
             <div className="bg-white rounded-xl p-3 shadow-card space-y-2.5">
                <h3 className="text-base font-semibold text-slate-900 mb-1.5">Arrival Details</h3>
                
                <div className="relative">
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Airport</label>
                    <select 
                      value={airport}
                      onChange={(e) => setAirport(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-primary text-base font-semibold rounded-lg py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                        <option>London Heathrow (LHR)</option>
                        <option>London Gatwick (LGW)</option>
                        <option>London Stansted (STN)</option>
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                    <div className="col-span-2 relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Flight No.</label>
                        <input className="w-full bg-slate-50 border border-slate-200 text-primary text-base font-semibold rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="BA 1492" type="text" />
                    </div>
                    <div className="col-span-1 relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Terminal</label>
                        <select className="w-full bg-slate-50 border border-slate-200 text-primary text-sm font-semibold rounded-lg py-2 pl-2 pr-6 focus:ring-2 focus:ring-primary/20 outline-none">
                            <option>T 5</option>
                            <option>T 4</option>
                            <option>T 3</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Date</label>
                        <input className="w-full bg-slate-50 border border-slate-200 text-primary text-sm font-semibold rounded-lg py-2 px-2.5 focus:ring-2 focus:ring-primary/20 outline-none" type="date" defaultValue="2023-11-24" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Time</label>
                        <input className="w-full bg-slate-50 border border-slate-200 text-primary text-sm font-semibold rounded-lg py-2 px-2.5 focus:ring-2 focus:ring-primary/20 outline-none" type="time" defaultValue="14:30" />
                    </div>
                </div>
             </div>

             <div className="bg-white rounded-xl p-3 shadow-card">
                 <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-base font-semibold text-slate-900">Meet & Greet</h3>
                    <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={meetGreet} onChange={(e) => setMeetGreet(e.target.checked)} />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gold"></div>
                    </div>
                 </div>
                 <p className="text-slate-500 text-xs leading-relaxed mb-2">Driver waits in arrivals with name board. 45min free wait.</p>
                 <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-600">Service Fee</span>
                    <span className="text-sm font-semibold text-slate-900">£15.00</span>
                 </div>
             </div>

             <div className="bg-white/50 rounded-lg p-2 flex items-start gap-2 border border-slate-100">
                <PenLine className="text-slate-400" size={16} />
                <div className="flex-1">
                    <p className="text-xs font-medium text-slate-700">Add note to driver</p>
                    <p className="text-[10px] text-slate-400">Gate code, luggage, etc.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full z-40 px-5 pb-5 bg-gradient-to-t from-bg-light via-bg-light to-transparent pt-3">
            <div className="max-w-md mx-auto flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-3 bg-white rounded-lg p-2 shadow-md">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-5 bg-slate-800 rounded flex items-center justify-center">
                            <span className="text-[8px] font-bold text-white tracking-widest">VISA</span>
                        </div>
                        <div className="flex-1">
                            <span className="text-xs font-semibold text-slate-900">Personal •••• 4242</span>
                        </div>
                    </div>
                    <button className="text-[10px] font-bold text-primary hover:text-primary-dark transition-colors">Change</button>
                </div>
                <button 
                    onClick={handleBookTrip}
                    className="w-full h-14 bg-midnight text-white rounded-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                    <span className="text-base font-bold">Book Transfer</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-mono font-medium">£{totalPrice.toFixed(2)}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    </div>
  );
};

export default BookingAirportScreen;