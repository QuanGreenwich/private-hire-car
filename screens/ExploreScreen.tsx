import React from 'react';
import { Screen } from '../types';
import { Car, Users } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const ExploreScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen bg-bg-light flex flex-col pb-24">
       <header className="flex-none px-6 pt-12 pb-4 bg-bg-light/90 backdrop-blur-md z-20 sticky top-0">
         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-display font-extrabold tracking-tight text-midnight">Explore & Offers</h1>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974" alt="Profile" className="w-full h-full object-cover" />
            </div>
         </div>
       </header>

       <main className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="px-6 py-2 sticky top-24 z-10 bg-bg-light">
                <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200/50 p-1 backdrop-blur-sm">
                    <label className="group relative flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold transition-all">
                        <input type="radio" name="offer-type" defaultChecked className="peer invisible w-0 absolute" />
                        <span className="z-10 text-gray-500 peer-checked:text-primary transition-colors">All Offers</span>
                        <span className="absolute inset-0 bg-white shadow-sm scale-95 opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100 rounded-lg"></span>
                    </label>
                    <label className="group relative flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold transition-all">
                        <input type="radio" name="offer-type" className="peer invisible w-0 absolute" />
                        <span className="z-10 text-gray-500 peer-checked:text-primary transition-colors">My Rewards</span>
                        <span className="absolute inset-0 bg-white shadow-sm scale-95 opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100 rounded-lg"></span>
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-6 p-6">
                {/* Card 1 */}
                <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 hover:scale-[1.01]">
                    <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur-md shadow-sm gap-1">
                            <Car size={14} /> Digital Exclusive
                        </span>
                    </div>
                    <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2000')" }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    </div>
                    <div className="flex flex-col p-5">
                        <h3 className="text-xl font-bold leading-tight tracking-tight text-midnight mb-2">Airport Transfer Special</h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">Get 15% off your next airport transfer when booking via the app. Valid for Heathrow & Gatwick.</p>
                        <div className="flex items-center justify-between mt-auto">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expires in 3 days</div>
                            <button className="flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 active:scale-95">
                                Claim Code
                            </button>
                        </div>
                    </div>
                </article>

                {/* Card 2 */}
                <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 hover:scale-[1.01]">
                    <div className="grid grid-cols-12 gap-0">
                        <div className="col-span-12 sm:col-span-4 h-40 sm:h-auto bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2000')" }}>
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                        </div>
                        <div className="col-span-12 sm:col-span-8 p-5 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-1">
                                <Users size={20} className="text-primary" />
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">Referral Program</span>
                            </div>
                            <h3 className="text-lg font-bold text-midnight mb-1">Ride Together</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-4">Give £10, Get £10. Refer a friend to PrivateHire and earn credits.</p>
                            <button className="self-start flex h-9 items-center justify-center rounded-xl bg-primary/10 hover:bg-primary/20 text-primary px-4 text-sm font-semibold transition-colors">
                                Invite Friends
                            </button>
                        </div>
                    </div>
                </article>

                {/* Card 3 */}
                <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 hover:scale-[1.01]">
                    <div className="h-40 w-full bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2000')" }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-5 w-3/4">
                            <h3 className="text-2xl font-bold text-white mb-1">London Nights</h3>
                            <p className="text-gray-200 text-sm font-medium opacity-90">Flat rates to the West End every Friday & Saturday.</p>
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between border-t border-gray-100">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400">Fixed Fare</span>
                            <span className="text-lg font-bold text-midnight">£25.00</span>
                        </div>
                        <button className="flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 active:scale-95">
                            View Rates
                        </button>
                    </div>
                </article>
            </div>
       </main>
    </div>
  );
};

export default ExploreScreen;