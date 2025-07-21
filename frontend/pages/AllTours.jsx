import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import {
  FiStar,
  FiClock,
  FiArrowRight,
  FiSearch,
  FiFilter,
  FiChevronDown,
} from 'react-icons/fi';
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

const AllTours = ({ user, handleLogout }) => {
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchedValue, setSearchedValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    minRating: '',
    sort: '',
  });

  const filteredData = tours.filter((tour) =>
    tour.name.toLowerCase().includes(searchedValue)
  );

  console.log(filteredData);

  const generateQuery = () => {
    const params = new URLSearchParams();
    if (filters.minRating)
      params.append('ratingsAverage[gte]', filters.minRating);
    if (filters.sort) params.append('sortBy', filters.sort);
    if (filters.name) params.append('name', filters.name);
    return params.toString();
  };

  const getTours = async () => {
    try {
      const query = generateQuery();
      const resp = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/tours?page=${page}&limit=9&${query}`
      );
      const respObj = await resp.json();
      setTours(respObj.data.data);
      setTotalPages(respObj.totalPages);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTours();
  }, [page, filters]);

  console.log(searchedValue);
  const handleSearch = (e) => {
    setSearchedValue(searchValue);
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePrev = () => page > 1 && setPage((prev) => prev - 1);
  const handleNext = () => page < totalPages && setPage((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-emerald-400"></div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              All Available Tours
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Explore our complete collection of unforgettable experiences
          </p>
        </div>

        {/* Filter/Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Search Input with Button - Left Side */}
          <div className="flex w-full md:w-115 gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-3 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tours..."
                className="w-full pl-10  py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
            >
              <FiSearch className="h-5 w-5" />
              Search
            </button>
          </div>

          {/* Filter/Sort - Right Side */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Rating Filter */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiStar className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="appearance-none pl-5 pr-10 py-3 bg-gray-700 backdrop-blur-md border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent cursor-pointer"
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, minRating: e.target.value }))
                }
              >
                <option value="">All Ratings</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="appearance-none pl-3 py-3 pr-8 bg-gray-700 backdrop-blur-md border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent cursor-pointer"
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sort: e.target.value }))
                }
              >
                <option value="">Sort By</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-ratingsAverage">Ratings (High First)</option>
                <option value="-createdAt">Newest Tours</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.length > 0 ? (
            filteredData.map((tour) => (
              <div
                key={tour._id}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10 hover:-translate-y-1 transition-transform"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={tour.imageCover}
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
                      onClick={() => navigate(`/tour/${tour._id}`)}
                      className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                    >
                      Details <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-white/10 border border-white/10">
                <FiSearch className="w-10 h-10 text-sky-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                No tours found
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                We couldn't find any tours matching your search. Try adjusting
                your filters or explore our featured tours.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
              page === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-sky-500 hover:text-white'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all font-medium ${
                  page === pageNum
                    ? 'bg-gradient-to-br from-sky-500 to-emerald-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {pageNum}
              </button>
            )
          )}

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
              page === totalPages
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-sky-500 hover:text-white'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {isLoading && <LoadingSpinner />}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Footer />
    </div>
  );
};

export default AllTours;
