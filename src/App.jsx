import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CreateBlogPage from './pages/CreateBlogPage.jsx';
import UploadVideoPage from './pages/UploadVideoPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import VideoDetailPage from './pages/VideoDetailPage.jsx';
import Spinner from './components/Spinner';

const router = createBrowserRouter([
  
  {
    
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blogs/:id', element: <BlogDetailPage /> }, 
            { path: 'videos/:id', element: <VideoDetailPage /> }, // Add this route


      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'create-blog', element: <CreateBlogPage /> },
          { path: 'upload-video', element: <UploadVideoPage /> },
        ],
      },
    ],
  },
]);

function App() {
  
  return <RouterProvider router={router} />;
  
}
export default App;