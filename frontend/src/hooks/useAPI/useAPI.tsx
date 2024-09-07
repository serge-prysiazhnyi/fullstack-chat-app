import { useState, useCallback, useContext } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from '../../services/axiosInstance';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { addAuthorizationHeader } from '../../utils/addAuthorizationHeader';

export const useAPI = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  // const source = axios.CancelToken.source();

  const callAPI = useCallback(async (options: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const config = addAuthorizationHeader(token, options);

      return await axiosInstance.request(config);
    } catch (error: unknown) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   return () => {
  //     console.log('CLEANUP');
  //     source.cancel('Operation canceled by the user.');
  //   };
  // }, []);

  return {
    loading,
    callAPI,
    error,
  };
};
