// src/pages/VideoDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchVideoById, createVideoComment } from '../features/videos/videoApi.js';
import { useAuth } from '../hooks/useAuth.js';
import { XCircle } from 'lucide-react'; // Optional: Using lucide-react for icon

const BACKEND_URL = 'http://localhost:5001';

const VideoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');

  const loadVideo = async () => {
    try {
      setLoading(true);
      const data = await fetchVideoById(id);
      setVideo(data);
    } catch (err) {
      setError('Failed to load video.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideo();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVideoComment(id, { text: comment });
      setComment('');
      loadVideo(); // Refresh video to show new comment
    } catch (err) {
      console.error('Failed to post comment', err);
    }
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Close Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-red-600 transition"
          title="Go Back"
        >
          <XCircle className="w-7 h-7" />
        </button>
      </div>

      {/* Video Section */}
      <h1 className="text-2xl font-bold mt-2 mb-1">{video.title}</h1>
      <p className="text-sm text-gray-600 mb-4">By {video.uploader.username}</p>

      <div className="w-full flex justify-center mb-4">
        <video
          src={`${BACKEND_URL}${video.videoUrl}`}
          controls
          className="rounded-lg w-full max-w-[800px] h-[450px] bg-black"
        />
      </div>

      <p className="mb-6 text-gray-800">{video.description}</p>
      <hr className="mb-6" />

      {/* Comment Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {auth && (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 resize-none"
              rows="4"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Post Comment
            </button>
          </form>
        )}

        {video.comments?.length > 0 ? (
          video.comments.map((c) => (
            <div
              key={c._id}
              className="border-b border-gray-200 pb-3 mb-4"
            >
              <p className="font-semibold">{c.author.username}</p>
              <p className="text-gray-700">{c.text}</p>
              <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </section>
    </div>
  );
};

export default VideoDetailPage;