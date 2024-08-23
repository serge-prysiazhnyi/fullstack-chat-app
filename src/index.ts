import express from 'express';
import http from 'http';
// import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectToMongoDB } from './db/connectToMongoDB';

dotenv.config();

import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import userRoutes from './routes/user.routes';

const app = express();
const server = http.createServer(app);
// const io = new Server(server);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
