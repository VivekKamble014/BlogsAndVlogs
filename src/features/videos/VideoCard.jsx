import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => (
  <Link to={`/videos/${video._id}`} className="block">
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-gray-800">{video.title}</h3>
      <p className="text-sm text-gray-500 mt-2">by {video.uploader.username}</p>
    </div>
  </Link>
);

export default VideoCard;