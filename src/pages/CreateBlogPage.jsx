import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../features/blogs/blogApi.js';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    try {
      await createBlog({ title, content });
      navigate('/');
    } catch (err) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="min-h-200 bg-gray-100 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative"
      >
        {/* Close (X) Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="8"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Publish Post
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBlogPage;