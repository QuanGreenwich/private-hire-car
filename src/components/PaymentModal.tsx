import React, { useState } from 'react';
import { CreditCard, Lock, CheckCircle, X, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentMethod: 'card' | 'cash') => void;
  bookingData: {
    fare: number;
    vehicle: string;
    pickup: { name: string };
    destination: { name: string };
    distance?: number;
    duration?: number;
  };
}

const PaymentModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, bookingData }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const validateCard = () => {
    if (paymentMethod === 'cash') return true;
    
    const newErrors: Record<string, string> = {};
    
    // Card number validation (simplified)
    const cleanNumber = cardData.number.replace(/\s/g, '');
    if (!cleanNumber) {
      newErrors.number = 'Card number is required';
    } else if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      newErrors.number = 'Invalid card number';
    }
    
    // Name validation
    if (!cardData.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    }
    
    // Expiry validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!cardData.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!expiryRegex.test(cardData.expiry)) {
      newErrors.expiry = 'Format: MM/YY';
    }
    
    // CVV validation
    if (!cardData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    if (!validateCard()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Send email notification simulation
    const userEmail = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
    console.log(`💳 Payment confirmation email sent to ${userEmail}`);
    console.log(`Payment Method: ${paymentMethod === 'card' ? 'Card ending ' + cardData.number.slice(-4) : 'Cash'}`);
    console.log(`Amount: £${bookingData.fare.toFixed(2)}`);
    console.log(`Route: ${bookingData.pickup.name} → ${bookingData.destination.name}`);
    
    setIsProcessing(false);
    onConfirm(paymentMethod);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Payment Confirmation</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Vehicle</span>
              <span className="font-semibold">{bookingData.vehicle}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">From</span>
              <span className="font-medium text-right flex-1 ml-4">{bookingData.pickup.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">To</span>
              <span className="font-medium text-right flex-1 ml-4">{bookingData.destination.name}</span>
            </div>
            {bookingData.distance && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Distance</span>
                <span className="font-medium">{bookingData.distance.toFixed(1)} km</span>
              </div>
            )}
            {bookingData.duration && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{Math.round(bookingData.duration)} min</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Base Fare</span>
                <span className="font-medium">£{(bookingData.fare * 0.8).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium">£{(bookingData.fare * 0.15).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-medium">£{(bookingData.fare * 0.05).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-1.5 mt-1.5">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total Fare</span>
                  <span className="font-bold text-primary text-lg">£{bookingData.fare.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700">Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 border-2 rounded-lg flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard size={24} className={paymentMethod === 'card' ? 'text-primary' : 'text-gray-400'} />
                <span className={`text-sm font-medium ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-600'}`}>
                  Card
                </span>
              </button>
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 border-2 rounded-lg flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`text-2xl ${paymentMethod === 'cash' ? 'text-primary' : 'text-gray-400'}`}>💷</div>
                <span className={`text-sm font-medium ${paymentMethod === 'cash' ? 'text-primary' : 'text-gray-600'}`}>
                  Cash
                </span>
              </button>
            </div>
          </div>

          {/* Card Details Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-2.5">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Card Number</label>
                <input
                  type="text"
                  value={cardData.number}
                  onChange={(e) => {
                    setCardData({ ...cardData, number: formatCardNumber(e.target.value) });
                    if (errors.number) setErrors({ ...errors, number: '' });
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${
                    errors.number ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                />
                {errors.number && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                    <AlertCircle size={12} />
                    <span>{errors.number}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Cardholder Name</label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => {
                    setCardData({ ...cardData, name: e.target.value.toUpperCase() });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="JOHN SMITH"
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/20 focus:border-primary uppercase`}
                />
                {errors.name && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                    <AlertCircle size={12} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Expiry</label>
                  <input
                    type="text"
                    value={cardData.expiry}
                    onChange={(e) => {
                      setCardData({ ...cardData, expiry: formatExpiry(e.target.value) });
                      if (errors.expiry) setErrors({ ...errors, expiry: '' });
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full px-3 py-2 border rounded-lg text-sm ${
                      errors.expiry ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                  />
                  {errors.expiry && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                      <AlertCircle size={12} />
                      <span>{errors.expiry}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">CVV</label>
                  <input
                    type="password"
                    value={cardData.cvv}
                    onChange={(e) => {
                      setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').substring(0, 4) });
                      if (errors.cvv) setErrors({ ...errors, cvv: '' });
                    }}
                    placeholder="123"
                    maxLength={4}
                    className={`w-full px-3 py-2 border rounded-lg text-sm ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                  />
                  {errors.cvv && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                      <AlertCircle size={12} />
                      <span>{errors.cvv}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                <Lock size={14} className="text-gray-500" />
                <span className="text-xs text-gray-600">
                  Your payment information is encrypted and secure
                </span>
              </div>
            </div>
          )}

          {/* Cash Payment Info */}
          {paymentMethod === 'cash' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-900">
                <strong>Cash Payment:</strong> Please have exact change ready. The driver will collect £{bookingData.fare.toFixed(2)} upon arrival.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="flex-1 px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  <span>Confirm Booking</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;