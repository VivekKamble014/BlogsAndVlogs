import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} Blog & Vlog. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-sm hover:underline">Privacy Policy</a>
          <a href="#" className="text-sm hover:underline">Terms of Service</a>
          <a href="#" className="text-sm hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}