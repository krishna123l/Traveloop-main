import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMail } from 'react-icons/fi';

const ForgetPassword = () => {
  const [userMail, setUserMail] = useState({ email: '' });

  const handleChange = (e) => {
    setUserMail((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/forgetPassword`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(userMail),
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      const respObj = await resp.json();
      if (respObj.status === 'fail') {
        toast.error(respObj.message);
        return;
      }

      toast.success('Reset link sent! Check your email');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden px-4">
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-purple-500 opacity-20 rounded-full filter blur-3xl animate-pulse z-0"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-5xl h-[550px] bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-[#1e293b] to-[#354050] text-white p-10 flex flex-col justify-center items-start space-y-6">
          <FiMail size={50} className="text-cyan-400 animate-pulse" />
          <h2 className="text-4xl font-bold">Forgot Your Password?</h2>
          <p className="text-gray-300">
            No worries. We'll help you reset it quickly and get you back to
            exploring amazing destinations.
          </p>
          <p className="text-sm text-gray-400">Secure. Fast. Hassle-Free.</p>
        </div>

        {/* Right Panel - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center text-white animate-fadeIn">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Reset Password
          </h2>
          <p className="text-sm text-center text-gray-300 mb-6">
            Enter your email and we'll send you a reset link.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md"
            >
              Send Reset Link
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-10">
            Need help?{' '}
            <span className="text-cyan-400 underline cursor-pointer">
              Contact Support
            </span>
          </p>  
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
