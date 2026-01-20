import React from 'react';
import { Screen } from '@/types';
import { Settings, Edit2, Verified, ChevronRight, User, CreditCard, History, Car, Shield, Headset, Gavel, LogOut } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const AccountScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen bg-bg-light pb-24 flex flex-col">
        <div className="absolute top-0 left-0 w-full h-[320px] bg-gradient-to-b from-gray-200/50 to-transparent z-0 pointer-events-none"></div>
        
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 pt-12 pb-4 bg-bg-light/80 backdrop-blur-md">
            <h1 className="text-xl font-bold tracking-tight text-midnight">Account</h1>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-slate-500">
                <Settings size={24} />
            </button>
        </header>

        <section className="px-6 pt-2 pb-6 relative z-10 flex flex-col items-center">
            <div className="relative group mb-4">
                <div className="absolute -inset-[3px] rounded-full border border-gold/40 animate-pulse"></div>
                <div className="relative h-28 w-28 rounded-full border-4 border-white overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-2 shadow-md border-2 border-white cursor-pointer hover:bg-primary-dark transition-colors">
                    <Edit2 size={14} />
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-bold text-midnight font-display">James Sterling</h2>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 ring-1 ring-gold/10">
                    <Verified size={16} className="text-gold fill-gold/20" />
                    <span className="text-primary text-sm font-semibold tracking-wide">Gold Member</span>
                </div>
            </div>
        </section>

        <main className="flex flex-col gap-4 px-6 relative z-10">
             <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
                {[
                    { icon: User, label: "Personal Information", sub: null },
                    { icon: CreditCard, label: "Payment Methods", sub: "Cards & PayPal" },
                    { icon: History, label: "Trip History", sub: null },
                    { icon: Car, label: "Our Vehicle Fleet", sub: null },
                    { icon: Shield, label: "Safety & Driver Info", sub: null },
                    { icon: Headset, label: "Support & Call Center", sub: null },
                    { icon: Gavel, label: "Legal & Terms", sub: null },
                ].map((item, idx) => (
                    <div key={idx}>
                         <button className="w-full group flex items-center justify-between p-4 pl-5 hover:bg-slate-50 transition-colors active:bg-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                                    <item.icon size={22} />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[15px] font-semibold text-midnight">{item.label}</span>
                                    {item.sub && <span className="text-[11px] text-slate-500">{item.sub}</span>}
                                </div>
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors pr-2" size={24} />
                         </button>
                         {idx < 6 && <div className="h-px bg-gray-100 mx-5"></div>}
                    </div>
                ))}
             </div>

             <button 
                onClick={() => onNavigate(Screen.AUTH_SIGNIN)}
                className="mt-6 w-full group flex items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:bg-red-50 active:bg-red-100 transition-colors"
            >
                <LogOut size={20} className="text-red-500" />
                <span className="text-sm font-semibold text-red-500">Log Out</span>
             </button>

             <div className="mt-4 mb-2 flex justify-center items-center gap-1 opacity-40">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <div className="h-1 w-1 rounded-full bg-primary"></div>
             </div>
             <p className="text-center text-[10px] text-gray-400 font-medium tracking-wide pb-4">VERSION 4.2.0 • LONDON</p>
        </main>
    </div>
  );
};

export default AccountScreen;