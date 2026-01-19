import React, { useState } from 'react';
import { Screen } from '../types';
import MapBackground from '../components/MapBackground';
import { ArrowLeft, MoreHorizontal, Navigation, Edit2, Car, Luggage, User, Check, Verified, ChevronRight, Info } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const BookingChauffeurScreen: React.FC<Props> = ({ onNavigate }) => {
  const [duration, setDuration] = useState('8h');
  const [rentalType, setRentalType] = useState<'hourly' | 'daily'>('hourly');

  return (
    <div className="relative flex flex-col min-h-screen bg-bg-light pb-24">
        {/* Header Section */}
        <div className="relative w-full h-[32vh] rounded-b-[2.5rem] overflow-hidden shadow-xl z-0 bg-slate-900">
             <MapBackground className="w-full h-full" dark={true}>
                 <div className="absolute top-6 left-0 w-full px-6 flex items-center justify-between z-40">
                    <button onClick={() => onNavigate(Screen.HOME)} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:bg-white/20 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-white text-lg font-bold tracking-tight">Chauffeur Hire</h1>
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


        <div className="px-6 -mt-4 relative z-10 w-full max-w-md mx-auto space-y-6">
            {/* Duration Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 font-display">Rental Duration</h3>
                    <div className="flex bg-slate-200 rounded-lg p-0.5">
                        <button 
                            onClick={() => setRentalType('hourly')}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${rentalType === 'hourly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Hourly
                        </button>
                        <button 
                            onClick={() => setRentalType('daily')}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${rentalType === 'daily' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Daily
                        </button>
                    </div>
                </div>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2">
                    {['4h', '8h', '12h', '24h'].map((time) => {
                        const isSelected = duration === time;
                        return (
                            <button 
                                key={time}
                                onClick={() => setDuration(time)}
                                className={`relative min-w-[84px] h-[76px] rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${isSelected ? 'bg-gold/5 border-gold shadow-glow' : 'bg-white border-slate-100'}`}
                            >
                                {time === '8h' && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                        Best Value
                                    </div>
                                )}
                                <span className={`text-xl font-bold ${isSelected ? 'text-slate-900' : 'text-slate-900'}`}>{time}</span>
                                <span className={`text-[10px] font-medium ${isSelected ? 'text-gold' : 'text-slate-400'}`}>
                                    {time === '4h' ? 'Minimum' : time === '8h' ? 'Full Day' : time === '12h' ? 'Extended' : 'Multi-day'}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </section>

            {/* Vehicle Selection */}
            <section>
                <h3 className="text-lg font-bold text-slate-900 font-display mb-4">Select Vehicle Class</h3>
                <div className="flex flex-col gap-4">
                    {/* Vehicle Card 1 */}
                    <div className="relative w-full p-4 rounded-2xl bg-white border-2 border-gold shadow-glow transition-all duration-300 flex items-center gap-4">
                         <div className="w-24 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                            <Car size={32} className="text-slate-400" />
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-slate-900 text-base">Premium Sedan</h4>
                                <div className="w-5 h-5 rounded-full border-2 border-gold bg-gold flex items-center justify-center">
                                    <Check size={12} className="text-white" />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 mb-2">Mercedes S-Class or similar</p>
                            <div className="flex gap-2">
                                <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded text-[10px] font-medium text-slate-600 border border-slate-100">
                                    <User size={10} /> 3
                                </span>
                                <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded text-[10px] font-medium text-slate-600 border border-slate-100">
                                    <Luggage size={10} /> 2
                                </span>
                            </div>
                         </div>
                    </div>

                    {/* Vehicle Card 2 */}
                    <div className="relative w-full p-4 rounded-2xl bg-white border-2 border-transparent shadow-sm opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center gap-4">
                         <div className="w-24 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                            <Car size={32} className="text-slate-400" />
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-slate-900 text-base">Luxury MPV</h4>
                                <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center"></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 mb-2">Mercedes V-Class or similar</p>
                            <div className="flex gap-2">
                                <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded text-[10px] font-medium text-slate-600 border border-slate-100">
                                    <User size={10} /> 6
                                </span>
                                <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded text-[10px] font-medium text-slate-600 border border-slate-100">
                                    <Luggage size={10} /> 6
                                </span>
                            </div>
                         </div>
                    </div>
                </div>
            </section>

            {/* Details List */}
            <section>
                <h3 className="text-lg font-bold text-slate-900 font-display mb-4">Chauffeur Details</h3>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <User className="text-gold" size={20} />
                            <div>
                                <h5 className="text-sm font-bold text-slate-900">Professional Chauffeur</h5>
                                <p className="text-xs text-slate-500">Uniformed, licensed, and background checked.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Verified className="text-gold" size={20} />
                            <div>
                                <h5 className="text-sm font-bold text-slate-900">Premium Service</h5>
                                <p className="text-xs text-slate-500">Meet & greet, luggage assistance, door opening.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

             {/* Price Breakdown */}
            <section className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Rate (8 Hours)</span>
                    <span className="text-sm font-semibold text-slate-900">£480.00</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gold-600 flex items-center gap-1">
                        <Verified size={16} /> First Time Discount (15%)
                    </span>
                    <span className="text-sm font-bold text-gold-600">-£72.00</span>
                </div>
                <div className="w-full h-px bg-slate-200 my-3"></div>
                <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-slate-900">Total Estimate</span>
                    <div className="text-right">
                        <span className="block text-xs text-slate-400 line-through">£480.00</span>
                        <span className="text-2xl font-bold text-slate-900">£408.00</span>
                    </div>
                </div>
            </section>

            {/* Footer Button */}
            <section className="mt-6 mb-2">
                <button 
                    onClick={() => onNavigate(Screen.ACTIVITY)}
                    className="w-full bg-midnight hover:bg-black text-white h-14 rounded-xl font-bold text-lg shadow-lg flex items-center justify-between px-6 transition-transform active:scale-[0.98]"
                >
                    <span>Confirm Booking</span>
                    <span className="flex items-center gap-2 text-base font-semibold bg-white/20 px-3 py-1 rounded-lg">
                        £408.00 <ChevronRight size={16} />
                    </span>
                </button>
            </section>
        </div>
    </div>
  );
};

export default BookingChauffeurScreen;