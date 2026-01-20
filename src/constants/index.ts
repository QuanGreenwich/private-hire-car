import { Vehicle, NotificationItem, HistoryItem } from './types';

export const MAP_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCg3cRsI7V8BBk0Wuj1kupcuIS1dlNkzkqJWrpv7iSsNxk6Qbj_-62x7s3ibPywcyG8bi0xOhshPvp3MdYmtrS2L2mhtrINENR6i29k1bAi4zsu1csoIfEajO7OiLBRT0u5k1zIH0NlGqWf-ud95X0p7k-yaAGZHSGpCC8ZuzjGqQu8AUWnn5vlz3cRp2mHEWe1eNcpRetw8ykllqvmGB2VKmcvyokGmxgeHZJYi39I_sjXcgcCRWkg_L9r7d180MGq6DaEQf9nOBpZ";

export const VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'Standard',
    type: 'Toyota Prius or similar',
    passengers: 4,
    luggage: 2,
    eta: 4,
    price: 12.75,
    image: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png'
  },
  {
    id: '2',
    name: 'Executive',
    type: 'Mercedes E-Class',
    passengers: 3,
    luggage: 2,
    eta: 8,
    price: 25.50,
    image: 'https://cdn-icons-png.flaticon.com/512/55/55283.png',
    isPremium: true
  },
  {
    id: '3',
    name: '7-Seater',
    type: 'Mercedes V-Class',
    passengers: 7,
    luggage: 6,
    eta: 12,
    price: 35.00,
    image: 'https://cdn-icons-png.flaticon.com/512/2736/2736918.png'
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