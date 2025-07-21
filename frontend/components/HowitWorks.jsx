import React from 'react';
import { FiSearch, FiCreditCard, FiSmile } from 'react-icons/fi';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: 'Browse Tours',
      description: 'Explore by location, budget, or ratings',
      color: 'from-sky-400 to-sky-600',
    },
    {
      icon: <FiCreditCard className="w-8 h-8" />,
      title: 'Book Securely',
      description: 'Reserve your spot with secure payment',
      color: 'from-emerald-400 to-emerald-600',
    },
    {
      icon: <FiSmile className="w-8 h-8" />,
      title: 'Enjoy the Journey',
      description: 'Meet your guide and start the adventure',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <section className="">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Booking your dream trip is easy as 1-2-3
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all"
            >
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} mb-6 mx-auto`}
              >
                <div className="text-white">{step.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-3">
                {step.title}
              </h3>
              <p className="text-gray-300 text-center">{step.description}</p>
              <div className="flex justify-center mt-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-800 text-gray-300">
                  Step {index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
