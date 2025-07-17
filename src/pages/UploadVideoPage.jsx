import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '../features/videos/videoApi.js';
import { X, UploadCloud } from 'lucide-react';

const UploadVideoPage = () => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      setError('Please select a video file to upload.');
      return;
    }

    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('videoFile', videoFile);

    try {
      await uploadVideo(formData);
      navigate('/');
    } catch (err) {
      setError('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-200 bg-gradient-to-br px-4">
      <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl transition-all duration-300 hover:shadow-2xl">
        {/* Cross Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Upload New Video</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Video Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter video title"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Select Video File</label>
            <input
              type="file"
              onChange={(e) => setVideoFile(e.target.files[0])}
              accept="video/*"
              required
              className="w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <UploadCloud className="w-5 h-5" />
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoPage;