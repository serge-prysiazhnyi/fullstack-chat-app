import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface UiState {
  isSidebarOpen: boolean;
}
const initialState: UiState = {
  isSidebarOpen: false,
};

const chatSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarState(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const selectSidebarState = (state: RootState) => state.ui.isSidebarOpen;

export const { setSidebarState } = chatSlice.actions;
export default chatSlice.reducer;
