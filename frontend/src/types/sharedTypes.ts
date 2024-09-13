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
