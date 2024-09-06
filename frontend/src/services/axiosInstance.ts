import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_REACT_APP_API_BASE_URL
    : 'https://www.todo.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (responce) => {
    // ToDo check this
    console.log('🚀 ~ axiosInstance responce:', responce);

    return responce;
  },
  (error: AxiosError) => {
    // ToDo fix this
    const navigate = useNavigate();
    if (error.response?.status === 401) {
      navigate('/login');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
