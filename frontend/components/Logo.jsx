import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Logo Symbol */}
      <div className="relative">
        {/* Main logo shape */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center shadow-lg">
          {/* Inner design elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-rose-400 rounded-full"></div>
        </div>
      </div>

      {/* Text Logo */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Traveloop
        </span>
        <span className="text-xs text-gray-400 -mt-1">Explore Beyond</span>
      </div>
    </div>
  );
};

export default Logo;
