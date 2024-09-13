import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import { addAuthorizationHeader } from '../utils/addAuthorizationHeader';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callAPI = async <T = any, D = any>(
  options: AxiosRequestConfig,
) => {
  const token = JSON.parse(localStorage.getItem('token') || '{}');
  const config = addAuthorizationHeader(token, options);

  return await axiosInstance.request<T, AxiosResponse<T>, D>(config);
};
