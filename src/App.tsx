import React, { useState } from 'react';
import { Screen } from '@/types';
import { BottomNav } from '@/components';
import {
  SplashScreen,
  HomeScreen,
  BookingLocalScreen,
  BookingHotelScreen,
  BookingChauffeurScreen,
  BookingAirportScreen,
  BookingMapScreen,
  ActivityScreen,
  NotificationsScreen,
  AccountScreen,
  ExploreScreen
} from '@/screens';

interface BookingData {
  pickup: { name: string; coords: [number, number] };
  destination: { name: string; coords: [number, number] };
  vehicle: string;
  vehicleModel?: string;
  vehicleColor?: string;
  fare: number;
  distance: number;
  duration: number;
  // Airport booking specific fields
  flightNumber?: string;
  terminal?: string;
  pickupDate?: string;
  pickupTime?: string;
  meetGreet?: boolean;
  bookingType?: 'local' | 'airport' | 'hotel' | 'chauffeur';
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [currentBooking, setCurrentBooking] = useState<BookingData | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BookingData[]>(() => {
    // Load history from localStorage on mount
    const saved = localStorage.getItem('bookingHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const handleBookingComplete = (bookingData: BookingData) => {
    setCurrentBooking(bookingData);
    setCurrentScreen(Screen.ACTIVITY);
  };

  const handleCancelTrip = () => {
    // Save to history before clearing
    if (currentBooking) {
      const updatedHistory = [...bookingHistory, { ...currentBooking, status: 'cancelled' as any }];
      setBookingHistory(updatedHistory);
      localStorage.setItem('bookingHistory', JSON.stringify(updatedHistory));
    }
    // Clear booking data and stay on Activity screen (which will show empty state)
    setCurrentBooking(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH:
        return <SplashScreen onNavigate={setCurrentScreen} />;
      case Screen.HOME:
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case Screen.BOOKING_LOCAL:
        return <BookingLocalScreen onNavigate={setCurrentScreen} onBookingComplete={handleBookingComplete} />;
      case Screen.BOOKING_HOTEL:
        return <BookingHotelScreen onNavigate={setCurrentScreen} onBookingComplete={handleBookingComplete} />;
      case Screen.BOOKING_CHAUFFEUR:
        return <BookingChauffeurScreen onNavigate={setCurrentScreen} onBookingComplete={handleBookingComplete} />;
      case Screen.BOOKING_AIRPORT:
        return <BookingAirportScreen onNavigate={setCurrentScreen} onBookingComplete={handleBookingComplete} />;
      case Screen.BOOKING_MAP:
        return <BookingMapScreen onNavigate={setCurrentScreen} />;
      case Screen.ACTIVITY:
        return <ActivityScreen onNavigate={setCurrentScreen} bookingData={currentBooking} onCancelTrip={handleCancelTrip} />;
      case Screen.NOTIFICATIONS:
        return <NotificationsScreen onNavigate={setCurrentScreen} />;
      case Screen.ACCOUNT:
        return <AccountScreen onNavigate={setCurrentScreen} />;
      case Screen.EXPLORE:
        return <ExploreScreen onNavigate={setCurrentScreen} />;
      default:
        return <SplashScreen onNavigate={setCurrentScreen} />;
    }
  };

  const showNav = ![
    Screen.SPLASH, 
    Screen.BOOKING_LOCAL,
    Screen.BOOKING_HOTEL, 
    Screen.BOOKING_CHAUFFEUR,
    Screen.BOOKING_AIRPORT,
    Screen.BOOKING_MAP
  ].includes(currentScreen);

  return (
    <div className="min-h-screen bg-bg-light font-body text-slate-900 overflow-hidden">
      {renderScreen()}
      {showNav && (
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  );
};

export default App;