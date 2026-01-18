import React, { useState } from 'react';
import { Screen } from '../types';
import MapBackground from '../components/MapBackground';
import { HISTORY } from '../constants';
import { Locate, Share2, Star, MessageCircle, MapPin } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const ActivityScreen: React.FC<Props> = ({ onNavigate }) => {
  const [view, setView] = useState<'ongoing' | 'history'>('ongoing');

  return (
    <div className="relative min-h-screen bg-bg-light pb-24">
      {view === 'ongoing' && (
        <div className="fixed inset-0 z-0 h-screen w-full">
            <MapBackground className="w-full h-full" dark={true} />
            <div className="absolute inset-0 bg-midnight/30 pointer-events-none"></div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 pt-12 pb-4 flex flex-col items-center pointer-events-none">
         <h1 className={`text-xl font-bold tracking-tight mb-4 transition-colors ${view === 'ongoing' ? 'text-white' : 'text-midnight'}`}>Activity</h1>
         <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-1.5 rounded-full flex gap-1 shadow-lg border border-white/20">
            <button 
                onClick={() => setView('ongoing')}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${view === 'ongoing' ? 'bg-midnight text-white shadow-md' : 'text-slate-500 hover:text-midnight'}`}
            >
                Ongoing
            </button>
            <button 
                onClick={() => setView('history')}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${view === 'history' ? 'bg-midnight text-white shadow-md' : 'text-slate-500 hover:text-midnight'}`}
            >
                History
            </button>
         </div>
      </div>

      {view === 'ongoing' ? (
        <div className="relative z-10 px-4 min-h-[calc(100vh-140px)] flex flex-col justify-between pb-24">
            {/* Status Card */}
            <div className="mt-6 flex justify-center">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl shadow-lg flex items-center gap-4 text-white">
                     <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold opacity-70 uppercase tracking-tighter">Status: Live</span>
                        <span className="text-sm font-bold">Arriving in 5 mins</span>
                     </div>
                     <div className="h-8 w-px bg-white/20 mx-1"></div>
                     <MapPin size={20} className="text-gold" />
                 </div>
            </div>

            {/* Bottom Panel */}
            <div className="w-full space-y-4">
                 <div className="flex flex-col gap-3 absolute bottom-64 right-4">
                    <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-midnight shadow-lg">
                        <Locate size={22} />
                    </button>
                     <button className="w-12 h-12 rounded-full bg-midnight flex items-center justify-center text-gold shadow-lg border border-white/10">
                        <Share2 size={22} />
                    </button>
                 </div>

                 <div className="bg-white rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] p-6 pb-8 relative">
                    <div className="absolute -top-3 left-8 bg-gold text-midnight text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg tracking-tighter uppercase italic">
                        15% Premium Discount
                    </div>
                    <div className="flex items-center gap-5 mt-2">
                        <div className="relative shrink-0">
                            <div className="h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-midnight via-gold to-midnight">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974" alt="Driver" className="h-full w-full object-cover rounded-full border-2 border-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-midnight text-gold text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5 border border-white/10">
                                <Star size={10} fill="currentColor" /> 4.9
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Chauffeur</span>
                            <h2 className="text-xl font-bold text-midnight truncate font-display">James Sterling</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-semibold text-primary">Mercedes E-Class</span>
                                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Deep Blue</span>
                            </div>
                        </div>
                        <button className="shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-midnight text-gold shadow-lg active:scale-95 transition-all">
                            <MessageCircle size={24} />
                        </button>
                    </div>
                 </div>
            </div>
        </div>
      ) : (
        <div className="relative z-10 px-4 pt-4 flex flex-col gap-4">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-bold text-midnight">Recent History</h3>
                <button className="text-xs font-black uppercase tracking-widest text-gold hover:text-yellow-600">View All</button>
             </div>
             {HISTORY.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">{item.type}</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{item.date}, {item.time}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block text-lg font-bold text-midnight">£{item.price.toFixed(2)}</span>
                            <span className="inline-flex items-center text-[10px] font-bold text-green-600 gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> {item.status}
                            </span>
                        </div>
                    </div>
                    <div className="relative pl-5 border-l-2 border-slate-100 ml-1 space-y-4">
                        <div className="relative">
                            <div className="absolute -left-[27px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-primary shadow-sm"></div>
                            <p className="text-sm font-bold text-midnight truncate">{item.pickup}</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[27px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-gold"></div>
                            <p className="text-sm font-bold text-midnight truncate">{item.destination}</p>
                        </div>
                    </div>
                </div>
             ))}
        </div>
      )}
    </div>
  );
};

export default ActivityScreen;