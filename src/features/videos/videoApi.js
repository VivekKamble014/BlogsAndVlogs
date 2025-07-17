import api from '../../api/axios.js';

// keep the fetchVideos function
export const fetchVideos = async () => {
  const response = await api.get('/videos');
  return response.data;
};

// add the uploadVideo function
export const uploadVideo = async (formData) => {
  // The Content-Type header is set automatically by the browser
  // when you send a FormData object.
  const response = await api.post('/videos', formData);
  return response.data;
};


// add the fetchVideoById function
export const fetchVideoById = async (id) => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};

export const createVideoComment = async (id, commentData) => {
  const response = await api.post(`/videos/${id}/comments`, commentData);
  return response.data;
};
