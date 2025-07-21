import React, { useState } from 'react';

const Description = ({ description = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 450;
  const shouldTruncate = description?.length > previewLength;

  const displayText =
    shouldTruncate && !isExpanded
      ? `${description.substring(0, previewLength)}...`
      : description;

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-sky-400 to-emerald-400 rounded-full mr-4"></div>
        <h2 className="text-2xl font-bold text-white">Tour Description</h2>
      </div>

      <div className="relative">
        <div
          className={`text-gray-300 leading-relaxed space-y-4 transition-all duration-300 ${
            !isExpanded && shouldTruncate ? 'max-h-[200px] overflow-hidden' : ''
          }`}
        >
          {displayText?.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-300">
              {paragraph || <br />}
            </p>
          ))}
        </div>

        {!isExpanded && shouldTruncate && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800/90 to-transparent"></div>
        )}
      </div>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 flex items-center text-sky-400 hover:text-emerald-400 transition-colors font-medium"
        >
          {isExpanded ? (
            <>
              Show Less
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </>
          ) : (
            <>
              Read More
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default Description;
