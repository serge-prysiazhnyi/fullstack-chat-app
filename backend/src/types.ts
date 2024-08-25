import { Request } from 'express';

import { IUser } from './models/user.model';

export interface JwtPayload {
  userId: string;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

export interface CustomRequest extends Request {
  user?: IUser | null;
}
