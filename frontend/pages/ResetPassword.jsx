import { useState } from 'react';
import { useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiLock } from 'react-icons/fi';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState({});

  const handleChange = (key, value) => {
    setPassword((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/resetPassword/${token}`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify(password),
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

      toast.success('Password Reset Successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden px-4">
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-purple-500 opacity-20 rounded-full filter blur-3xl animate-pulse z-0"></div>

      <div className="relative z-10 w-full max-w-5xl h-[550px] bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-[#1e293b] to-[#354050] text-white p-10 flex flex-col justify-center items-start space-y-6">
          <FiLock size={50} className="text-cyan-400 animate-pulse" />
          <h2 className="text-4xl font-bold">Reset Your Password</h2>
          <p className="text-gray-300">
            Keep your account secure. Enter your new password and confirm it to
            continue your travel journey.
          </p>
          <p className="text-sm text-gray-400">Simple. Secure. Fast.</p>
        </div>

        {/* Right Panel - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center text-white animate-fadeIn">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Create New Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => handleChange('password', e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              onChange={(e) => handleChange('passwordConfirm', e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md"
            >
              Reset Password
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

export default ResetPassword;
