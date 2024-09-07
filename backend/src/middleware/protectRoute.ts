import { Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).send('Unauthorized: no token provided');
      return;
    }

    const token = authHeader.split(' ')[1];

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(401).send('Unauthorized: token has expired');
        return;
      }

      res.status(401).send('Unauthorized: token is not valid');
      return;
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
