import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAPI } from '../useAPI';

export const useLogout = () => {
  const navigate = useNavigate();
  const { callAPI, error, loading } = useAPI();

  const logout = async () => {
    const response = await callAPI({
      method: 'POST',
      url: 'auth/logout',
    });

    if (response?.status === 200) {
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error((error?.response?.data as string) || 'Something went wrong');
    }
  }, [error]);

  return {
    logout,
    loading,
  };
};
