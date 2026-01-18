import React from 'react';
import { Screen } from '../types';
import MapBackground from '../components/MapBackground';
import { Menu, Locate, Search, Mic, Car, Plane, Hotel, Briefcase, ArrowRight, History } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative h-screen w-full flex flex-col bg-bg-light pb-20">
      {/* Map Section */}
      <div className="relative w-full h-[45vh] rounded-b-[2.5rem] overflow-hidden shadow-lg z-0">
        <MapBackground className="w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 animate-pulse">
                    <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-white shadow-lg"></div>
                </div>
                <div className="mt-1 bg-white px-3 py-1 rounded-full shadow-lg text-xs font-bold text-primary whitespace-nowrap">
                    Current Location
                </div>
            </div>
            
            {/* Header buttons */}
            <button className="absolute top-6 left-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-slate-700">
                <Menu size={20} />
            </button>
            <button className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-slate-700">
                <Locate size={20} />
            </button>
        </MapBackground>
      </div>

      {/* Floating Search */}
      <div className="relative px-6 -mt-8 z-10 w-full max-w-md mx-auto">
        <div className="flex w-full items-center bg-white h-16 rounded-2xl shadow-float transition-transform transform active:scale-[0.98]">
            <div className="flex items-center justify-center pl-5 pr-3 text-primary">
                <Search size={24} />
            </div>
            <input 
                type="text" 
                placeholder="Where to?" 
                className="w-full h-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 text-lg font-medium"
            />
            <div className="pr-5 border-l border-slate-100 pl-3 h-8 flex items-center text-slate-400">
                <Mic size={20} />
            </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-8 w-full max-w-md mx-auto">
        <div className="flex justify-between items-start gap-2">
            {[
                { label: 'Local', icon: Car, action: () => onNavigate(Screen.BOOKING_LOCAL) },
                { label: 'Airport', icon: Plane, action: () => onNavigate(Screen.BOOKING_AIRPORT) },
                { label: 'Hotel', icon: Hotel, action: () => onNavigate(Screen.BOOKING_LOCAL) },
                { label: 'Chauffeur', icon: Briefcase, action: () => onNavigate(Screen.BOOKING_CHAUFFEUR) },
            ].map((item, idx) => (
                <button key={idx} onClick={item.action} className="group flex flex-col items-center gap-2 flex-1">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-active:scale-95 group-hover:shadow-primary/40">
                        <item.icon className="text-white" size={28} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 font-display">{item.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-6 mt-8 w-full max-w-md mx-auto">
        <div className="relative w-full rounded-2xl bg-primary overflow-hidden shadow-card group cursor-pointer" onClick={() => onNavigate(Screen.EXPLORE)}>
            <div className="absolute right-0 top-0 h-full w-2/3 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <div className="relative p-5 flex flex-row items-center justify-between gap-4">
                <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-white/20 text-white text-[10px] font-bold tracking-wider mb-2 uppercase">Limited Time</span>
                    <h3 className="text-xl font-bold text-white leading-tight font-display mb-1">Exclusive Offer</h3>
                    <p className="text-blue-100 text-sm opacity-90 leading-snug">Get <span className="font-bold text-white">15% off</span> your first airport transfer.</p>
                </div>
                <div className="shrink-0 h-10 px-4 bg-white text-primary rounded-lg text-sm font-bold shadow-sm flex items-center gap-1 group-hover:bg-gray-50 transition-colors">
                    Claim
                    <ArrowRight size={16} />
                </div>
            </div>
        </div>
      </div>

      {/* Recent */}
      <div className="px-6 mt-6 w-full max-w-md mx-auto">
         <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900">Recent</h3>
            <button className="text-primary text-sm font-semibold">See all</button>
         </div>
         <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <History className="text-slate-500" size={20} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">The Shard</h4>
                <p className="text-xs text-slate-500 truncate">32 London Bridge St, London SE1 9SG</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default HomeScreen;