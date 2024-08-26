/// <reference types="vite-plugin-svgr/client" />
import LogoutIcon from '../../assets/logout.svg?react';
import { useLogout } from '../../hooks/useLogout';
import { Button } from '../Button';

export const Logout = () => {
  const { logout, loading } = useLogout();

  return (
    <Button
      onClick={() => logout()}
      className="flex bg-transparent"
      loading={loading}
    >
      <LogoutIcon className="w-full h-6" />
      <span className="ml-2">Logout</span>
    </Button>
  );
};
