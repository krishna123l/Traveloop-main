import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { FiCheckCircle, FiArrowRight, FiLoader } from 'react-icons/fi';
import Navbar from '../Navbar';
import 'react-toastify/dist/ReactToastify.css';

const VerifyPayment = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setIsVerifying(true);
        const resp = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/tour/bookings/verify-session/${sessionId}`,
          { credentials: 'include' }
        );

        if (!resp.ok) {
          throw new Error('Payment verification failed');
        }

        const data = await resp.json();
        toast.success('Payment verified successfully!');
      } catch (error) {
        toast.error(error.message);
        navigate('/');
      } finally {
        setIsVerifying(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      navigate('/');
    }
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {isVerifying ? (
          <div className="text-center">
            <FiLoader className="animate-spin text-4xl text-sky-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-gray-400">
              Please wait while we confirm your booking
            </p>
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 max-w-md w-full text-center transform transition-all duration-300 hover:scale-[1.02]">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-md"></div>
              <FiCheckCircle className="relative text-5xl text-emerald-400" />
            </div>

            <h1 className="text-3xl font-bold mb-3">Payment Successful</h1>
            <p className="text-gray-300 mb-6">
              Your booking has been confirmed
            </p>

            <div className="animate-pulse bg-emerald-400/10 border border-emerald-400/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-emerald-300">
                Confirmation details will be sent to your email
              </p>
            </div>

            <button
              onClick={() => navigate('/tour/user-bookings')}
              className="w-full bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-500 hover:to-emerald-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-sky-400/20"
            >
              View My Bookings <FiArrowRight />
            </button>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default VerifyPayment;
