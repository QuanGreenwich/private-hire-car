import React, { useState } from 'react';
import { Screen } from '@/types';
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls, MapRoute } from '@/components/MapComponents';
import { HISTORY } from '@/constants';
import { Locate, Share2, Star, MessageCircle, MapPin, Send, X } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

interface ChatMessage {
  id: string;
  sender: 'driver' | 'customer';
  message: string;
  time: string;
}

const ActivityScreen: React.FC<Props> = ({ onNavigate }) => {
  const [view, setView] = useState<'ongoing' | 'history'>('ongoing');
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'driver', message: 'Hi! I\'m on my way to pick you up.', time: '14:25' },
    { id: '2', sender: 'driver', message: 'I\'ll be there in 5 minutes.', time: '14:26' },
    { id: '3', sender: 'customer', message: 'Great! I\'ll wait at the main entrance.', time: '14:27' },
  ]);

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
      {view === 'ongoing' && (
        <div className="fixed inset-0 z-0 h-screen w-full">
            <Map center={[-0.1586, 51.5226]} zoom={11}>
              <MapRoute 
                coordinates={[
                  [-0.1586, 51.5226], // Baker Street [lng, lat]
                  [-0.4543, 51.4700]  // Heathrow Airport [lng, lat]
                ]}
                color="#4f46e5"
                width={4}
                opacity={0.8}
              />
              <MapMarker longitude={-0.1586} latitude={51.5226}>
                <MarkerContent>
                  <div className="w-8 h-8 rounded-full bg-midnight border-4 border-white shadow-lg"></div>
                </MarkerContent>
                <MarkerPopup>
                  <div className="text-sm">
                    <strong>Pickup</strong><br />
                    Baker Street, London
                  </div>
                </MarkerPopup>
              </MapMarker>
              <MapMarker longitude={-0.4543} latitude={51.4700}>
                <MarkerContent>
                  <div className="w-8 h-8 rounded-full bg-gold border-4 border-white shadow-lg"></div>
                </MarkerContent>
                <MarkerPopup>
                  <div className="text-sm">
                    <strong>Destination</strong><br />
                    Heathrow Airport
                  </div>
                </MarkerPopup>
              </MapMarker>
              <MapMarker longitude={-0.2500} latitude={51.5100}>
                <MarkerContent>
                  <div className="w-10 h-10 rounded-full bg-indigo-600 border-4 border-white shadow-xl animate-pulse"></div>
                </MarkerContent>
                <MarkerPopup>
                  <div className="text-sm">
                    <strong>James Sterling</strong><br />
                    Mercedes E-Class<br />
                    <span className="text-green-600 font-semibold">Arriving in 5 mins</span>
                  </div>
                </MarkerPopup>
              </MapMarker>
            </Map>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 pt-6 pb-2 flex flex-col items-center pointer-events-none">
         <h1 className="text-base font-semibold tracking-tight mb-3 text-midnight">Activity</h1>
         <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-1.5 rounded-full flex gap-1 shadow-lg border border-white/20">
            <button 
                onClick={() => setView('ongoing')}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${view === 'ongoing' ? 'bg-midnight text-white shadow-md' : 'text-slate-500 hover:text-midnight'}`}
            >
                Ongoing
            </button>
            <button 
                onClick={() => setView('history')}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${view === 'history' ? 'bg-midnight text-white shadow-md' : 'text-slate-500 hover:text-midnight'}`}
            >
                History
            </button>
         </div>
      </div>

      {view === 'ongoing' ? (
        <div className="absolute inset-0 top-32 z-10 flex flex-col justify-between pointer-events-none pb-20">
            {/* Status Card */}
            <div className="flex justify-center pointer-events-auto px-4 mt-2">
                 <div className="bg-midnight/95 backdrop-blur-xl border border-gold/30 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 text-white">
                     <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold opacity-80 uppercase tracking-tighter text-gray-300">Status: Live</span>
                        <span className="text-sm font-bold">Arriving in 5 mins</span>
                     </div>
                     <div className="h-8 w-px bg-gold/30 mx-1"></div>
                     <MapPin size={20} className="text-gold" />
                 </div>
            </div>

            {/* Bottom Panel */}
            <div className="w-full pointer-events-auto px-4">
                 <div className="bg-white rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] p-6 pb-8 relative">
                    <div className="absolute -top-3 left-8 bg-gold text-midnight text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg tracking-tighter uppercase italic">
                        15% Premium Discount
                    </div>
                    <div className="flex items-center gap-5 mt-2">
                        <div className="relative shrink-0">
                            <div className="h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-midnight via-gold to-midnight">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974" alt="Driver" className="h-full w-full object-cover rounded-full border-2 border-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-midnight text-gold text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5 border border-white/10">
                                <Star size={10} fill="currentColor" /> 4.9
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Chauffeur</span>
                            <h2 className="text-xl font-bold text-midnight truncate font-display">James Sterling</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-semibold text-primary">Mercedes E-Class</span>
                                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Deep Blue</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowChat(!showChat)}
                            className="shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-midnight text-gold shadow-lg active:scale-95 transition-all relative"
                        >
                            <MessageCircle size={24} />
                            {messages.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                                    {messages.length}
                                </span>
                            )}
                        </button>
                    </div>
                 </div>
            </div>

            {/* Chat Panel */}
            {showChat && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowChat(false)}>
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-2xl max-h-[80vh] flex flex-col animate-slide-up" onClick={(e) => e.stopPropagation()}>
                        {/* Chat Header */}
                        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <img 
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974" 
                                    alt="Driver" 
                                    className="h-12 w-12 rounded-full object-cover border-2 border-midnight"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-midnight">James Sterling</h3>
                                    <p className="text-xs text-slate-500">Your Chauffeur</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowChat(false)}
                                className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-midnight hover:bg-slate-200 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] ${msg.sender === 'customer' ? 'bg-midnight text-white' : 'bg-slate-100 text-midnight'} rounded-2xl px-4 py-3`}>
                                        <p className="text-sm">{msg.message}</p>
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
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-midnight"
                                />
                                <button
                                    onClick={handleSendMessage}
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
      ) : (
        <div className="relative z-10 px-4 pt-4 flex flex-col gap-4">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-bold text-midnight">Recent History</h3>
                <button className="text-xs font-black uppercase tracking-widest text-gold hover:text-yellow-600">View All</button>
             </div>
             {HISTORY.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">{item.type}</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{item.date}, {item.time}</span>
                            </div>
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
                            <p className="text-sm font-bold text-midnight truncate">{item.pickup}</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[27px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-gold"></div>
                            <p className="text-sm font-bold text-midnight truncate">{item.destination}</p>
                        </div>
                    </div>
                </div>
             ))}
        </div>
      )}
    </div>
  );
};

export default ActivityScreen;