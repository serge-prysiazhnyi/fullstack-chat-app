/// <reference types="vite-plugin-svgr/client" />
import LogoutIcon from '../../assets/logout.svg?react';

export const Logout = () => {
  return (
    <button className="flex">
      <LogoutIcon className="w-full h-6" />
      <span className="ml-2">Logout</span>
    </button>
  );
};
