/// <reference types="vite-plugin-svgr/client" />
import LogoutIcon from '../../assets/logout.svg?react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  logout,
  selectLoadingState,
} from '../../store/features/auth/authSlice';
import { Button } from '../Button';
import { LoadingStates } from '../../types/sharedTypes';
import { clearLocalStorage } from '../../utils/clearLocalStorage';

export const Logout = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoadingState);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      clearLocalStorage();
      toast.success('Logged out successfully');
      navigate('/login');
    });
  };

  return (
    <Button
      onClick={handleLogout}
      className="flex bg-transparent hover:bg-orange-300 p-2 rounded cursor-pointer"
      loading={loading === LoadingStates.LOADING}
    >
      <LogoutIcon className="w-full h-6" />
      <span className="ml-2">Logout</span>
    </Button>
  );
};
