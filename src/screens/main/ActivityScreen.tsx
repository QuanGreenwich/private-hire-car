import React, { useState, useEffect } from 'react';
import { Screen } from '@/types';
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls, MapRoute, RatingModal, ReceiptModal } from '@/components';
import { HISTORY } from '@/constants';
import { Locate, Share2, Star, MessageCircle, MapPin, Send, X, Navigation, Phone, XCircle, AlertTriangle, Car, CheckCircle } from 'lucide-react';
import { calculateRoute, formatDistance, formatDuration, formatPrice, RouteResult } from '@/utils/routing';
import driversData from '@/data/drivers.json';

interface Props {
  onNavigate: (screen: Screen) => void;
  onCancelTrip?: () => void;
  bookingData?: {
    pickup: { name: string; coords: [number, number] };
    destination: { name: string; coords: [number, number] };
    vehicle: string;
    vehicleModel?: string;
    vehicleColor?: string;
    fare: number;
    distance: number;
    duration: number;
  } | null;
}

interface ChatMessage {
  id: string;
  sender: 'driver' | 'customer';
  message: string;
  time: string;
}

interface TripLocation {
  name: string;
  longitude: number;
  latitude: number;
}

const ActivityScreen: React.FC<Props> = ({ onNavigate, bookingData, onCancelTrip }) => {
  const [view, setView] = useState<'ongoing' | 'history'>('ongoing');
  const [showChat, setShowChat] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [tripRating, setTripRating] = useState<number | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [tripHistory, setTripHistory] = useState<any[]>([]);
  
  // Random driver assignment
  const [assignedDriver] = useState(() => {
    const availableDrivers = driversData.filter(d => d.available);
    return availableDrivers[Math.floor(Math.random() * availableDrivers.length)];
  });
  
  // Load trip history from localStorage
  useEffect(() => {
    const loadHistory = () => {
      const history = localStorage.getItem('tripHistory');
      if (history) {
        try {
          setTripHistory(JSON.parse(history));
        } catch (error) {
          console.error('Failed to load trip history:', error);
        }
      }
    };
    loadHistory();
  }, [view]); // Reload when switching to history view
  
  // Reset state when bookingData changes (e.g. new trip or cancellation)
  useEffect(() => {
    if (!bookingData) {
      setShowChat(false);
    }
  }, [bookingData]);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Generate initial messages with real timestamps
    const now = new Date();
    const getTimeOffset = (minutesAgo: number) => {
      const time = new Date(now.getTime() - minutesAgo * 60000);
      return time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };
    
    return [
      { id: '1', sender: 'driver', message: 'Hi! I\'m on my way to pick you up.', time: getTimeOffset(5) },
      { id: '2', sender: 'driver', message: 'I\'ll be there in 5 minutes.', time: getTimeOffset(3) },
      { id: '3', sender: 'customer', message: 'Great! I\'ll wait at the main entrance.', time: getTimeOffset(2) },
    ];
  });

  const handleCompleteTrip = () => {
    // Show rating modal first
    setShowRatingModal(true);
  };

  const handleRatingSubmit = (rating: number, feedback: string) => {
    setTripRating(rating);
    setShowRatingModal(false);
    
    // Save completed trip to history
    if (bookingData) {
      const completedTrip = {
        id: Date.now().toString(),
        type: (bookingData as any).bookingType || 'local',
        pickup: bookingData.pickup.name,
        destination: bookingData.destination.name,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        price: bookingData.fare,
        status: 'completed',
        vehicle: bookingData.vehicle,
        driver: assignedDriver?.name || 'Driver',
        rating: rating,
        distance: bookingData.distance,
        duration: bookingData.duration
      };
      
      // Get existing history
      const existingHistory = localStorage.getItem('tripHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      
      // Add new trip to beginning of array
      history.unshift(completedTrip);
      
      // Save back to localStorage
      localStorage.setItem('tripHistory', JSON.stringify(history));
      
      console.log('✅ Trip saved to history:', completedTrip);
    }
    
    // Show receipt modal after rating
    setShowReceiptModal(true);
  };

  const handleReceiptClose = () => {
    setShowReceiptModal(false);
    // After closing receipt, go back to home
    if (onCancelTrip) {
      onCancelTrip();
    }
    onNavigate(Screen.HOME);
  };

  // Trip details - use bookingData if available, otherwise use defaults
  const [pickup] = useState<TripLocation>(
    bookingData?.pickup 
      ? { name: bookingData.pickup.name, longitude: bookingData.pickup.coords[0], latitude: bookingData.pickup.coords[1] }
      : { name: 'Baker Street Station', longitude: -0.1586, latitude: 51.5226 }
  );

  const [destination] = useState<TripLocation>(
    bookingData?.destination 
      ? { name: bookingData.destination.name, longitude: bookingData.destination.coords[0], latitude: bookingData.destination.coords[1] }
      : { name: 'Heathrow Airport Terminal 5', longitude: -0.4543, latitude: 51.4700 }
  );

  // Driver's current position (simulated as moving along route)
  const [driverPosition] = useState({
    longitude: -0.2500,
    latitude: 51.5100
  });

  // Route data
  const [routeData, setRouteData] = useState<RouteResult | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(true);

  // Calculate route on mount
  useEffect(() => {
    const fetchRoute = async () => {
      setIsLoadingRoute(true);
      try {
        const route = await calculateRoute(
          { longitude: pickup.longitude, latitude: pickup.latitude },
          { longitude: destination.longitude, latitude: destination.latitude },
          'executive' // Vehicle type
        );
        setRouteData(route);
      } catch (error) {
        console.error('Failed to calculate route:', error);
        // Don't show alert in Activity screen, just log error
        setRouteData(null);
      } finally {
        setIsLoadingRoute(false);
      }
    };

    fetchRoute();
  }, [pickup, destination]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'customer',
        message: chatMessage,
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setChatMessage('');
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-bg-light">
      {/* Header */}
      <div className="sticky top-0 z-40 pt-6 pb-2 flex flex-col items-center pointer-events-none">
         <h1 className="text-2xl font-semibold tracking-tight mb-3 text-midnight">Activity</h1>
         <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-1.5 rounded-full flex gap-1 shadow-lg border border-white/20">
            <button 
                onClick={() => setView('ongoing')}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${view === 'ongoing' ? 'bg-midnight text-white shadow-md' : 'text-slate-500 hover:text-midnight'}`}
            >
                Ongoing
            </button>
            <button 
                onClick={() => setView('history')}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${view === 'history' ? 'bg-midnight text-white shadow-md' : 'text-slate-500 hover:text-midnight'}`}
            >
                History
            </button>
         </div>
      </div>

      {/* Empty State - No Active Booking */}
      {!bookingData && view === 'ongoing' && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 mx-auto mb-6 flex items-center justify-center">
              <Car size={40} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-midnight mb-3">No Active Trip</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              You don't have any ongoing trips at the moment. Book a ride to get started!
            </p>
            <button
              onClick={() => onNavigate(Screen.HOME)}
              className="w-full h-14 bg-midnight text-white rounded-xl font-bold shadow-lg shadow-midnight/20 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Car size={20} />
              <span>Book a New Trip</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Trip Content */}
      {bookingData && view === 'ongoing' && (
        <div className="fixed inset-0 z-0 h-screen w-full">
            <Map center={[pickup.longitude, pickup.latitude]} zoom={11}>
              {/* Render route if available */}
              {routeData && routeData.coordinates.length > 0 && (
                <MapRoute 
                  coordinates={routeData.coordinates}
                  color="#4f46e5"
                  width={4}
                  opacity={0.8}
                />
              )}
              
              {/* Pickup Location Marker */}
              <MapMarker longitude={pickup.longitude} latitude={pickup.latitude}>
                <MarkerContent>
                  <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-white shadow-lg"></div>
                </MarkerContent>
                <MarkerPopup>
                  <div className="text-sm">
                    <strong className="text-green-600">Pickup</strong><br />
                    {pickup.name}
                  </div>
                </MarkerPopup>
              </MapMarker>
              
              {/* Destination Marker */}
              <MapMarker longitude={destination.longitude} latitude={destination.latitude}>
                <MarkerContent>
                  <div className="w-8 h-8 rounded-full bg-gold border-4 border-white shadow-lg"></div>
                </MarkerContent>
                <MarkerPopup>
                  <div className="text-sm">
                    <strong className="text-gold">Destination</strong><br />
                    {destination.name}
                  </div>
                </MarkerPopup>
              </MapMarker>
              
              {/* Driver Position Marker */}
              <MapMarker longitude={driverPosition.longitude} latitude={driverPosition.latitude}>
                <MarkerContent>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-midnight border-4 border-white shadow-xl animate-pulse flex items-center justify-center">
                      <Navigation size={16} className="text-gold" />
                    </div>
                  </div>
                </MarkerContent>
                <MarkerPopup>
                  <div className="text-sm">
                    <strong>{assignedDriver.name}</strong><br />
                    {bookingData?.vehicleModel || assignedDriver.vehicleType}<br />
                    <span className="text-green-600 font-semibold">Arriving in 5 mins</span>
                  </div>
                </MarkerPopup>
              </MapMarker>
            </Map>
        </div>
      )}

      {/* Trip Info Card - Only show if booking exists */}
      {bookingData && view === 'ongoing' && (
        <div className="absolute inset-0 top-32 z-10 flex flex-col justify-end pointer-events-none pb-20">
            {/* Bottom Panel */}
            <div className="w-full pointer-events-auto px-4">
                 <div className="bg-white rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] p-6 pb-8 relative">
                    <div className="absolute -top-3 left-8 bg-gold text-midnight text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg tracking-tighter uppercase italic">
                        15% Premium Discount
                    </div>
                    
                    {/* Trip Status Info */}
                    <div className="bg-midnight/95 backdrop-blur-xl border border-gold/30 px-5 py-3 rounded-2xl shadow-xl text-white mb-4 mt-2">
                        <div className="flex items-center gap-4">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold opacity-80 uppercase tracking-tighter text-gray-300">
                                    {isLoadingRoute ? 'Calculating route...' : 'Status: Live'}
                                </span>
                                <span className="text-sm font-bold">Arriving in 5 mins</span>
                            </div>
                            {routeData && (
                                <>
                                    <div className="h-8 w-px bg-gold/30 mx-1"></div>
                                    <div className="flex flex-col text-xs">
                                        <span className="text-gold font-semibold">{formatDistance(routeData.distance)}</span>
                                        <span className="text-gray-300">{formatDuration(routeData.duration)}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Route Details */}
                    <div className="bg-slate-50 rounded-2xl p-4 mb-4">
                        <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center gap-2 pt-1">
                                <div className="w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-100"></div>
                                <div className="w-0.5 h-12 bg-gradient-to-b from-slate-300 to-gold"></div>
                                <div className="w-3 h-3 rounded-full bg-gold ring-4 ring-gold/20"></div>
                            </div>
                            <div className="flex-1 flex flex-col gap-4">
                                <div>
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pickup</span>
                                    <p className="text-sm font-semibold text-slate-900 leading-tight">{pickup.name}</p>
                                    {bookingData?.pickupDate && bookingData?.pickupTime && (
                                      <p className="text-xs text-slate-600 mt-1">
                                        {new Date(bookingData.pickupDate).toLocaleDateString()} at {bookingData.pickupTime}
                                      </p>
                                    )}
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination</span>
                                    <p className="text-sm font-semibold text-slate-900 leading-tight">{destination.name}</p>
                                    {bookingData?.flightNumber && (
                                      <p className="text-xs text-slate-600 mt-1">
                                        Flight {bookingData.flightNumber} • Terminal {bookingData.terminal}
                                        {bookingData.meetGreet && <span className="ml-2 text-green-600 font-semibold">+ Meet & Greet</span>}
                                      </p>
                                    )}
                                </div>
                            </div>
                            {routeData && (
                                <div className="text-right shrink-0">
                                    <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Fare</div>
                                    <div className="text-xl font-bold text-midnight">{formatPrice(bookingData?.fare || routeData.price)}</div>
                                    <div className="text-[10px] text-slate-400 mt-1">
                                        {formatDistance(routeData.distance)}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                        {formatDuration(routeData.duration)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Driver Info */}
                    <div className="flex items-center gap-5">
                        <div className="relative shrink-0">
                            <div className="h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-midnight via-gold to-midnight">
                                <div className="h-full w-full rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                    <img src={assignedDriver.avatar} alt={assignedDriver.name} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-midnight text-gold text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5 border border-white/10">
                                <Star size={10} fill="currentColor" /> {assignedDriver.rating}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Chauffeur</span>
                            <h2 className="text-lg font-bold text-midnight truncate">{assignedDriver.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-semibold text-primary">{bookingData?.vehicleModel || assignedDriver.vehicleType}</span>
                                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">{bookingData?.vehicleColor || assignedDriver.vehicleColor}</span>
                            </div>
                        </div>
                        <div className="shrink-0 flex gap-2">
                            <a 
                                href={`tel:${assignedDriver.phone}`}
                                className="h-12 w-12 flex items-center justify-center rounded-full bg-green-600 text-white shadow-lg active:scale-95 transition-all"
                            >
                                <Phone size={20} />
                            </a>
                            <button 
                                onClick={() => setShowChat(!showChat)}
                                className="h-12 w-12 flex items-center justify-center rounded-full bg-midnight text-gold shadow-lg active:scale-95 transition-all relative"
                            >
                                <MessageCircle size={20} />
                                {messages.filter(m => m.sender === 'driver').length > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                                        {messages.filter(m => m.sender === 'driver').length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={handleCompleteTrip}
                            className="flex-1 h-12 bg-green-600 text-white rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 font-semibold hover:bg-green-700"
                        >
                            <CheckCircle size={18} />
                            Complete Trip
                        </button>
                        <button
                            onClick={() => {
                                if (onCancelTrip) {
                                    onCancelTrip();
                                }
                            }}
                            className="flex-1 h-12 bg-red-50 text-red-600 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 font-semibold border border-red-200 hover:bg-red-100"
                        >
                            <XCircle size={18} />
                            Cancel Trip
                        </button>
                    </div>
                 </div>
            </div>

            {/* Chat Panel */}
            {showChat && (
                <div 
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" 
                    onMouseDown={() => setShowChat(false)}
                >
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-2xl max-h-[80vh] flex flex-col" 
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {/* Chat Header */}
                        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full border-2 border-midnight bg-slate-200 flex items-center justify-center">
                                    <span className="text-slate-600 text-sm font-bold">NQ</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-midnight">Nguyễn Quân</h3>
                                    <p className="text-xs text-slate-500">Your Chauffeur</p>
                                </div>
                            </div>
                            <button 
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowChat(false);
                                }}
                                className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-midnight hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] ${msg.sender === 'customer' ? 'bg-midnight text-white' : 'bg-slate-100 text-midnight'} rounded-2xl px-4 py-3`}>
                                        <p className="text-base">{msg.message}</p>
                                        <span className={`text-[10px] mt-1 block ${msg.sender === 'customer' ? 'text-gold' : 'text-slate-400'}`}>
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-slate-100 bg-white rounded-b-[2.5rem]">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-slate-100 rounded-full px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-midnight"
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSendMessage();
                                    }}
                                    disabled={!chatMessage.trim()}
                                    className="h-12 w-12 rounded-full bg-midnight text-gold flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      )}

      {/* History View */}
      {view === 'history' && (
        <div className="relative z-10 px-4 pt-4 pb-24 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-160px)]">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-bold text-midnight">Recent History</h3>
                <button className="text-xs font-black uppercase tracking-widest text-gold hover:text-yellow-600">View All</button>
             </div>
             
             {tripHistory.length === 0 ? (
               <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
                 <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
                   <Car size={32} className="text-slate-400" />
                 </div>
                 <h3 className="text-lg font-bold text-midnight mb-2">No Trip History</h3>
                 <p className="text-sm text-slate-500">Complete your first trip to see your history here</p>
               </div>
             ) : (
               tripHistory.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">{item.type}</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{item.date}, {item.time}</span>
                            </div>
                            {item.rating && (
                              <div className="flex items-center gap-1 mt-1">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                  <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            )}
                        </div>
                        <div className="text-right">
                            <span className="block text-lg font-bold text-midnight">£{item.price.toFixed(2)}</span>
                            <span className="inline-flex items-center text-[10px] font-bold text-green-600 gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> {item.status}
                            </span>
                        </div>
                    </div>
                    <div className="relative pl-5 border-l-2 border-slate-100 ml-1 space-y-4">
                        <div className="relative">
                            <div className="absolute -left-[27px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-primary shadow-sm"></div>
                            <p className="text-base font-bold text-midnight truncate">{item.pickup}</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[27px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-gold"></div>
                            <p className="text-base font-bold text-midnight truncate">{item.destination}</p>
                        </div>
                    </div>
                    {item.driver && (
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                        <span className="text-xs text-slate-500">Driver:</span>
                        <span className="text-xs font-semibold text-midnight">{item.driver}</span>
                      </div>
                    )}
                </div>
               ))
             )}
        </div>
      )}
      
      {/* Rating Modal */}
      {showRatingModal && bookingData && (
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
          driverName={assignedDriver?.name || 'Your Driver'}
        />
      )}
      
      {/* Receipt Modal */}
      {showReceiptModal && bookingData && (
        <ReceiptModal
          isOpen={showReceiptModal}
          onClose={handleReceiptClose}
          bookingData={bookingData}
          driverName={assignedDriver?.name || 'Your Driver'}
          paymentMethod={paymentMethod}
          rating={tripRating}
        />
      )}
    </div>
  );
};

export default ActivityScreen;