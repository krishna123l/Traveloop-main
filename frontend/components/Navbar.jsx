import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FiChevronDown, FiLogOut, FiCheckCircle, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const mobileMenuRef = useRef();

  const handleVerifyEmail = () => {
    navigate('/verify-email');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleProfile = () => {
    navigate('/user/profile');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest('.mobile-menu-button')
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Bookings', path: '/tour/user-bookings' },
  ];

  return (
    <nav className="w-full px-4 sm:px-8 py-4 backdrop-blur-md bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] bg-opacity-70 border-b border-white/10 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <Logo className="h-10 w-10" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className="cursor-pointer hover:text-cyan-400 transition duration-200 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

          {/* Profile or Login */}
          <li className="relative" ref={dropdownRef}>
            {user?.isLoggedin ? (
              <div
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-1 py-1 hover:bg-white/20 rounded-full cursor-pointer transition"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center overflow-hidden border-2 border-white/20">
                  {user?.photo ? (
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                <FiChevronDown
                  size={18}
                  className={`transition-transform ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow hover:shadow-lg transition-all"
              >
                Login
              </button>
            )}

            {/* Dropdown */}
            <AnimatePresence>
              {dropdownOpen && user?.isLoggedin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-[#1e293b] text-white rounded-xl shadow-lg border border-white/10 z-50 overflow-hidden"
                >
                  {!user?.emailVerified && (
                    <button
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 w-full text-left transition-colors"
                      onClick={handleVerifyEmail}
                    >
                      <FiCheckCircle className="text-cyan-400" />
                      <span>Verify Email</span>
                    </button>
                  )}
                  <button
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 w-full text-left transition-colors"
                    onClick={handleProfile}
                  >
                    <FiUser className="text-blue-400" />
                    <span>Profile</span>
                  </button>
                  <button
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 w-full text-left text-red-400 transition-colors"
                    onClick={handleLogout}
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden mobile-menu-button p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#1e293b] rounded-xl mt-2 overflow-hidden border border-white/10"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-left hover:bg-white/10 transition-colors"
                >
                  {item.name}
                </button>
              ))}

              {user?.isLoggedin ? (
                <>
                  {!user?.emailVerified && (
                    <button
                      onClick={handleVerifyEmail}
                      className="flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors"
                    >
                      <FiCheckCircle className="text-cyan-400" />
                      <span>Verify Email</span>
                    </button>
                  )}
                  <button
                    onClick={handleProfile}
                    className="flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors"
                  >
                    <FiUser className="text-blue-400" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 text-red-400 transition-colors"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate('/auth');
                    setMobileMenuOpen(false);
                  }}
                  className="mx-4 my-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow text-center"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
