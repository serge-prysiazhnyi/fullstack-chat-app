import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callAPI = async <T = any, D = any>(
  options: AxiosRequestConfig,
) => {
  return await axiosInstance.request<T, AxiosResponse<T>, D>(options);
};
