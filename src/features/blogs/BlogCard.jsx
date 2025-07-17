import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => (
  <Link to={`/blogs/${blog._id}`} className="block">
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
      <p className="text-sm text-gray-500 mt-2">by {blog.author.username}</p>
    </div>
  </Link>
);

export default BlogCard;