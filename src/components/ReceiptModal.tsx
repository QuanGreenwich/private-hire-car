import React from 'react';
import { X, Download, Share2, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    pickup: { name: string };
    destination: { name: string };
    vehicle: string;
    vehicleModel?: string;
    fare: number;
    distance: number;
    duration: number;
    flightNumber?: string;
  };
  driverName: string;
  paymentMethod: 'card' | 'cash';
  rating?: number;
}

const ReceiptModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  bookingData, 
  driverName,
  paymentMethod,
  rating 
}) => {
  if (!isOpen) return null;

  const receiptNumber = `PH-${Date.now().toString().slice(-8)}`;
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create HTML content for receipt
    const receiptHTML = document.getElementById('receipt-content')?.innerHTML || '';
    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${receiptNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .details { margin: 15px 0; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>${receiptHTML}</body>
      </html>
    `], { type: 'text/html' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PrivateHire_Receipt_${receiptNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);

    // Send email simulation
    const userEmail = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
    console.log(`📧 Receipt email sent to ${userEmail}`);
    console.log(`Receipt #${receiptNumber} attached as PDF`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Trip Receipt</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-3" id="receipt-content">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-lg font-bold text-primary italic mb-1">PrivateHire</h1>
            <div className="flex items-center justify-center gap-1.5 text-green-600 mb-1">
              <CheckCircle size={18} />
              <span className="font-semibold text-sm">Payment Successful</span>
            </div>
            <p className="text-gray-600 text-sm">Receipt #{receiptNumber}</p>
            <p className="text-gray-500 text-xs mt-0.5">{currentDate} at {currentTime}</p>
          </div>

          {/* Trip Summary */}
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
            {bookingData.flightNumber && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Flight</span>
                <span className="font-medium">{bookingData.flightNumber}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Driver</span>
              <span className="font-medium">{driverName}</span>
            </div>
            {bookingData.vehicleModel && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Model</span>
                <span className="font-medium">{bookingData.vehicleModel}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Distance</span>
              <span className="font-medium">{bookingData.distance.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">{Math.round(bookingData.duration)} min</span>
            </div>
            {rating && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Your Rating</span>
                <span className="font-medium">{'⭐'.repeat(rating)}</span>
              </div>
            )}
            
            {/* Price Breakdown */}
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
                  <span className="font-bold text-gray-900">Total Paid</span>
                  <span className="font-bold text-primary text-lg">£{bookingData.fare.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex justify-between text-sm pb-3 border-b border-gray-200">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-medium capitalize">{paymentMethod}</span>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>Thank you for choosing PrivateHire!</p>
            <p>Questions? Contact us at support@privatehire.com</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 px-4 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Download size={18} />
              <span>Download</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Share2 size={18} />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;