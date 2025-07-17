import api from '../../api/axios.js';

// keep the fetchBlogs function
export const fetchBlogs = async () => {
  const response = await api.get('/blogs');
  return response.data;
};

// add the createBlog function
export const createBlog = async (blogData) => {
  const response = await api.post('/blogs', blogData);
  return response.data;
};

// add the fetchBlogById function
export const fetchBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const createBlogComment = async (id, commentData) => {
  const response = await api.post(`/blogs/${id}/comments`, commentData);
  return response.data;
};