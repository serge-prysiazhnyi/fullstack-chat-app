import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { PASSWORD_MIN_LENGTH } from '../constants';
import { generateUserProfilePic, generateTpkenAndSetCookie } from '../utils';

const SALT = 10;

export const login = async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user?.password || '');

        if (!user || !isPasswordValid) {
            return res.status(401).send('Invalid credentials');
        }

        generateTpkenAndSetCookie(res, user._id.toString());

        res.status(200).json({
            _id: user._id.toString(),
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, email, confirmPassword, profilePic } = req.body;

        if (password.length < PASSWORD_MIN_LENGTH) {
            return res
                .status(400)
                .send(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

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

        generateTpkenAndSetCookie(res, user._id.toString());

        await user.save();
        res.status(201).json({
            _id: user._id.toString(),
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error((error as Error).message);
        res.status(500).send('Something went wrong');
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('jwt');
        res.status(200).send('Logged out');
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
}
