import axios, { AxiosError } from 'axios';
import { AppStore } from '../store/store';

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_REACT_APP_API_BASE_URL
    : '/api/',
  headers: {
    'Content-Type': 'application/json',
  },
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

export const setupAxiosInseptors = (store: AppStore) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
