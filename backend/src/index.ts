import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import { app, server } from './socket/socket';
import { connectToMongoDB } from './db/connectToMongoDB';
import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const rootDir = path.resolve(__dirname, '../..');

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
    }),
  );
}

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);

app.use(express.static(path.join(rootDir, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, '/frontend/dist/index.html'));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
