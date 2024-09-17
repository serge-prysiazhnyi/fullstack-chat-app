import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateUserProfilePic = (username: string) => {
  const serviseUrl = 'https://avatar.iran.liara.run/username?username=';
  return `${serviseUrl}${username}`;
};

export const generateToken = (userId: string, expiresIn: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: expiresIn || '15d',
  });
};
