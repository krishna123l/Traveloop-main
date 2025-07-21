import React from 'react';
import {
  FiCalendar,
  FiUsers,
  FiActivity,
  FiMapPin,
  FiHome,
} from 'react-icons/fi';

const OverView = ({
  details: {
    summary,
    duration,
    groupSize,
    difficulty,
    startLocation,
    startAddress,
  },
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
      {/* Section Title */}
      <h2 className="text-3xl font-bold mb-10 text-white flex items-center">
        <span className="bg-gradient-to-r from-sky-400 to-emerald-400 w-8 h-1.5 mr-4 rounded-full"></span>
        Tour Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary Card - Full width */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 md:col-span-2 transition-all hover:shadow-sky-500/10 hover:border-sky-400/30">
          <div className="flex items-start">
            <div className="bg-gradient-to-br from-sky-500/30 to-emerald-500/30 p-3 rounded-lg mr-5 border border-sky-400/20">
              <FiHome className="text-sky-400 text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Experience Highlights
              </h3>
              <p className="text-gray-300 leading-relaxed">{summary}</p>
            </div>
          </div>
        </div>

        {/* Details Cards */}
        <div className="space-y-6">
          {/* Duration */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 transition-all hover:shadow-sky-500/10 hover:border-sky-400/30">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-sky-500/30 to-emerald-500/30 p-3 rounded-lg mr-4 border border-sky-400/20">
                <FiCalendar className="text-sky-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Duration</h3>
                <p className="text-gray-300">{duration} days</p>
              </div>
            </div>
          </div>

          {/* Group Size */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 transition-all hover:shadow-sky-500/10 hover:border-sky-400/30">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-sky-500/30 to-emerald-500/30 p-3 rounded-lg mr-4 border border-sky-400/20">
                <FiUsers className="text-sky-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Group Size</h3>
                <p className="text-gray-300">Max {groupSize} people</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Difficulty */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 transition-all hover:shadow-sky-500/10 hover:border-sky-400/30">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-sky-500/30 to-emerald-500/30 p-3 rounded-lg mr-4 border border-sky-400/20">
                <FiActivity className="text-sky-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Difficulty</h3>
                <p className="text-gray-300 capitalize">{difficulty}</p>
              </div>
            </div>
          </div>

          {/* Start Location */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 transition-all hover:shadow-sky-500/10 hover:border-sky-400/30">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-sky-500/30 to-emerald-500/30 p-3 rounded-lg mr-4 border border-sky-400/20">
                <FiMapPin className="text-sky-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Start Location
                </h3>
                <span className="text-gray-300">{startLocation},</span>
                <span className="text-gray-400 text-sm mt-1 ml-2">
                  {startAddress}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
