import { useEffect } from 'react';
import { useAPI } from '../useAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext/AuthContext';
import { LocalStorageItems } from '../../types/sharedTypes';

export interface LoginFormState {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { callAPI, loading, error } = useAPI();
  const { setUser, setToken } = useAuthContext();

  const login = async (userData: LoginFormState) => {
    const { email, password } = userData;

    if (!password.length || !email.length) {
      toast.error('Please fill in all fields');
      return;
    }

    const response = await callAPI({
      method: 'POST',
      url: 'auth/login',
      data: { email, password },
    });

    if (response?.status === 200) {
      localStorage.setItem(
        LocalStorageItems.CHAT_USER,
        JSON.stringify(response.data),
      );
      localStorage.setItem(
        LocalStorageItems.TOKEN,
        JSON.stringify(response.data.token),
      );

      setUser(response.data);
      setToken(response.data.token);

      navigate('/');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error((error?.response?.data as string) || 'Something went wrong');
    }
  }, [error]);

  return {
    login,
    loading,
    error,
  };
};
