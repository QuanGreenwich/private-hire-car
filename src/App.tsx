import React, { useState } from 'react';
import { Screen } from './types';
import { BottomNav } from './components';
import {
  SplashScreen,
  AuthScreen,
  SignUpScreen,
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
} from './screens';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH:
        return <SplashScreen onNavigate={setCurrentScreen} />;
      case Screen.AUTH_SIGNIN:
        return <AuthScreen onNavigate={setCurrentScreen} />;
      case Screen.AUTH_SIGNUP:
        return <SignUpScreen onNavigate={setCurrentScreen} />;
      case Screen.HOME:
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case Screen.BOOKING_LOCAL:
        return <BookingLocalScreen onNavigate={setCurrentScreen} />;
      case Screen.BOOKING_HOTEL:
        return <BookingHotelScreen onNavigate={setCurrentScreen} />;
      case Screen.BOOKING_CHAUFFEUR:
        return <BookingChauffeurScreen onNavigate={setCurrentScreen} />;
      case Screen.BOOKING_AIRPORT:
        return <BookingAirportScreen onNavigate={setCurrentScreen} />;
      case Screen.BOOKING_MAP:
        return <BookingMapScreen onNavigate={setCurrentScreen} />;
      case Screen.ACTIVITY:
        return <ActivityScreen onNavigate={setCurrentScreen} />;
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
    Screen.AUTH_SIGNIN, 
    Screen.AUTH_SIGNUP, 
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