import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

router.post('/login', async (req, res) => {
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
});

export default router;
