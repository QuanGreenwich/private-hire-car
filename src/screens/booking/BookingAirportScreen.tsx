import React from 'react';
import { Screen } from '@/types';
import { ArrowLeft, MoreVertical, PlaneLanding, Badge, ArrowRight, Verified, PenLine } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const BookingAirportScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative h-screen w-full flex flex-col max-w-md mx-auto bg-bg-light overflow-hidden">
        <div className="relative w-full h-[28vh] bg-gradient-to-br from-primary via-primary-dark to-primary rounded-b-[2.5rem] overflow-hidden shadow-xl z-10 shrink-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex items-center justify-between px-6 pt-6 z-20">
                <button onClick={() => onNavigate(Screen.HOME)} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-white text-base font-semibold tracking-tight">Airport Transfer</h1>
                <div className="w-10"></div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 -mt-6 relative z-20 pb-44">
          <div className="space-y-3">
             <div className="bg-white rounded-2xl p-4 shadow-card space-y-3">
                <h3 className="text-base font-semibold text-slate-900 mb-2">Arrival Details</h3>
                
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

             <div className="bg-white rounded-2xl p-4 shadow-card">
                 <div className="flex items-start justify-between">
                    <h3 className="text-base font-semibold text-slate-900 mb-2">Meet & Greet</h3>
                    <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                    </div>
                 </div>
                 <p className="text-slate-500 text-xs leading-relaxed mb-3">Driver waits in arrivals hall with name board. 45 mins free waiting time.</p>
                 <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">Service Fee</span>
                    <span className="text-sm font-semibold text-slate-900">£15.00</span>
                 </div>
             </div>

             <div className="bg-white/50 rounded-xl p-2.5 flex items-start gap-2 border border-slate-100">
                <PenLine className="text-slate-400" size={18} />
                <div className="flex-1">
                    <p className="text-xs font-medium text-slate-700">Add note to driver</p>
                    <p className="text-[10px] text-slate-400">Gate code, luggage, etc.</p>
                </div>
             </div>
          </div>
        </div>

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
                    className="w-full h-14 bg-midnight text-white rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                    <span className="text-lg font-bold font-display">Book Transfer</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-mono font-medium">£68.00</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    </div>
  );
};

export default BookingAirportScreen;