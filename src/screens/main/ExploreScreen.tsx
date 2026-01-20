import React from 'react';
import { Screen } from '@/types';
import { Car, Users } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const ExploreScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative h-screen bg-gray-50 flex flex-col pb-24">
       <header className="flex-none px-6 pt-12 pb-4 bg-white/95 backdrop-blur-md z-20 shadow-sm">
         <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-black">Explore & Offers</h1>
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center shadow-sm">
                <span className="text-slate-500 text-lg font-bold">U</span>
            </div>
         </div>
       </header>

       {/* Tabs - Fixed dưới header */}
       <div className="flex-none px-6 py-3 bg-white border-b border-gray-100 z-10">
           <div className="flex h-14 w-full items-center justify-center rounded-2xl bg-gray-100 p-1">
               <label className="group relative flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-4 text-base font-semibold transition-all">
                   <input type="radio" name="offer-type" defaultChecked className="peer invisible w-0 absolute" />
                   <span className="z-10 text-gray-600 peer-checked:text-indigo-700 transition-colors">All Offers</span>
                   <span className="absolute inset-0 bg-white shadow-md scale-95 opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100 rounded-xl"></span>
               </label>
               <label className="group relative flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-4 text-base font-semibold transition-all">
                   <input type="radio" name="offer-type" className="peer invisible w-0 absolute" />
                   <span className="z-10 text-gray-600 peer-checked:text-indigo-700 transition-colors">My Rewards</span>
                   <span className="absolute inset-0 bg-white shadow-md scale-95 opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100 rounded-xl"></span>
               </label>
           </div>
       </div>

       <main className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="flex flex-col gap-6 p-6">
                {/* Card 1 */}
                <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 hover:scale-[1.01]">
                    <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo-700 backdrop-blur-md shadow-sm gap-1.5">
                            <Car size={14} /> Digital Exclusive
                        </span>
                    </div>
                    <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2000')" }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    </div>
                    <div className="flex flex-col p-5 bg-gray-50">
                        <h3 className="text-lg font-bold leading-tight text-black mb-2">Airport Transfer Special</h3>
                        <p className="text-gray-600 text-base leading-relaxed mb-4">Get 15% off your next airport transfer when booking via the app. Valid for Heathrow & Gatwick.</p>
                        <div className="flex items-center justify-between mt-auto">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expires in 3 days</div>
                            <button className="flex h-11 items-center justify-center rounded-xl bg-indigo-700 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-700/30 transition-all hover:bg-indigo-800 active:scale-95">
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
                        <div className="col-span-12 sm:col-span-8 p-5 flex flex-col justify-center bg-white">
                            <div className="flex items-center gap-2 mb-1">
                                <Users size={20} className="text-indigo-700" />
                                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Referral Program</span>
                            </div>
                            <h3 className="text-lg font-bold text-black mb-1">Ride Together</h3>
                            <p className="text-gray-600 text-base leading-relaxed mb-4">Give £10, Get £10. Refer a friend to PrivateHire and earn credits.</p>
                            <button className="self-start flex h-10 items-center justify-center rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-5 text-sm font-semibold transition-colors">
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
                            <h3 className="text-lg font-bold text-white mb-1">London Nights</h3>
                            <p className="text-gray-200 text-base font-medium opacity-90">Flat rates to the West End every Friday & Saturday.</p>
                        </div>
                    </div>
                    <div className="p-5 flex items-center justify-between border-t border-gray-100 bg-white">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium">Fixed Fare</span>
                            <span className="text-lg font-bold text-black">£25.00</span>
                        </div>
                        <button className="flex h-11 items-center justify-center rounded-xl bg-indigo-700 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-700/30 transition-all hover:bg-indigo-800 active:scale-95">
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