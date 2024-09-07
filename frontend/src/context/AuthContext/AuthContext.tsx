import React, { useState, useContext, useCallback } from 'react';
import { LocalStorageItems } from '../../types/sharedTypes';

interface UserData {
  profilePic: string;
  username: string;
  _id: string;
}

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<unknown>>;
  setToken: React.Dispatch<React.SetStateAction<unknown>>;
  resetContext: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  resetContext: () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const useAuthContext = () => useContext(AuthContext);

const getInitialStorageItem = (key: string) => {
  const savedItem = localStorage.getItem(key);

  if (!!savedItem && typeof savedItem === 'string') {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  return null;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState(
    getInitialStorageItem(LocalStorageItems.CHAT_USER),
  );
  const [token, setToken] = useState(
    getInitialStorageItem(LocalStorageItems.TOKEN),
  );
  const resetContext = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, resetContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};
