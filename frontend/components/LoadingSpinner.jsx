import React from 'react';

const LoadingSpinner = () => {
  // Animation styles
  const spinAnimation = {
    animation: 'spin 1s linear infinite',
  };

  const spinReverseAnimation = {
    animation: 'spin 1s linear infinite reverse',
  };

  const pulseAnimation = {
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  const pulseDelayedAnimation = {
    animation: 'pulse 1.5s ease-in-out infinite 0.5s',
  };

  // Define keyframes directly in a style tag
  const keyframes = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;

  return (
    <>
      {/* Inject keyframes */}
      <style>{keyframes}</style>

      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
        <div className="relative w-24 h-24">
          {/* Outer gradient ring - spins clockwise */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-400 border-r-emerald-400"
            style={spinAnimation}
          ></div>

          {/* Inner gradient ring - spins counter-clockwise */}
          <div
            className="absolute inset-4 rounded-full border-4 border-transparent border-b-sky-400 border-l-emerald-400"
            style={spinReverseAnimation}
          ></div>

          {/* Center circle with glass effect */}
          <div className="absolute inset-6 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10">
            <span className="text-xs font-medium bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Loading...
            </span>
          </div>

          {/* Floating dots */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-400"
            style={pulseAnimation}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400"
            style={pulseDelayedAnimation}
          ></div>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
