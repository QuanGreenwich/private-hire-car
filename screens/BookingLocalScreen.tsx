import React, { useState } from 'react';
import { Screen, Vehicle } from '../types';
import MapBackground from '../components/MapBackground';
import { ArrowLeft, MapPin, PlusCircle, PenLine, CreditCard, ChevronRight, User, Clock, CheckCircle2 } from 'lucide-react';
import { VEHICLES } from '../constants';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const BookingLocalScreen: React.FC<Props> = ({ onNavigate }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>(VEHICLES[0].id);

  return (
    <div className="relative flex flex-col min-h-screen bg-bg-light">
      {/* Map Header */}
      <div className="relative w-full h-[45vh] bg-slate-200 overflow-hidden shadow-sm z-0">
        <MapBackground className="w-full h-full opacity-90">
             <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
                <button onClick={() => onNavigate(Screen.HOME)} className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-slate-700">
                    <ArrowLeft size={20} />
                </button>
                <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-md">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Local Journey</span>
                </div>
                <div className="w-10"></div>
            </div>
            
            {/* Route Viz */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-full max-w-[80%] pointer-events-none">
                <svg className="w-full h-32 drop-shadow-xl" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 80 C 100 80, 150 20, 280 20" stroke="#0f388a" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 4" />
                    <circle cx="20" cy="80" r="6" fill="#0f388a" className="animate-pulse" />
                    <circle cx="280" cy="20" r="6" fill="#0f388a" />
                </svg>
                <div className="absolute bottom-4 left-0 bg-white px-2 py-1 rounded shadow-lg text-[10px] font-bold text-primary">5 min</div>
            </div>
        </MapBackground>
      </div>

      {/* Floating Panel */}
      <div className="relative -mt-20 z-10 w-full max-w-md mx-auto flex flex-col gap-6 px-6 pb-32">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-float p-5 relative">
             <div className="absolute left-[29px] top-[48px] bottom-[48px] w-0.5 bg-slate-200 z-0"></div>
             
             <div className="relative flex items-center gap-4 h-12 border-b border-slate-100 z-10">
                <div className="w-4 h-4 rounded-full border-[3px] border-primary bg-white z-10 shrink-0"></div>
                <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pickup</label>
                    <input type="text" readOnly value="Current Location" className="w-full p-0 bg-transparent border-none text-sm font-semibold text-slate-900 focus:ring-0" />
                </div>
                <button className="text-slate-400 hover:text-primary"><MapPin size={20} /></button>
             </div>

             <div className="relative flex items-center gap-4 h-12 pt-2 z-10">
                <div className="w-4 h-4 bg-slate-900 z-10 shrink-0 shadow-sm"></div>
                 <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</label>
                    <input type="text" placeholder="Where are you going?" className="w-full p-0 bg-transparent border-none text-sm font-semibold text-slate-900 focus:ring-0 placeholder:text-slate-400" />
                </div>
                <button className="text-slate-400 hover:text-primary"><PlusCircle size={20} /></button>
             </div>
        </div>

        {/* Vehicle Selection */}
        <div className="w-full">
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-base font-bold text-slate-900">Choose Vehicle</h3>
                <span className="text-[10px] uppercase font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">15% Off</span>
            </div>
            
            <div className="flex flex-col gap-2.5">
                {VEHICLES.map((vehicle) => (
                    <label key={vehicle.id} className="relative cursor-pointer group w-full">
                        <input 
                            type="radio" 
                            name="vehicle" 
                            className="peer sr-only" 
                            checked={selectedVehicle === vehicle.id}
                            onChange={() => setSelectedVehicle(vehicle.id)}
                        />
                        <div className="flex items-center p-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-checked:bg-blue-50/50">
                            <div className="w-14 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                <img src={vehicle.image} alt={vehicle.name} className="w-10 h-auto object-contain" />
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-bold text-slate-900">{vehicle.name}</h4>
                                    <span className="flex items-center text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md gap-0.5">
                                        <User size={10} /> {vehicle.passengers}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs font-semibold text-green-600">{vehicle.eta} min</span>
                                    <span className="text-[10px] text-slate-400">• 14:32</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-slate-400 line-through decoration-red-400">£{(vehicle.price * 1.15).toFixed(2)}</span>
                                    <span className="text-base font-bold text-slate-900">£{vehicle.price.toFixed(2)}</span>
                                </div>
                            </div>
                            {selectedVehicle === vehicle.id && (
                                <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full text-primary shadow-sm">
                                    <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                                </div>
                            )}
                        </div>
                    </label>
                ))}
            </div>
        </div>

        <div className="bg-white/50 rounded-xl p-3 flex items-start gap-3 border border-slate-100">
            <PenLine className="text-slate-400" size={20} />
            <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">Add note to driver</p>
                <p className="text-xs text-slate-400">Gate code, luggage details, etc.</p>
            </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 pb-safe pt-4 px-6 rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
            <div className="max-w-md mx-auto flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-5 bg-slate-800 rounded flex items-center justify-center">
                            <span className="text-[8px] font-bold text-white tracking-widest">VISA</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">Personal •••• 4242</span>
                    </div>
                    <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors">Change</button>
                </div>
                <button 
                    onClick={() => onNavigate(Screen.ACTIVITY)}
                    className="w-full h-14 bg-midnight text-white rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mb-4"
                >
                    <span className="text-lg font-bold font-display">Book Standard</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-mono font-medium">£12.75</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingLocalScreen;