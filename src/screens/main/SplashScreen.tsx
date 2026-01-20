import React from 'react';
import { Screen } from '@/types';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const SplashScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative h-screen w-full bg-black text-white flex flex-col justify-between p-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1566367576585-0909dffbe627?auto=format&fit=crop&q=80&w=2574" 
          alt="Luxury Car" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black"></div>
      </div>

      <div className="relative z-10 pt-20 flex justify-center">
        <h1 className="italic text-6xl tracking-tighter drop-shadow-xl text-center">PrivateHire</h1>
      </div>

      <div className="relative z-10 pb-10 space-y-6">
        <div className="space-y-2">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Plan your journey</p>
            <h2 className="text-5xl font-bold leading-tight">
                Premium Travel <br />
                <span className="text-gray-300">at Your Fingertips</span>
            </h2>
        </div>
        
        <button 
          onClick={() => onNavigate(Screen.AUTH_SIGNIN)}
          className="w-full bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 rounded-2xl shadow-glow transition-all active:scale-95 border border-white/10 backdrop-blur-sm"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;