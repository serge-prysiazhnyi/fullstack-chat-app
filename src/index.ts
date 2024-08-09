import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
// import { Server } from 'socket.io';
import dotenv from 'dotenv';

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
const MONGO_URI = `mongodb://localhost:27017/${process.env.DB_NAME}`;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
