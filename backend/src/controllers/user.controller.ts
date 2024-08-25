import { Response } from 'express';
import { CustomRequest } from '../types';
import User from '../models/user.model';

export const getUsers = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const filteresUsers = await User.find({ _id: { $ne: userId } }).select(
      '-password',
    );

    res.status(200).json(filteresUsers);
  } catch (error) {
    console.error('user.controller getUsers error:', (error as Error).message);
    res.status(500).send('Something went wrong');
  }
};
