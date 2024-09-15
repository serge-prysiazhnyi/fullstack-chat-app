import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { callAPI } from '../../../services/callAPI';
import { RootState } from '../../store';
import { apiUrls } from '../../../services/apiUrls';
import {
  UserLoginData,
  LoadingStates,
  LocalStorageItems,
  LoginResponse,
  User,
  UserRegisterData,
} from '../../../types/sharedTypes';
import { clearLocalStorage } from '../../../utils/clearLocalStorage';
import { getInitialStorageItem } from '../../../utils/getInitialStorageItem';
import { resetChatSliceState } from '../chat/chatSlice';

interface AuthState {
  token: string | null;
  user: User | null;
  loading: LoadingStates;
  error: string | null;
}

const initialState: AuthState = {
  token: getInitialStorageItem(LocalStorageItems.TOKEN),
  user: getInitialStorageItem(LocalStorageItems.CHAT_USER),
  loading: LoadingStates.IDLE,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (userLoginData: UserLoginData) => {
    const response = await callAPI<LoginResponse>({
      method: 'POST',
      url: apiUrls.LOGIN,
      data: userLoginData,
    });

    localStorage.setItem(
      LocalStorageItems.TOKEN,
      JSON.stringify(response.data.token),
    );
    localStorage.setItem(
      LocalStorageItems.CHAT_USER,
      JSON.stringify(response.data),
    );

    return response.data;
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (userRegisterData: UserRegisterData) => {
    const response = await callAPI<LoginResponse>({
      method: 'POST',
      url: apiUrls.REGISTER,
      data: userRegisterData,
    });

    localStorage.setItem(
      LocalStorageItems.TOKEN,
      JSON.stringify(response.data.token),
    );
    localStorage.setItem(
      LocalStorageItems.CHAT_USER,
      JSON.stringify(response.data),
    );

    return response.data;
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await callAPI({
      method: 'POST',
      url: apiUrls.LOGOUT,
    });

    dispatch(resetChatSliceState());
    clearLocalStorage();
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = LoadingStates.LOADING;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = LoadingStates.SUCCEEDED;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = LoadingStates.FAILED;
        state.error = action.error.message ?? 'Failed to login';
      })

      .addCase(logout.pending, (state) => {
        state.loading = LoadingStates.LOADING;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = LoadingStates.SUCCEEDED;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = LoadingStates.FAILED;
        state.error = action.error.message ?? 'Failed to logout';
      })

      .addCase(register.pending, (state) => {
        state.loading = LoadingStates.LOADING;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = LoadingStates.SUCCEEDED;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = LoadingStates.FAILED;
        state.error = action.error.message ?? 'Failed to register';
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectLoadingState = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
