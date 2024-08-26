import { useState, useCallback } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from '../../services/axiosInstance';

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const callAPI = useCallback(async (config: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.request(config);

      return response;
    } catch (error: unknown) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    callAPI,
    error,
  };
};
