import React from 'react';
import { Screen } from '@/types';
import { NOTIFICATIONS } from '@/constants';
import { Car, CheckCircle2, PiggyBank, Receipt, Check } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const NotificationsScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen bg-bg-light flex flex-col">
        <header className="flex-none px-6 pt-12 pb-4 bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100">
            <div className="flex justify-between items-end">
                <h1 className="text-3xl font-display font-bold text-midnight">Notifications</h1>
                <button className="text-sm font-semibold text-primary pb-1">Mark all read</button>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-28 pt-4">
            <div className="mb-6">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-2">Today</h2>
                {NOTIFICATIONS.filter(n => n.time === 'Now' || n.time.includes('h ago')).map(item => (
                    <NotificationCard key={item.id} item={item} />
                ))}
            </div>
             <div className="mb-6">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-2">Yesterday</h2>
                {NOTIFICATIONS.filter(n => !n.time.includes('Now') && !n.time.includes('h ago')).map(item => (
                    <NotificationCard key={item.id} item={item} />
                ))}
                 <div className="relative w-full bg-white rounded-xl p-4 mb-3 shadow-card border border-transparent opacity-80 hover:opacity-100 transition-all">
                     <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            <Receipt size={24} />
                        </div>
                        <div className="flex-1 pr-2">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-base font-medium text-midnight leading-tight">Receipt Available</h3>
                                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">09:45</span>
                            </div>
                            <p className="text-[15px] text-gray-500 font-normal leading-normal">Your receipt for the ride to Canary Wharf is ready.</p>
                        </div>
                     </div>
                 </div>
            </div>

            <div className="flex flex-col items-center justify-center pt-8 pb-4 opacity-50">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Check className="text-gray-400" size={32} />
                </div>
                <p className="text-sm font-medium text-gray-400">You're all caught up</p>
            </div>
        </main>
    </div>
  );
};

const NotificationCard = ({ item }: { item: any }) => {
    let Icon = Car;
    let bgClass = "bg-primary/10 text-primary";
    
    if (item.type === 'success') {
        Icon = CheckCircle2;
        bgClass = "bg-green-100 text-green-600";
    } else if (item.type === 'promo') {
        Icon = PiggyBank;
        bgClass = "bg-amber-100 text-amber-600";
    }

    return (
        <div className={`relative w-full bg-white rounded-xl p-4 mb-3 shadow-card border border-transparent hover:border-primary/10 transition-all active:scale-[0.99] cursor-pointer ${!item.read ? 'border-l-4 border-l-primary' : ''}`}>
            {!item.read && (
                 <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
            )}
            <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${bgClass}`}>
                    <Icon size={24} />
                </div>
                <div className="flex-1 pr-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-base font-bold text-midnight leading-tight">{item.title}</h3>
                        <span className="text-xs font-medium text-primary mt-0.5">{item.time}</span>
                    </div>
                    <p className="text-[15px] text-gray-500 mt-1 leading-relaxed font-normal">{item.message}</p>
                    {item.type === 'alert' && (
                        <div className="mt-3 flex gap-3">
                            <button className="px-4 py-2 rounded-lg border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wide">Track Ride</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsScreen;