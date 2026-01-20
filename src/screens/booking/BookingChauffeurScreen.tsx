import React, { useState } from 'react';
import { Screen } from '@/types';
import MapBackground from '@/components/MapBackground';
import { ArrowLeft, MoreHorizontal, Navigation, Edit2, Car, Luggage, User, Check, Verified, ChevronRight, Info, PenLine } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const BookingChauffeurScreen: React.FC<Props> = ({ onNavigate }) => {
  const [duration, setDuration] = useState('8h');
  const [rentalType, setRentalType] = useState<'hourly' | 'daily'>('hourly');
  const [selectedVehicle, setSelectedVehicle] = useState<'sedan' | 'mpv'>('sedan');
  
  const basePrice = selectedVehicle === 'sedan' ? 480 : 620;
  const finalPrice = Math.round(basePrice * 0.85);

  return (
    <div className="relative h-screen flex flex-col bg-bg-light overflow-hidden">
        {/* Header Section - Fixed */}
        <div className="relative w-full h-[28vh] rounded-b-[2.5rem] overflow-hidden shadow-xl z-0 bg-slate-900 shrink-0">
             <MapBackground className="w-full h-full">
                 <div className="absolute top-6 left-0 w-full px-6 flex items-center justify-between z-40">
                    <button onClick={() => onNavigate(Screen.HOME)} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:bg-white/20 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-white text-base font-semibold tracking-tight">Chauffeur Hire</h1>
                    <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:bg-white/20 transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                 </div>
                 
                 <div className="absolute bottom-8 left-6 right-6 z-30">
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 flex items-center gap-4 shadow-lg border-l-4 border-gold">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 text-gold">
                            <Navigation size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-gold mb-0.5">Pickup Location</p>
                            <h2 className="text-sm font-bold text-slate-900 truncate">The Dorchester, Park Lane</h2>
                        </div>
                        <button className="text-xs font-bold text-primary px-2 py-1 bg-slate-100 rounded-md">Edit</button>
                    </div>
                 </div>
             </MapBackground>
        </div>


        <div className="flex-1 overflow-y-auto px-6 -mt-4 relative z-10 pb-44">
          <div className="w-full max-w-md mx-auto space-y-3">
            {/* Duration Section */}
            <section>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-slate-900">Rental Duration</h3>
                    <div className="flex bg-slate-200 rounded-lg p-0.5">
                        <button 
                            onClick={() => {
                                setRentalType('hourly');
                                setDuration('8h');
                            }}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${rentalType === 'hourly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Hourly
                        </button>
                        <button 
                            onClick={() => {
                                setRentalType('daily');
                                setDuration('2d');
                            }}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${rentalType === 'daily' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Daily
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {(rentalType === 'hourly' 
                        ? [{value: '4h', label: 'Minimum'}, {value: '8h', label: 'Full Day', badge: true}, {value: '12h', label: 'Extended'}, {value: '24h', label: 'Multi-day'}]
                        : [{value: '1d', label: 'Single Day'}, {value: '2d', label: 'Weekend', badge: true}, {value: '3d', label: 'Short Trip'}, {value: '7d', label: 'Weekly'}]
                    ).map((option) => {
                        const isSelected = duration === option.value;
                        return (
                            <button 
                                key={option.value}
                                onClick={() => setDuration(option.value)}
                                className={`relative w-full h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${isSelected ? 'bg-gold/5 border-gold shadow-glow' : 'bg-white border-slate-100'}`}
                            >
                                {option.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                        Best Value
                                    </div>
                                )}
                                <span className={`text-xl font-bold ${isSelected ? 'text-slate-900' : 'text-slate-900'}`}>
                                    {rentalType === 'hourly' ? option.value : option.value.replace('d', ' day' + (option.value === '1d' ? '' : 's'))}
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
                <h3 className="text-base font-semibold text-slate-900 mb-2">Select Vehicle Class</h3>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setSelectedVehicle('sedan')}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all ${selectedVehicle === 'sedan' ? 'bg-gold/5 border-gold' : 'bg-white border-slate-200'}`}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm">Premium Sedan</h4>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedVehicle === 'sedan' ? 'border-gold bg-gold' : 'border-slate-300'}`}>
                                {selectedVehicle === 'sedan' && <Check size={10} className="text-white" />}
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500">S-Class • 3 seats</p>
                        <p className="text-xs font-bold text-gold mt-1">£{basePrice}</p>
                    </button>
                    <button 
                        onClick={() => setSelectedVehicle('mpv')}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all ${selectedVehicle === 'mpv' ? 'bg-gold/5 border-gold' : 'bg-white border-slate-200'}`}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm">Luxury MPV</h4>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedVehicle === 'mpv' ? 'border-gold bg-gold' : 'border-slate-300'}`}>
                                {selectedVehicle === 'mpv' && <Check size={10} className="text-white" />}
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500">V-Class • 6 seats</p>
                        <p className="text-xs font-bold text-gold mt-1">£{basePrice}</p>
                    </button>
                </div>
            </section>

            <div className="bg-white/50 rounded-xl p-2.5 flex items-start gap-2 border border-slate-100">
                <PenLine className="text-slate-400" size={18} />
                <div className="flex-1">
                    <p className="text-xs font-medium text-slate-700">Add note to driver</p>
                    <p className="text-[10px] text-slate-400">Gate code, luggage, etc.</p>
                </div>
            </div>
          </div>
        </div>

      {/* Bottom Action - Fixed */}
      <div className="fixed bottom-0 left-0 w-full z-40 px-6 pb-6 bg-gradient-to-t from-bg-light via-bg-light to-transparent pt-4">
            <div className="max-w-md mx-auto flex flex-col gap-3">
                <div className="flex items-center justify-between px-3 bg-white rounded-xl p-2.5 shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-5 bg-slate-800 rounded flex items-center justify-center">
                            <span className="text-[8px] font-bold text-white tracking-widest">VISA</span>
                        </div>
                        <div className="flex-1">
                            <span className="text-sm font-semibold text-slate-900">Personal •••• 4242</span>
                        </div>
                    </div>
                    <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors">Change</button>
                </div>
                <button 
                    onClick={() => onNavigate(Screen.ACTIVITY)}
                    className="w-full h-14 bg-gold text-midnight rounded-xl shadow-lg shadow-gold/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                    <span className="text-lg font-bold font-display">Confirm {selectedVehicle === 'sedan' ? 'Sedan' : 'MPV'}</span>
                    <span className="bg-midnight/20 px-2 py-0.5 rounded text-xs font-mono font-medium">£{finalPrice}</span>
                </button>
            </div>
      </div>
    </div>
  );
};

export default BookingChauffeurScreen;