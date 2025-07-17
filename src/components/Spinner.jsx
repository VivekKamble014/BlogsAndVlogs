import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-transparent animate-spin"></div>
        <div className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-ping"></div>
      </div>
      <p className="absolute bottom-10 text-gray-700 font-medium animate-pulse">
        Loading Blog & Vlog Experience...
      </p>
    </div>
  );
};

export default Spinner;