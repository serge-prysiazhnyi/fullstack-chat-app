import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Message, User, LoadingStates } from '../../../types/sharedTypes';
import { callAPI } from '../../../services/callAPI';
import { RootState } from '../../store';
import { apiUrls } from '../../../services/apiUrls';

interface ChatState {
  messages: Message[] | null;
  selectedConversation: string | null;
  users: User[];
  loading: LoadingStates;
  error: string | null;
}

const initialState: ChatState = {
  messages: null,
  selectedConversation: null,
  users: [],
  loading: LoadingStates.IDLE,
  error: null,
};

export const fetchUsersList = createAsyncThunk(
  'chat/fetchUsersList',
  async () => {
    const response = await callAPI<User[]>({
      url: apiUrls.USER,
      method: 'GET',
    });
    return response?.data || [];
  },
);

export const fetchConversationMessages = createAsyncThunk(
  'chat/messages',
  async (id: string) => {
    const response = await callAPI<Message[]>({
      url: `${apiUrls.MESSAGE}/${id}`,
      method: 'GET',
    });
    return response?.data || [];
  },
);

export const setActiveConversationAndFetchMessages = createAsyncThunk(
  'chat/setActiveConversationAndFetchMessages',
  async (id: string, { dispatch }) => {
    dispatch(setSelectedConversations(id));
    dispatch(fetchConversationMessages(id));
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedConversations(state, action: PayloadAction<string>) {
      state.selectedConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = LoadingStates.LOADING;
        state.error = null;
      })
      .addCase(
        fetchUsersList.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.users = action.payload;
          state.loading = LoadingStates.SUCCEEDED;
        },
      )
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.loading = LoadingStates.FAILED;
        console.log('action: fetchUsersList error', action.error);

        state.error = action.error.message || 'Failed to fetch users';
      });

    builder
      .addCase(fetchConversationMessages.pending, (state) => {
        state.loading = LoadingStates.LOADING;
        state.error = null;
      })
      .addCase(
        fetchConversationMessages.fulfilled,
        (state, action: PayloadAction<Message[]>) => {
          state.messages = action.payload;
          state.loading = LoadingStates.SUCCEEDED;
        },
      )
      .addCase(fetchConversationMessages.rejected, (state, action) => {
        state.loading = LoadingStates.FAILED;
        console.log('action: fetchConversationMessages error', action.error);
        state.error = action.error.message || 'Failed to fetch messages';
      });
  },
});

export const selectUsers = (state: RootState) => state.chat.users;
export const selectUserById = (state: RootState, userId: string) =>
  state.chat.users.find((user) => user._id === userId);
export const selectChatSliceLoading = (state: RootState) => state.chat.loading;
export const selectChatSliceError = (state: RootState) => state.chat.error;
export const selectActiveConversation = (state: RootState) =>
  state.chat.selectedConversation;

export const { setSelectedConversations } = chatSlice.actions;
export default chatSlice.reducer;
