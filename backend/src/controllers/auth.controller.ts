import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { SALT, TOKEN_EXPIRATION_TIME } from '../constants';
import { generateUserProfilePic, generateToken } from '../utils';

export const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || '',
    );

    if (!user || !isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }

    const token = generateToken(user._id.toString(), TOKEN_EXPIRATION_TIME);

    res.status(200).json({
      _id: user._id.toString(),
      username: user.username,
      profilePic: user.profilePic,
      lastActive: user.lastActive,
      roles: user.roles,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token,
    });
  } catch (error) {
    console.error('auth.controller login error:', (error as Error).message);
    res.status(500).send('Something went wrong');
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email, profilePic } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, SALT);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      profilePic: profilePic || generateUserProfilePic(username),
    });

    const token = generateToken(user._id.toString(), TOKEN_EXPIRATION_TIME);

    await user.save();
    res.status(201).json({
      _id: user._id.toString(),
      username: user.username,
      profilePic: user.profilePic,
      token,
    });
  } catch (error) {
    console.error('auth.controller register error:', (error as Error).message);
    res.status(500).send('Something went wrong');
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt');
    res.status(200).send('Logged out');
  } catch (error) {
    console.error('auth.controller logout error:', (error as Error).message);
    res.status(500).send('Something went wrong');
  }
};
