import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_REACT_APP_API_BASE_URL
    : 'https://www.todo.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (responce) => responce,
  (error: AxiosError) => {
    const navigate = useNavigate();
    // handle errors here, such as redirecting for unauthorized responses
    if (error.response?.status === 401) {
      navigate('/login');
    }

    console.error('axiosInstance request error:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
