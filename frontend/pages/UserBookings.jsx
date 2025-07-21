import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiArrowRight,
  FiUser,
} from 'react-icons/fi';

const UserBookings = ({ user, handleLogout }) => {
  const [userBookings, setUserBookings] = useState([]);
  const navigate = useNavigate();

  const getUserBookings = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tour/bookings/user`,
        {
          credentials: 'include',
        }
      );

      const respObj = await resp.json();
      setUserBookings(respObj.bookings);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserBookings();
  }, []);

  if (!user?.isLoggedin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar user={user} handleLogout={handleLogout} />
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 inline-block">
            <h2 className="text-2xl font-bold text-white mb-4">
              Access Your Bookings
            </h2>
            <p className="text-gray-400 mb-6">
              Sign in to view your tour reservations
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:from-sky-600 hover:to-emerald-600 transition-colors flex items-center gap-2 mx-auto"
            >
              Login <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pb-16">
      <Navbar user={user} handleLogout={handleLogout} />
      <ToastContainer />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <div className="w-2 h-10 bg-gradient-to-b from-sky-400 to-emerald-400 rounded-full mr-4"></div>
          <h1 className="text-3xl font-bold text-white">Your Tour Bookings</h1>
        </div>

        {userBookings.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-4">
              <FiCalendar className="text-sky-400 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              No Bookings Found
            </h3>
            <p className="text-gray-400 mb-6">
              You haven't booked any tours yet
            </p>
            <button
              onClick={() => navigate('/tours')}
              className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-sky-600 hover:to-emerald-600 transition-colors inline-flex items-center gap-2"
            >
              Browse Tours <FiArrowRight />
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {userBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-sky-400/30 transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={booking.tour.imageCover}
                      alt={booking.tour.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-white">
                        {booking.tour.name}
                      </h2>
                      <span className="bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full text-sm font-medium">
                        ${booking.price}
                      </span>
                    </div>

                    <p className="text-gray-400 mb-5">{booking.tour.summary}</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <FiClock className="text-sky-400" />
                        <span className="text-white">
                          {booking.tour.duration} days
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-sky-400" />
                        <span className="text-white">
                          {booking.tour.startLocation.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-sky-400" />
                        <span className="text-white">
                          Booked on: {' '}
                          {new Date(booking.createdAt).toLocaleDateString(
                            'en-us',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: '2-digit',
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => navigate(`/tour/${booking.tour._id}`)}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        View Details <FiArrowRight className="text-sm" />
                      </button>

                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <FiUser className="text-sky-400" />
                        <span>Booking ID: {booking._id.slice(-8)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
