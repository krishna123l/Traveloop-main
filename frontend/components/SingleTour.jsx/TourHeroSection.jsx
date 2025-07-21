import React from 'react';
import {
  FiStar,
  FiDollarSign,
  FiMapPin,
  FiClock,
  FiArrowLeft,
} from 'react-icons/fi';

const TourHeroSection = ({ background, tittle, price, rating, summary }) => {
  return (
    <div className="relative w-full h-150 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={background}
            alt={tittle}
            className="w-full h-full object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
        </div>

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 60%, rgba(56, 182, 255, 0.4) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.4) 0%, transparent 40%)',
            mixBlendMode: 'overlay',
          }}
        ></div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-sky-500/10 blur-[80px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-[90px]"></div>
        </div>
      </div>

      <button
        className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 group shadow-lg hover:shadow-xl"
        onClick={() => window.history.back()}
      >
        <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Tours</span>
      </button>

      {/* Hero Content */}
      <div className="relative z-10 px-6 max-w-6xl mx-auto text-white text-center">
        <div className="mb-8">
          {/* Optional badge - matches original theme */}
          <div className="inline-flex items-center px-4 py-1.5 mb-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow-md">
            Adventure Awaits
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent mb-6 leading-tight">
            {tittle}
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            {summary}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-lg hover:bg-white/10 transition-all hover:scale-105">
            <FiStar className="text-yellow-400 text-lg" />
            <span className="font-medium">{rating} Rating</span>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <span>₹ {price} / person</span>
          </div>
        </div>

        {/* Decorative line */}
        <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-emerald-400 mx-auto rounded-full mb-8"></div>
      </div>

      {/* Animated floating elements */}
      <div
        className="absolute top-[15%] left-[10%] w-3 h-3 bg-sky-400 rounded-full animate-float"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute bottom-[20%] right-[15%] w-4 h-4 bg-emerald-400 rounded-full animate-float"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-[30%] right-[25%] w-2 h-2 bg-white rounded-full animate-float"
        style={{ animationDelay: '2s' }}
      />
    </div>
  );
};

export default TourHeroSection;
