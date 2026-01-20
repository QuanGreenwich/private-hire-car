import React, { useState } from 'react';
import { Screen } from '@/types';
import { ArrowLeft, Map, Bed, Search, MapPin, Clock, TrendingUp, Star } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

interface Hotel {
  id: string;
  name: string;
  distance: string;
  rating: number;
}

interface VehicleOption {
  id: string;
  name: string;
  type: string;
  price: number;
  eta: string;
}

const NEARBY_HOTELS: Hotel[] = [
  { id: '1', name: 'The Ritz', distance: '0.2 mi', rating: 5.0 },
  { id: '2', name: 'The Savoy', distance: '0.5 mi', rating: 4.9 },
  { id: '3', name: 'Claridge\'s', distance: '0.8 mi', rating: 4.8 },
];

const VEHICLE_OPTIONS: VehicleOption[] = [
  { id: 'executive', name: 'Executive', type: 'Premium Sedan', price: 45.00, eta: '3 min' },
  { id: 'saloon', name: 'Saloon', type: 'Standard Hybrid', price: 32.50, eta: '8 min' },
  { id: 'luxury', name: 'Luxury MPV', type: 'Premium Van', price: 65.00, eta: '12 min' },
];

const BookingHotelScreen: React.FC<Props> = ({ onNavigate }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('executive');
  const [hotelSearch, setHotelSearch] = useState('');
  const [notes, setNotes] = useState('');
  
  const selectedVehicleData = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];

  return (
    <div className="relative h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm shrink-0">
        <div className="flex items-center justify-between">
          <button onClick={() => onNavigate(Screen.HOME)} className="w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-900">Hotel Pickup</h1>
          <button className="w-10 h-10 rounded-full flex items-center justify-center">
            <Map size={24} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        {/* Location Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
          {/* Pick-up Location */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Pick-up Location</p>
            <div className="relative flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Bed size={20} className="text-white" />
              </div>
              <input
                type="text"
                value={hotelSearch}
                onChange={(e) => setHotelSearch(e.target.value)}
                placeholder="Search hotel name..."
                className="flex-1 text-base text-slate-400 bg-transparent border-none focus:outline-none"
              />
              <Search size={20} className="text-slate-300" />
            </div>

            {/* Nearby Hotels */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-primary" />
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Nearby Hotels</p>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {NEARBY_HOTELS.map((hotel) => (
                  <button
                    key={hotel.id}
                    className="shrink-0 bg-slate-50 rounded-xl p-3 min-w-[120px] hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start gap-1 mb-1">
                      <MapPin size={12} className="text-primary mt-0.5" />
                      <span className="text-xs font-medium text-primary">{hotel.distance}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 mb-1">{hotel.name}</p>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-gold fill-gold" />
                      <span className="text-xs text-slate-600">{hotel.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Divider with line */}
          <div className="relative h-12 mb-6">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          </div>

          {/* Drop-off Location */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Drop-off Location</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-slate-400" />
              </div>
              <p className="text-base font-semibold text-slate-900">Heathrow Airport T5</p>
            </div>
          </div>
        </div>

        {/* Travel Info */}
        <div className="flex items-center gap-4 mb-4 px-2">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <Clock size={18} className="text-primary" />
            <span className="text-sm font-bold text-slate-900">45 min</span>
            <span className="text-xs text-slate-500">Traffic light</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Distance</span>
            <span className="text-sm font-bold text-slate-900">18.2 mi</span>
          </div>
        </div>

        {/* Select Vehicle */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-lg font-bold text-slate-900">Select Vehicle</h3>
            <button className="text-xs font-bold text-primary uppercase">All Options</button>
          </div>
          <div className="space-y-3">
            {VEHICLE_OPTIONS.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;
              return (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`w-full bg-white rounded-2xl p-4 flex items-center gap-4 transition-all ${
                    isSelected ? 'ring-2 ring-primary shadow-lg' : 'shadow-sm'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-gradient-to-br from-yellow-100 to-orange-100' : 'bg-slate-100'
                  }`}>
                    {/* Placeholder for car image */}
                    <div className="text-2xl">🚗</div>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-base font-bold text-slate-900 mb-0.5">{vehicle.name}</h4>
                    <p className="text-sm text-slate-500">{vehicle.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900 mb-0.5">£{vehicle.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      {vehicle.eta}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute right-4 top-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes for Driver */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 mb-3 px-2">Notes for Driver</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Room number, waiting in lobby, or concierge assistance required..."
              rows={3}
              className="w-full text-sm text-slate-600 placeholder:text-slate-300 bg-transparent border-none focus:outline-none resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Optional</span>
              <button className="text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action - Fixed */}
      <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-4">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          {/* Payment Method */}
          <button className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-white">💳</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">Personal •••• 4242</span>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Confirm Button */}
          <button
            onClick={() => onNavigate(Screen.ACTIVITY)}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-base shadow-xl flex items-center justify-between px-6 transition-all active:scale-[0.98]"
          >
            <span>Confirm Pickup</span>
            <div className="flex items-center gap-2">
              <span className="text-lg">£{selectedVehicleData.price.toFixed(2)}</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingHotelScreen;
