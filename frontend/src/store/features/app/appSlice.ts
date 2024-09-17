import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface AppState {
  error: string | null;
}

const initialState: AppState = {
  error: null,
};

const authSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializeApp() {},
    reloadApp() {},
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const selectError = (state: RootState) => state.app.error;

export const { setError, initializeApp, reloadApp } = authSlice.actions;
export default authSlice.reducer;
