import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
  },
});

const userSocketMap = new Map<string, string>();

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  console.log('user connected', userId);

  if (userId !== 'undefined') {
    userSocketMap.set(userId as string, socket.id);
  }

  // io.emit() is used to send a message to all connected clients
  io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));

  socket.on('disconnect', () => {
    console.log('user disconnected', userId);
    userSocketMap.delete(userId as string);

    io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));
  });
});

export { app, server, io };
