import React, { useState } from 'react';
import { Star, X, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback: string) => void;
  driverName: string;
}

const RatingModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, driverName }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    // Send email notification simulation
    const userEmail = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
    console.log(`⭐ Rating confirmation email sent to ${userEmail}`);
    console.log(`Driver: ${driverName}`);
    console.log(`Rating: ${rating}/5 stars`);
    console.log(`Feedback: ${feedback || 'No additional feedback'}`);
    
    onSubmit(rating, feedback);
    // Reset form
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Rate Your Trip</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Driver Info */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">How was your experience with</p>
            <p className="text-lg font-bold text-gray-900">{driverName}?</p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  size={40}
                  className={`${
                    star <= (hoverRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {/* Rating Text */}
          {rating > 0 && (
            <p className="text-center text-gray-600 font-medium">
              {rating === 5 && '⭐ Excellent!'}
              {rating === 4 && '😊 Great!'}
              {rating === 3 && '👍 Good'}
              {rating === 2 && '😐 Could be better'}
              {rating === 1 && '😞 Poor'}
            </p>
          )}

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Feedback (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us more about your experience..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
          >
            <Send size={18} />
            <span>Submit Rating</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;