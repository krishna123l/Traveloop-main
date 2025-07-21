import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ToursList from '../components/ToursList';
import HowItWorks from '../components/HowitWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';

const Home = ({ user, handleLogout }) => {
  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <HeroSection />
      <div className="backdrop-blur-sm py-16 px-4 sm:px-6 lg:px-8">
        <ToursList />
        <HowItWorks />
        <WhyChooseUs />
      </div>

      <Footer />

      <ToastContainer />
    </div>
  );
};

export default Home;
