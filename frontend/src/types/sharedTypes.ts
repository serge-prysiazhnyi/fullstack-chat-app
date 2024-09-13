export enum LocalStorageItems {
  CHAT_USER = 'chat-user',
  TOKEN = 'token',
}

export interface BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  lastActive: string;
  profilePic: string;
  email: string;
  username: string;
  roles: string[];
}

export interface Message extends BaseEntity {
  message: string;
  receiverId: string;
  senderId: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  username: string;
  confirmPassword: string;
}

export interface LoginResponse extends User {
  token: string;
}

export enum LoadingStates {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}
