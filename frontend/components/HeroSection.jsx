import React from 'react';
import { motion } from 'framer-motion';
import {
  FiSearch,
  FiArrowRight,
  FiGlobe,
  FiCompass,
  FiStar,
} from 'react-icons/fi';
import { useNavigate } from 'react-router';

const HeroSection = () => {
  const navigate = useNavigate();
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Gallery images
  const galleryImages = [
    {
      url: 'https://w0.peakpx.com/wallpaper/595/408/HD-wallpaper-taj-mahal-agra-taj-mahal-india-landscape-travel-world.jpg',
      location: 'Taj Mahal, India',
    },
    {
      url: 'https://w0.peakpx.com/wallpaper/906/616/HD-wallpaper-india-gate-brithish-building-delhi-gate-of-india-history-thumbnail.jpg',
      location: 'India gate, india',
    },
    {
      url: 'https://i.pinimg.com/474x/10/da/48/10da481b7751840ee8a047305f0080b8.jpg',
      location: 'Manali, india',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Full-width Background Image */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.6, 0.05, -0.01, 0.9] }}
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80')",
        }}
      />

      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-gray-900/80" />

      {/* Hero Content Container */}
      <div className="relative h-screen w-full flex items-center z-10 -mt-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 px-6 md:px-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.div
              variants={item}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-px bg-gradient-to-r from-sky-400 to-emerald-400" />
              <span className="text-sm uppercase tracking-widest text-sky-300">
                Explore The World
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Discover{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                Unforgettable
              </span>{' '}
              Adventures
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl"
            >
              Curated experiences with local experts that go beyond the typical
              tourist trails.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col md:flex-row gap-4"
            >
              {/* <motion.div
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
                className="relative flex-grow max-w-xl bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
              >
                <input
                  type="text"
                  placeholder="Where to next?"
                  className="w-full py-5 px-6 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-sky-500 to-emerald-500 p-3 rounded-lg shadow-lg">
                  <FiSearch className="h-5 w-5 text-white" />
                </button>
              </motion.div> */}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-medium py-5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/tours')}
              >
                Explore Tours <FiArrowRight className="h-5 w-5" />
              </motion.button>
            </motion.div>

            <motion.div
              variants={container}
              className="flex flex-wrap gap-6 mt-12"
            >
              {[
                {
                  icon: <FiGlobe className="h-6 w-6" />,
                  text: '50+ Countries',
                },
                { icon: <FiCompass className="h-6 w-6" />, text: '300+ Tours' },
                { icon: <FiStar className="h-6 w-6" />, text: '5-Star Rated' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/10"
                >
                  <div className="text-sky-400">{feature.icon}</div>
                  <span className="text-white font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Image Gallery (Desktop Only) */}
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center p-12">
          <div className="relative w-full h-3/4">
            {/* Main centered image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-96 rounded-2xl overflow-hidden shadow-2xl z-20 border-2 border-white/20"
            >
              <img
                src={galleryImages[0].url}
                alt={galleryImages[0].location}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-medium">
                  {galleryImages[0].location}
                </p>
              </div>
            </motion.div>

            {/* Left offset image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-56 h-80 rounded-xl overflow-hidden shadow-lg z-10 border-2 border-white/10"
            >
              <img
                src={galleryImages[1].url}
                alt={galleryImages[1].location}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-sm">
                  {galleryImages[1].location}
                </p>
              </div>
            </motion.div>

            {/* Right offset image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-56 h-80 rounded-xl overflow-hidden shadow-lg z-10 border-2 border-white/10"
            >
              <img
                src={galleryImages[2].url}
                alt={galleryImages[2].location}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-sm">
                  {galleryImages[2].location}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-1/4 left-10 z-0"
      >
        <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="fixed bottom-1/3 right-16 z-0"
      >
        <div className="w-6 h-6 rounded-full bg-sky-400 shadow-lg shadow-sky-400/30" />
      </motion.div>
    </div>
  );
};

export default HeroSection;
