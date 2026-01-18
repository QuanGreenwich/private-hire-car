export enum Screen {
  SPLASH = 'SPLASH',
  AUTH_SIGNIN = 'AUTH_SIGNIN',
  AUTH_SIGNUP = 'AUTH_SIGNUP',
  HOME = 'HOME',
  BOOKING_LOCAL = 'BOOKING_LOCAL',
  BOOKING_CHAUFFEUR = 'BOOKING_CHAUFFEUR',
  BOOKING_AIRPORT = 'BOOKING_AIRPORT',
  ACTIVITY = 'ACTIVITY',
  NOTIFICATIONS = 'NOTIFICATIONS',
  ACCOUNT = 'ACCOUNT',
  EXPLORE = 'EXPLORE'
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  passengers: number;
  luggage: number;
  eta: number; // minutes
  price: number;
  image: string;
  isPremium?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'alert' | 'promo';
  read: boolean;
}

export interface HistoryItem {
  id: string;
  date: string;
  time: string;
  pickup: string;
  destination: string;
  price: number;
  status: 'Completed' | 'Cancelled';
  type: 'Private Hire' | 'Business';
}