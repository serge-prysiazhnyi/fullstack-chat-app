import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { PASSWORD_MIN_LENGTH } from '../constants';
import { generateUserProfilePic } from '../utils';

export const login = async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
        );

        res.json({ token });
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
            email,
            profilePic: profilePic || generateUserProfilePic(username),
        });

        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        console.error((error as Error).message);
        res.status(500).send('Something went wrong');
    }
};
