import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { FiStar, FiClock, FiArrowRight, FiEye } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setToatlPage] = useState(1);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tours?page=${page}`
      );
      const respObj = await resp.json();
      setTours(respObj.data.data);
      setToatlPage(respObj.totalPages);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleNext = () => {
    if (page < totalPage) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleViewAll = () => {
    navigate('/tours');
  };

  return (
    <div className="mb-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text">
            Discover Our Tours
          </h1>
          <button
            onClick={handleViewAll}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            <FiEye className="h-5 w-5" />
            View All Tours
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10 hover:-translate-y-1 transition-transform"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={
                    tour.imageCover ||
                    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1368&q=80'
                  }
                  alt={tour.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  {tour.name}
                </h2>
                <p className="text-gray-300 mb-4">{tour.summary}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sky-400">
                    <FiStar className="mr-1" />
                    <span>
                      {tour.ratingsAverage} ({tour.ratingsQuantity})
                    </span>
                  </div>

                  <div className="flex items-center text-emerald-400">
                    <FiClock className="mr-1" />
                    <span>{tour.duration} days</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    ₹{tour.price}
                  </span>
                  <button
                    onClick={() => navigate(`tour/${tour._id}`)}
                    className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    Details <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-12">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`text-3xl text-white p-2 rounded-full ${
                page === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-white/10'
              }`}
            >
              &lt;
            </button>

            <span className="text-white">
              Page {page} of {totalPage}
            </span>

            <button
              onClick={handleNext}
              disabled={page === totalPage}
              className={`text-3xl text-white p-2 rounded-full ${
                page === totalPage
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-white/10'
              }`}
            >
              &gt;
            </button>
          </div>

          <button
            onClick={handleViewAll}
            className="md:hidden flex items-center gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            <FiEye className="h-5 w-5" />
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToursList;
