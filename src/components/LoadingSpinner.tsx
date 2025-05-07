import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-400 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="ml-3 text-gray-400">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;