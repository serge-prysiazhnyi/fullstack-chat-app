import { useState, useCallback } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { callAPI as useAPICall } from '../../services/callAPI';

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  // const source = axios.CancelToken.source();

  const callAPI = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async <T = any, D = any>(options: AxiosRequestConfig) => {
      setLoading(true);
      setError(null);
      try {
        // ToDo - best approach for fallback for token ?
        return await useAPICall<T, D>(options);
      } catch (error: unknown) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

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
