import React, { useState } from 'react';
import {
  FiUser,
  FiCalendar,
  FiChevronDown,
  FiMessageSquare,
} from 'react-icons/fi';

const Reviews = ({ reviews = [] }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  // Star rating component
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-amber-400' : 'text-gray-500'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const loadMoreReviews = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Section Header */}
      <div className="flex items-center mb-12">
        <div className="w-2 h-10 bg-gradient-to-b from-sky-400 to-emerald-400 rounded-full mr-4"></div>
        <h2 className="text-3xl font-bold text-white">Traveler Reviews</h2>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.slice(0, visibleCount).map((review) => (
          <div
            key={review._id}
            className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-sky-400/30 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={review.user.photo}
                  alt={review.user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-sky-400/50 mt-2"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-gray-800">
                  <FiUser className="text-white text-xs" />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-medium text-white -mb-2">
                    {review.user.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <FiCalendar className="mr-1.5" />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-300 mb-2">{review.review}</p>
                {/* Rating */}
                <div className="mb-2">{renderStars(review.rating)}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Load More Button */}
        {reviews.length > visibleCount && (
          <div className="flex justify-center pt-6">
            <button
              onClick={loadMoreReviews}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-sky-500/20 to-emerald-500/20 border border-sky-400/30 text-sky-400 rounded-full hover:from-sky-500/30 hover:to-emerald-500/30 hover:border-sky-400/50 transition-all"
            >
              Load More Reviews
              <FiChevronDown className="ml-2" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-full mb-4 border border-dashed border-sky-400/30">
              <FiMessageSquare className="text-sky-400 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-400">
              Be the first to share your experience
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
