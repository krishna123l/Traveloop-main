import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TourHeroSection from '../components/SingleTour.jsx/TourHeroSection';
import OverView from '../components/SingleTour.jsx/OverView';
import Description from '../components/SingleTour.jsx/Description';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import Guides from '../components/SingleTour.jsx/Guides';
import Reviwes from '../components/SingleTour.jsx/Reviwes';
import MapSection from '../components/SingleTour.jsx/MapSection';
import BookingButton from '../components/SingleTour.jsx/BookingButton';

const SingleTour = ({ user, handleLogout }) => {
  const { id } = useParams();
  const [tour, setTour] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tours/${id}`
      );

      const respObj = await resp.json();
      setTour(respObj.data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      {!isLoading && (
        <div>
          <TourHeroSection
            background={tour.imageCover}
            tittle={tour.name}
            price={tour.price}
            rating={tour.ratingsAverage}
            summary={tour.summary}
          />
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-20">
            <OverView
              details={{
                summary: tour.summary,
                duration: tour.duration,
                groupSize: tour.maxGroupSize,
                difficulty: tour.difficulty,
                startLocation: tour.startLocation?.description,
                startAddress: tour.startLocation?.address,
              }}
            />

            <Description description={tour.description} />
            <Guides guides={tour.guides} />

            {tour.locations && <MapSection locations={tour.locations} />}

            <Reviwes reviews={tour.reviews} />
            <BookingButton
              tourId={tour._id}
              details={{
                price: tour.price,
                duration: tour.duration,
                startDates: tour.startDates,
              }}
              user={user}
            />
          </div>
        </div>
      )}

      <Footer />
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default SingleTour;
