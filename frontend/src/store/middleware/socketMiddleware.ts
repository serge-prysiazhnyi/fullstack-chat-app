import { Middleware, isAction, MiddlewareAPI } from '@reduxjs/toolkit';
import { login, logout } from '../features/auth/authSlice';
import { setUsersOnline, setNewMessage } from '../features/chat/chatSlice';
import { RootState } from '../store';
import { initializeApp, reloadApp } from '../features/app/appSlice';
import { LoginResponse } from '../../types/sharedTypes';
import { socketService } from '../../services/socket/socketService';

const addSocketListeners = (storeAPI: MiddlewareAPI, userId: string) => {
  socketService.off('connect');
  socketService.off('disconnect');
  socketService.off('getOnlineUsers');
  socketService.off('newMessage');

  socketService.on('connect', () => {
    console.log('Socket connected');
  });

  socketService.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socketService.on('getOnlineUsers', (usersOnline: string[]) => {
    storeAPI.dispatch(setUsersOnline(usersOnline));
  });

  socketService.on('newMessage', ({ message, receiverId }) => {
    if (!!message && receiverId === userId)
      storeAPI.dispatch(setNewMessage(message));
  });
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const socketMiddleware: Middleware<{}, RootState> = (storeAPI) => {
  return (next) => (action) => {
    if (isAction(action) && action.type === `${login.typePrefix}/fulfilled`) {
      const { payload } = action as { type: string; payload: LoginResponse };
      const token = payload.token ?? '';
      const userId = payload._id ?? '';

      socketService.initSocket(token, userId);

      addSocketListeners(storeAPI, userId);
    }

    if (initializeApp.match(action)) {
      const token = storeAPI.getState().auth.token ?? '';
      const userId = storeAPI.getState().auth.user?._id ?? '';

      socketService.initSocket(token, userId);

      addSocketListeners(storeAPI, userId);
    }

    if (reloadApp.match(action)) {
      socketService.disconnect();
    }

    if (isAction(action) && action.type === `${logout.typePrefix}/fulfilled`) {
      socketService.disconnect();
    }

    return next(action);
  };
};
