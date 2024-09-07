import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_REACT_APP_API_BASE_URL
    : 'https://www.todo.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (responce) => responce,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error('error: ', error);

      // ToDo add redirect to /login
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
