import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAPI } from '../../hooks/useAPI';

export interface SignUpFormState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const useSignUp = () => {
  const navigate = useNavigate();
  const { loading, callAPI, error } = useAPI();

  const signUp = async (formState: SignUpFormState) => {
    if (formState.password !== formState.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formState.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (Object.values(formState).some((value) => !value)) {
      toast.error('Please fill in all fields');
      return;
    }

    const response = await callAPI({
      method: 'POST',
      url: 'auth/register',
      data: formState,
    });

    if (response?.status === 201) {
      toast.success('Account created successfully');
      navigate('/');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error((error?.response?.data as string) || 'Something went wrong');
    }
  }, [error]);

  return {
    loading,
    signUp,
  };
};
