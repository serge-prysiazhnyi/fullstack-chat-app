import { configureStore, combineReducers } from '@reduxjs/toolkit';
import chatReducer from './features/chat/chatSlice';
import authReducer from './features/auth/authSlice';
import appReducer from './features/app/appSlice';
import uiReducer from './features/ui/uiSlice';
import { socketMiddleware } from './middleware/socketMiddleware';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(socketMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
