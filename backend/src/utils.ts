import { Response } from 'express';
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

export const setTokenCookie = (res: Response, token: string) => {
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS 15 days
    httpOnly: true, // prevent xss attacks
    sameSite: 'strict', // CSRF attacks cross-site request forgery
    secure: process.env.NODE_ENV !== 'development', // only https
  });
};

export const generateTpkenAndSetCookie = (res: Response, userId: string) => {
  const token = generateToken(userId, '15d');
  setTokenCookie(res, token);
};
