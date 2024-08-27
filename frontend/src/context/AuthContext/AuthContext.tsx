import React, { useState, useContext } from 'react';

interface UserData {
  profilePic: string;
  username: string;
  _id: string;
}

interface AuthContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<unknown>>;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const useAuthContext = () => useContext(AuthContext);

const getInitialUser = () => {
  const savedUser = localStorage.getItem('chat-user');

  if (!!savedUser && typeof savedUser === 'string') {
    return JSON.parse(localStorage.getItem('chat-user') as string);
  }

  return null;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState(getInitialUser());

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
