import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { JwtPayload, CustomRequest } from '../types';
import User from '../models/user.model';

dotenv.config();

const protectRoute = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).send('Unauthorized: no token provided');
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || '',
    ) as JwtPayload;

    if (!decoded) {
      res.status(401).send('Unauthorized: token is not valid');
    }

    const user = await User.findById(decoded.userId).select('-password');

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export default protectRoute;
