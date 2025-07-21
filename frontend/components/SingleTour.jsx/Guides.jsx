import React from 'react';
import { FiUser, FiMail, FiAward } from 'react-icons/fi';

const Guides = ({ guides = [] }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex items-center mb-12">
        <div className="w-2 h-10 bg-gradient-to-b from-sky-400 to-emerald-400 rounded-full mr-4"></div>
        <h2 className="text-3xl font-bold text-white">Your Expert Guides</h2>
      </div>

      {/* Guides Timeline Design */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-gray-700 via-sky-400/50 to-gray-700"></div>

        <div className="space-y-10 pl-12">
          {guides.map((guide) => (
            <div key={guide._id} className="relative group">
              {/* Dot indicator */}
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 border-4 border-gray-800 group-hover:scale-125 transition-transform"></div>

              {/* Guide content */}
              <div className="flex flex-col sm:flex-row gap-6 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:border-sky-400/30 transition-all">
                {/* Avatar */}
                <div className="flex-shrink-0 relative">
                  <img
                    src={guide.photo}
                    alt={guide.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-sky-400/50 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 border-2 border-gray-800">
                    <FiAward className="text-white text-sm" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {guide.name}
                  </h3>
                  <div className="flex items-center text-gray-300 mb-1">
                    <FiMail className="mr-2 text-sky-400" />
                    <span>{guide.email}</span>
                  </div>
                  <div className="inline-block px-3 py-1 mt-2 bg-sky-500/10 border border-sky-400/30 rounded-full text-sky-400 text-sm">
                    {guide.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guides;
