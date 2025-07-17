import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-extrabold hover:text-gray-300 transition duration-300">
          Blog & Vlog
        </Link>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {auth && (
            <>
              <Link to="/create-blog" className="hover:text-blue-300 transition duration-200">
                Create Blog
              </Link>
              <Link to="/upload-video" className="hover:text-blue-300 transition duration-200">
                Upload Video
              </Link>
            </>
          )}
          {auth ? (
            <>
              <span className="text-sm opacity-90">Hi, {auth.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-300 transition duration-200">Login</Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-3 px-4 py-2 text-sm">
          {auth && (
            <>
              <Link to="/create-blog" className="hover:text-blue-300 transition duration-200">
                Create Blog
              </Link>
              <Link to="/upload-video" className="hover:text-blue-300 transition duration-200">
                Upload Video
              </Link>
            </>
          )}
          {auth ? (
            <>
              <span className="opacity-90">Hi, {auth.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-300 transition duration-200">Login</Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;