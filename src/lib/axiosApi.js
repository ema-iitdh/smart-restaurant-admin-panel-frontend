import axios from 'axios';

// export const url = 'https://achaathak.com/backend'
// export const url = 'https://6xmlzdw3-4000.inc1.devtunnels.ms/'
// export const url = 'http://localhost:4000';
export const url = 'https://2105-49-47-140-31.ngrok-free.app';

export const Axios = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

// // Add interceptor to ensure cookies are sent with every request
// Axios.interceptors.request.use(
//   (config) => {
//     config.withCredentials = true;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
