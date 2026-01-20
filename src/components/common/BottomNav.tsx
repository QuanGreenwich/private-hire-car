import React from 'react';
import { Home, Clock, Compass, Bell, User } from 'lucide-react';
import { Screen } from '@/types';

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
    <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 pb-safe z-50">
      {/* Indicator bar - positioned at top */}
      <div className="relative h-1 w-full">
        {navItems.map((item, index) => {
          const isActive = currentScreen === item.id;
          return isActive ? (
            <div
              key={item.id}
              className="absolute top-0 h-1 bg-primary transition-all duration-300 rounded-b-full"
              style={{
                left: `${(index / navItems.length) * 100}%`,
                width: `${100 / navItems.length}%`,
              }}
            >
              <div className="w-10 h-full bg-primary rounded-b-full mx-auto"></div>
            </div>
          ) : null;
        })}
      </div>
      
      {/* Navigation items */}
      <div className="flex items-center justify-between pt-2 pb-4 px-6 w-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center gap-1 w-12 group transition-all duration-300`}
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
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;