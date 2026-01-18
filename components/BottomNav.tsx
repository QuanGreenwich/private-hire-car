import React from 'react';
import { Home, Clock, Compass, Bell, User } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: Screen.HOME, label: 'Home', icon: Home },
    { id: Screen.ACTIVITY, label: 'Activity', icon: Clock },
    { id: Screen.EXPLORE, label: 'Explore', icon: Compass },
    { id: Screen.NOTIFICATIONS, label: 'Alerts', icon: Bell, badge: true },
    { id: Screen.ACCOUNT, label: 'Account', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 pb-safe pt-2 px-6 z-50">
      <div className="flex items-center justify-between h-16 w-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 w-12 group transition-all duration-300`}
            >
              <div className="relative p-1">
                <Icon 
                  size={24} 
                  className={`transition-colors duration-300 ${isActive ? 'text-primary fill-primary/20' : 'text-slate-400 group-hover:text-slate-600'}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.badge && (
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                )}
                {isActive && (
                   <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-t-full shadow-[0_0_10px_rgba(20,75,184,0.5)]"></div>
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="h-4 w-full" /> {/* Safe area spacer */}
    </div>
  );
};

export default BottomNav;