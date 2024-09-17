import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Message, User, LoadingStates } from '../../../types/sharedTypes';
import { callAPI } from '../../../services/callAPI';
import { RootState } from '../../store';
import { apiUrls } from '../../../services/apiUrls';
import { setError } from '../app/appSlice';

interface ChatState {
  messages: Message[] | null;
  selectedConversation: string | null;
  users: User[];
  loading: LoadingStates;
  error: string | null;
  usersOnline: { [key: string]: string };
}

const initialState: ChatState = {
  messages: null,
  selectedConversation: null,
  users: [],
  loading: LoadingStates.IDLE,
  error: null,
  usersOnline: {},
};

export const fetchUsersList = createAsyncThunk(
  'chat/fetchUsersList',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await callAPI<User[]>({
        url: apiUrls.USER,
        method: 'GET',
      });
      return response?.data || [];
    } catch (error) {
      const errorMessage =
        (error as unknown as AxiosError<string>).response?.data ??
        'Failed to login';

      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchConversationMessages = createAsyncThunk(
  'chat/messages',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await callAPI<Message[]>({
        url: `${apiUrls.MESSAGE}/${id}`,
        method: 'GET',
      });
      return response?.data || [];
    } catch (error) {
      const errorMessage =
        (error as unknown as AxiosError<string>).response?.data ??
        'Failed to login';

      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const setActiveConversationAndFetchMessages = createAsyncThunk(
  'chat/setActiveConversationAndFetchMessages',
  async (id: string, { dispatch }) => {
    dispatch(setSelectedConversations(id));
    dispatch(fetchConversationMessages(id));
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    message: { receiverId: string; message: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await callAPI<Message>({
        url: `${apiUrls.SEND_MESSAGE}/${message.receiverId}`,
        method: 'POST',
        data: message,
      });

      return response?.data;
    } catch (error) {
      const errorMessage =
        (error as unknown as AxiosError<string>).response?.data ??
        'Failed to login';

      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedConversations(state, action: PayloadAction<string>) {
      state.selectedConversation = action.payload;
    },
    setMesasges(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    setNewMessage(state, action: PayloadAction<Message>) {
      state.messages = state.messages
        ? [...state.messages, action.payload]
        : [action.payload];
    },
    setUsersOnline(state, action: PayloadAction<string[]>) {
      const newUsersOnline: { [key: string]: string } = {};
      for (const userId of action.payload) {
        newUsersOnline[userId] = userId;
      }

      state.usersOnline = newUsersOnline;
    },
    resetChatSliceState(state) {
      state.messages = initialState.messages;
      state.selectedConversation = initialState.selectedConversation;
      state.users = initialState.users;
      state.loading = initialState.loading;
      state.error = initialState.error;
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

    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = LoadingStates.LOADING;
        state.error = null;
      })
      .addCase(
        sendMessage.fulfilled,
        (state, action: PayloadAction<Message>) => {
          state.messages = state.messages
            ? [...state.messages, action.payload]
            : [action.payload];
          state.loading = LoadingStates.SUCCEEDED;
        },
      )
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = LoadingStates.FAILED;
        console.log('action: sendMessage error', action.error);
        state.error = action.error.message || 'Failed to send message';
      });
  },
});

export const selectUsers = (state: RootState) => state.chat.users;
export const selectUserById = (state: RootState, userId: string) =>
  state.chat.users.find((user) => user._id === userId);
export const selectChatSliceError = (state: RootState) => state.chat.error;
export const selectActiveConversation = (state: RootState) =>
  state.chat.selectedConversation;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectLoadingState = (state: RootState) => state.chat.loading;
export const selectUsersOnline = (state: RootState) => state.chat.usersOnline;
export const selectIsUserOnline = (state: RootState, userId: string) => {
  return Object.prototype.hasOwnProperty.call(state.chat.usersOnline, userId);
};

export const {
  setSelectedConversations,
  resetChatSliceState,
  setMesasges,
  setUsersOnline,
  setNewMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
