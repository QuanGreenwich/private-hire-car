import React from 'react';
import { MAP_IMAGE_URL } from '../constants';

interface MapBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  dark?: boolean;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ className = '', children, dark = false }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${dark ? 'grayscale invert brightness-[0.4] contrast-125' : 'opacity-80'}`}
        style={{ backgroundImage: `url('${MAP_IMAGE_URL}')` }}
      />
      {/* Overlay gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${dark ? 'from-midnight/60 via-transparent to-midnight/90' : 'from-slate-100/50 to-transparent'}`}></div>
      
      {children}
    </div>
  );
};

export default MapBackground;