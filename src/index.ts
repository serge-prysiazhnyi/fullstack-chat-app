import express from 'express';
import http from 'http';
// import { Server } from 'socket.io';
import dotenv from 'dotenv';

import { connectToMongoDB } from './db/connectToMongoDB';

dotenv.config();

import authRoutes from './routes/auth';
// import chatRoutes from './routes/chat';

const app = express();
const server = http.createServer(app);
// const io = new Server(server);

app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api/chat', chatRoutes);

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
