import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlogById, createBlogComment } from '../features/blogs/blogApi.js';
import { useAuth } from '../hooks/useAuth.js';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');

  const loadBlog = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogById(id);
      setBlog(data);
    } catch (err) {
      setError('Failed to load blog post.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlogComment(id, { text: comment });
      setComment('');
      loadBlog();
    } catch (err) {
      console.error('Failed to post comment', err);
    }
  };

  if (loading) return <p className="text-center py-12 text-lg text-gray-500">Loading...</p>;
  if (error) return <p className="text-center py-12 text-lg text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br py-8 px-4 flex justify-center">
      <div className="relative bg-white shadow-xl rounded-2xl w-full max-w-3xl p-6 transition-all duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Blog Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            By <span className="font-medium text-gray-700">{blog.author.username}</span>
          </p>
        </header>

        {/* Blog Content */}
        <div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap border-t pt-4 border-gray-200">
          {blog.content}
        </div>

        {/* Comments Section */}
        <section className="mt-8 border-t pt-6 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>

          {/* Add Comment */}
          {auth && (
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                required
                className="w-full h-24 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
              />
              <button
                type="submit"
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Post Comment
              </button>
            </form>
          )}

          {/* Existing Comments */}
          {blog.comments.length > 0 ? (
            <div className="space-y-5">
              {blog.comments.map((c) => (
                <div key={c._id} className="border-t pt-4">
                  <p className="font-medium text-gray-800">{c.author.username}</p>
                  <p className="text-gray-700 text-sm mt-1">{c.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogDetailPage;