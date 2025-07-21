import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiArrowRight,
  FiCheck,
  FiLock,
} from 'react-icons/fi';

const BookingButton = ({
  tourId,
  details: { price, duration, startDates },
  user,
}) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const today = new Date();
    const upcomingDates = startDates
      .map((date) => new Date(date))
      .filter((date) => date > today)
      .sort((a, b) => a - b);
    setStartDate(upcomingDates[0] || null);
  }, [startDates]);

  const handleBooking = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/tour/bookings/checkout-session/${tourId}`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      const data = await res.json();

      if (data.session?.url) {
        window.location.href = data.session.url;
      } else {
        toast.error('Failed to initiate payment');
      }
    } catch (err) {
      toast.error('Payment failed to initialize');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user?.isLoggedin) {
    return (
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-4xl px-4 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-gray-800/60 to-gray-900/70 backdrop-blur-md py-6 rounded-xl border border-gray-700 shadow-lg gap-4 flex-wrap">
          <div className="flex items-center gap-5">
            <div className="h-12 flex items-center justify-center bg-sky-500/10 border border-sky-400/20 rounded-full px-3">
              <FiLock className="text-sky-400 text-xl" />
            </div>
            <div className="text-white">
              <p className="font-semibold text-lg">Sign in to Book</p>
              <p className="text-gray-400 text-sm">
                Access secure booking options
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2"
          >
            Login <FiArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-3xl px-4 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-gray-800/60 to-gray-900/70 backdrop-blur-md py-6 rounded-xl border border-gray-700 shadow-lg gap-4 flex-wrap">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 flex-1">
          <div className="flex flex-col text-white">
            <span className="text-sm text-gray-400">Price</span>
            <span className="text-xl font-bold text-sky-400">₹{price}</span>
          </div>
          <div className="flex flex-col text-white">
            <span className="text-sm text-gray-400">Duration</span>
            <div className="flex items-center gap-2">
              <FiClock className="text-sky-400" /> {duration} days
            </div>
          </div>

          <div className="flex flex-col text-white">
            <span className="text-sm text-gray-400">Next Date</span>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-sky-400" />
              {startDate
                ? new Date(startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: '2-digit',
                  })
                : 'N/A'}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleBooking}
            disabled={!startDate || isLoading}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all 
              ${
                !startDate
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white'
              }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Reserve Now <FiArrowRight />
              </>
            )}
          </button>

          {startDate && (
            <span className="text-xs text-gray-400 text-center">
              Free cancellation up to 48 hours before tour
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingButton;
