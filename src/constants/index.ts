import { Vehicle, NotificationItem, HistoryItem } from './types';

export const MAP_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCg3cRsI7V8BBk0Wuj1kupcuIS1dlNkzkqJWrpv7iSsNxk6Qbj_-62x7s3ibPywcyG8bi0xOhshPvp3MdYmtrS2L2mhtrINENR6i29k1bAi4zsu1csoIfEajO7OiLBRT0u5k1zIH0NlGqWf-ud95X0p7k-yaAGZHSGpCC8ZuzjGqQu8AUWnn5vlz3cRp2mHEWe1eNcpRetw8ykllqvmGB2VKmcvyokGmxgeHZJYi39I_sjXcgcCRWkg_L9r7d180MGq6DaEQf9nOBpZ";

export const VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'Standard',
    type: 'SUV',
    passengers: 4,
    luggage: 2,
    eta: 4,
    price: 12.75,
    image: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 4A4.5 4.5 0 0 0 13 8.5a4.5 4.5 0 0 0 .5 2.08L2 22.08V24h1.92L15.42 12.5a4.5 4.5 0 0 0 2.08.5 4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 17.5 4m0 7A2.5 2.5 0 0 1 15 8.5A2.5 2.5 0 0 1 17.5 6A2.5 2.5 0 0 1 20 8.5A2.5 2.5 0 0 1 17.5 11M5 2c0 2.11 1.39 3.91 3.3 4.55L9.5 9 11 6.5 9.5 4C11.41 3.09 13 1.43 13 0H5v2z" transform="translate(0 -2) scale(0.95)"/><path d="M19.92 17c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5c.9 0 1.5-.7 1.5-1.5s-.6-1.5-1.5-1.5m-13.84 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5c.9 0 1.5-.7 1.5-1.5s-.6-1.5-1.5-1.5M18.4 8.5H5.6c-.8 0-1.5.6-1.6 1.4L3 16.5c0 .3.2.5.5.5h1.6c.2-1.2 1.2-2 2.4-2s2.2.8 2.4 2h4.2c.2-1.2 1.2-2 2.4-2s2.2.8 2.4 2h1.6c.3 0 .5-.2.5-.5l-1-6.6c-.1-.8-.8-1.4-1.6-1.4m-11.9 3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2c.3 0 .5.2.5.5s-.2.5-.5.5h-2m5 0h-2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2c.3 0 .5.2.5.5s-.2.5-.5.5m5 0h-2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2c.3 0 .5.2.5.5s-.2.5-.5.5z" transform="translate(0 2)"/></svg>'
  },
  {
    id: '2',
    name: 'Sedan',
    type: 'Executive',
    passengers: 3,
    luggage: 2,
    eta: 8,
    price: 25.50,
    image: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>',
    isPremium: true
  },
  {
    id: '3',
    name: 'MPV',
    type: 'Luxury',
    passengers: 7,
    luggage: 6,
    eta: 12,
    price: 35.00,
    image: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3V6m16 3H5c-1.11 0-2 .89-2 2v8c0 1.11.89 2 2 2h1c0 1.11.89 2 2 2s2-.89 2-2h4c0 1.11.89 2 2 2s2-.89 2-2h1c1.11 0 2-.89 2-2v-8c0-1.11-.89-2-2-2M8 19c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m2-5H6v-3h12v3z"/></svg>'
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Driver Arriving',
    message: 'Your driver, Mohammed, is 2 minutes away in a Silver Prius.',
    time: 'Now',
    type: 'alert',
    read: false
  },
  {
    id: '2',
    title: 'Booking Confirmed',
    message: 'Ride scheduled for tomorrow, 08:30 AM to Heathrow T5.',
    time: '1h ago',
    type: 'success',
    read: true
  },
  {
    id: '3',
    title: 'Weekend Offer',
    message: 'Get 10% off your next ride to Central London.',
    time: '16:20',
    type: 'promo',
    read: true
  }
];

export const HISTORY: HistoryItem[] = [
  {
    id: '1',
    date: 'Today',
    time: '09:41 AM',
    pickup: 'Heathrow Airport Terminal 5',
    destination: 'Kensington High St, London',
    price: 45.00,
    status: 'Completed',
    type: 'Private Hire'
  },
  {
    id: '2',
    date: 'Yesterday',
    time: '06:30 PM',
    pickup: 'Soho House, Greek St',
    destination: 'Canary Wharf Underground',
    price: 22.50,
    status: 'Completed',
    type: 'Business'
  }
];