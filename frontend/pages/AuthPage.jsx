import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = ({ afterLogin, afterSignUp }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp
      ? `${import.meta.env.VITE_BACKEND_URL}/users/signup`
      : `${import.meta.env.VITE_BACKEND_URL}/users/login`;

    try {
      const resp = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: { 'content-type': 'application/json' },
      });

      const respObj = await resp.json();

      if (respObj.status === 'fail') {
        toast.error(respObj.message);
        return;
      }

      setTimeout(() => {
        toast.success(isSignUp ? 'Account created!' : 'Logged in successfully');
      }, 500);

      isSignUp ? afterSignUp(respObj) : afterLogin(respObj);
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center overflow-hidden px-4 pt-2">
      {/* Glowing background elements */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-cyan-500 opacity-10 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl z-0"></div>

      <div className="relative w-full max-w-5xl h-[600px] bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl flex overflow-hidden z-10">
        {/* Info Panel */}
        <div
          className={`w-1/2 h-full p-10 flex flex-col justify-center text-white transition-all duration-700 ease-in-out bg-gradient-to-br from-[#29cce528] to-[#00d49119]`}
        >
          <button
            type="button"
            onClick={() => navigate('/')}
            className="absolute top-5 left-5 text-gray-300 hover:text-sky-400 transition-colors flex items-center gap-1"
          >
            <FiArrowLeft size={18} />
            <span className="text-sm">Back to Home</span>
          </button>

          {/* App Name */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-wide mb-2">
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 text-transparent bg-clip-text">
                Traveloop
              </span>
            </h1>
            <p className="text-sm text-gray-400 tracking-wider">
              Your seamless travel experience
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-4">
            {isSignUp ? 'Welcome Back!' : 'Join Us Today'}
          </h2>
          <p className="text-md text-gray-200 mb-6">
            {isSignUp
              ? 'Sign in to access your personalized travel dashboard and continue your journey.'
              : 'Create an account to unlock exclusive travel deals and manage your bookings.'}
          </p>
          <button
            onClick={() => setIsSignUp((prev) => !prev)}
            className="bg-gradient-to-r from-sky-400 to-emerald-400 text-white font-semibold px-6 py-2.5 rounded-xl shadow hover:opacity-90 transition duration-300 w-fit"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        {/* Form Section */}
        <div className="relative w-1/2 overflow-hidden">
          <div
            className={`flex w-[200%] h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isSignUp ? '-translate-x-1/2' : 'translate-x-0'
            }`}
          >
            {/* Login Form */}
            <div className="w-1/2 bg-[#0f172a] text-white p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/5 placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  className="text-sm text-right w-full text-gray-400 hover:text-sky-400 transition-colors"
                  onClick={() => navigate('/forgetpassword')}
                >
                  Forgot password?
                </button>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-500 hover:to-emerald-500 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md mt-4"
                >
                  Sign In
                </button>
              </form>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-700" />
                <span className="mx-3 text-gray-500 text-sm">OR</span>
                <hr className="flex-grow border-gray-700" />
              </div>

              <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300 py-3 rounded-xl flex justify-center items-center gap-3 text-white font-medium shadow-sm">
                <FcGoogle size={20} />
                Continue with Google
              </button>
            </div>

            {/* Sign Up Form */}
            <div className="w-1/2 bg-[#0f172a] text-white p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Create Account
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/5 placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/5 placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    onChange={(e) =>
                      handleChange('passwordConfirm', e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-400 to-sky-400 hover:from-emerald-500 hover:to-sky-500 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md mt-2"
                >
                  Sign Up
                </button>
              </form>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-700" />
                <span className="mx-3 text-gray-500 text-sm">OR</span>
                <hr className="flex-grow border-gray-700" />
              </div>

              <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300 py-3 rounded-xl flex justify-center items-center gap-3 text-white font-medium shadow-sm">
                <FcGoogle size={20} />
                Continue with Google
              </button>
            </div>
          </div>
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
    </div>
  );
};

export default AuthPage;
