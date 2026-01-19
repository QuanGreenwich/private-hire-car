import React from 'react';
import { Screen } from '../types';
import { ArrowLeft, MoreVertical, PlaneLanding, Badge, ArrowRight, Verified } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const BookingAirportScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col max-w-md mx-auto bg-bg-light pb-40">
        <div className="relative bg-gradient-to-b from-primary to-primary-dark pt-14 pb-12 px-6 rounded-b-[2.5rem] shadow-lg z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="relative flex items-center justify-between mb-6">
                <button onClick={() => onNavigate(Screen.HOME)} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-white font-display font-semibold text-lg tracking-wide opacity-90">Booking</h1>
                <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>
            <div className="relative">
                <h2 className="text-3xl font-display font-bold text-white mb-2">Airport Transfer</h2>
                <p className="text-white/70 font-body text-sm">Professional chauffeurs & flight tracking included.</p>
            </div>
        </div>

        <div className="px-6 -mt-8 relative z-20 space-y-5">
             <div className="bg-white rounded-2xl p-5 shadow-card space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <PlaneLanding className="text-primary" size={24} />
                    <h3 className="font-display font-bold text-primary">Arrival Details</h3>
                </div>
                
                <div className="relative">
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Airport</label>
                    <select className="w-full bg-slate-50 border border-slate-200 text-primary font-semibold rounded-xl py-3 pl-4 pr-10 focus:ring-2 focus:ring-primary/20 outline-none">
                        <option>London Heathrow (LHR)</option>
                        <option>London Gatwick (LGW)</option>
                        <option>London Stansted (STN)</option>
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Flight No.</label>
                        <input className="w-full bg-slate-50 border border-slate-200 text-primary font-semibold rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="BA 1492" type="text" />
                    </div>
                    <div className="col-span-1 relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Terminal</label>
                        <select className="w-full bg-slate-50 border border-slate-200 text-primary font-semibold rounded-xl py-3 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 outline-none">
                            <option>T 5</option>
                            <option>T 4</option>
                            <option>T 3</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Date</label>
                        <input className="w-full bg-slate-50 border border-slate-200 text-primary font-semibold rounded-xl py-3 px-3 focus:ring-2 focus:ring-primary/20 outline-none text-sm" type="date" defaultValue="2023-11-24" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Time</label>
                        <input className="w-full bg-slate-50 border border-slate-200 text-primary font-semibold rounded-xl py-3 px-3 focus:ring-2 focus:ring-primary/20 outline-none text-sm" type="time" defaultValue="14:30" />
                    </div>
                </div>
             </div>

             <div className="bg-white rounded-2xl p-5 shadow-card">
                 <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                            <Badge className="text-primary" size={20} />
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-primary text-base">Meet & Greet</h3>
                            <p className="text-slate-500 text-xs mt-1 leading-relaxed max-w-[200px]">Driver waits in arrivals hall with a name board. 45 mins free waiting time.</p>
                        </div>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer mt-1">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                    </div>
                 </div>
                 <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">Service Fee</span>
                    <span className="text-sm font-bold text-primary">£15.00</span>
                 </div>
             </div>

             <div className="bg-primary rounded-2xl p-6 shadow-xl text-white relative overflow-hidden group">
                 <div className="relative z-10 space-y-3">
                    <div className="flex justify-between items-center text-sm opacity-80">
                        <span>Base Fare</span>
                        <span>£65.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm opacity-80">
                        <span>Meet & Greet</span>
                        <span>£15.00</span>
                    </div>
                    <div className="flex justify-between items-center text-gold font-medium">
                        <div className="flex items-center gap-1">
                            <Verified size={16} />
                            <span>Online Discount (15%)</span>
                        </div>
                        <span>-£12.00</span>
                    </div>
                    <div className="h-px bg-white/20 my-2"></div>
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-medium opacity-80 mb-1">Total Price</span>
                        <span className="text-3xl font-display font-bold text-white">£68.00</span>
                    </div>
                 </div>
             </div>
        </div>

        <div className="fixed bottom-20 left-0 w-full px-6 z-40">
            <div className="w-full max-w-md mx-auto">
                <button 
                    onClick={() => onNavigate(Screen.ACTIVITY)}
                    className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all text-white font-display font-bold text-lg h-14 rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                    <span>Book Transfer</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default BookingAirportScreen;