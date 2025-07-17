import { useState, useEffect } from 'react';
import { fetchBlogs } from '../features/blogs/blogApi.js';
import { fetchVideos } from '../features/videos/videoApi.js';
import BlogCard from '../features/blogs/BlogCard.jsx';
import VideoCard from '../features/videos/VideoCard.jsx';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [blogsData, videosData] = await Promise.all([
          fetchBlogs(),
          fetchVideos(),
        ]);
        setBlogs(blogsData);
        setVideos(videosData);
      } catch (err) {
        setError('Failed to load content.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-700 animate-pulse">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 text-center">Latest Content</h1>

      {/* Blogs Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <p className="text-gray-600">No blogs found.</p>
          )}
        </div>
      </section>

      {/* Videos Section */}
      <section className="mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video._id} video={video} />)
          ) : (
            <p className="text-gray-600">No videos found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;