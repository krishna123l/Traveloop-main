import React from 'react';
import {
  FiUsers,
  FiClock,
  FiMessageSquare,
  FiHeadphones,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: 'Verified Guides',
      description: 'Handpicked professionals with local expertise.',
      color: 'text-sky-400',
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: 'Flexible Booking',
      description: 'Cancel or change plans up to 24 hours in advance.',
      color: 'text-emerald-400',
    },
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      title: 'Real Reviews',
      description: 'Over 1000+ verified experiences real travelers.',
      color: 'text-purple-400',
    },
    {
      icon: <FiHeadphones className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Get help anytime, from anywhere.',
      color: 'text-amber-400',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-10">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,_transparent_49%,_rgba(56,189,248,0.05)_50%,_transparent_51%)] bg-[length:40px_40px] opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="relative inline-block">
              <span className="relative z-10">Why Travelers Love Us</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 to-emerald-400 z-0"></span>
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience unmatched travel support, safety, and satisfaction.
          </p>
        </motion.div>

        {/* Timeline line */}
        <div className="relative">
          <div className="absolute hidden md:block left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400/20 via-emerald-400/20 to-purple-400/20 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 relative z-10 ml-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-start gap-6 ${
                  index % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:pl-12'
                }`}
              >
                <div
                  className={`hidden md:block absolute top-6 w-4 h-4 rounded-full border-3 m-1.5 border-gray-800 z-10 ${
                    index % 2 === 0 ? 'right-[-1rem]' : 'left-[-1rem]'
                  } ${feature.color.replace('text', 'bg')}`}
                ></div>

                {/* Icon + Text */}
                <div className="flex items-start gap-5">
                  <div
                    className={`w-14 h-14 rounded-lg shadow-lg flex items-center justify-center text-white ${feature.color.replace(
                      'text',
                      'bg'
                    )}`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-semibold ${feature.color} mb-2`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
