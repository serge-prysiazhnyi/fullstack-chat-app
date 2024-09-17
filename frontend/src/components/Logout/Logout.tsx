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
      className="flex bg-transparent hover:bg-slate-200 p-2 rounded cursor-pointer flex items-center"
      loading={loading === LoadingStates.LOADING}
      dataTestId="logout-button"
    >
      <LogoutIcon className="w-auto h-4" />
      <span className="ml-2 text-sm">Logout</span>
    </Button>
  );
};
