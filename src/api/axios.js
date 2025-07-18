// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5001/api' ,
// });

// api.interceptors.request.use(
//   (config) => {
//     const auth = JSON.parse(localStorage.getItem('auth'));
//     if (auth?.token) {
//       config.headers.Authorization = `Bearer ${auth.token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blogsandvlogsbackend.onrender.com/api', // ✅ Updated to production URL
});

api.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;