import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="bg-gray-100 min-h-screen">
    <Navbar />
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Outlet />
    </main>
  </div>
);

export default Layout;