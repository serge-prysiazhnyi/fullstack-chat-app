import { useReducer, Reducer, useEffect } from 'react';
import { useAPI } from '../useAPI';

enum ActionType {
  SET_SELECTED_CONVERSATIONS = 'SET_SELECTED_CONVERSATIONS',
  SET_MESSAGES = 'SET_MESSAGES',
  // ToDo adjust this
  SET_USERS = 'SET_USERS',
}

interface State {
  selectedConversation: string | null;
  messages: string[];
  // ToDo adjust this
  users: unknown[];
}

type Action =
  | { type: ActionType.SET_SELECTED_CONVERSATIONS; payload: string }
  | { type: ActionType.SET_MESSAGES; payload: string[] }
  // ToDo adjust this
  | { type: ActionType.SET_USERS; payload: unknown[] };

const initialState = {
  selectedConversation: null,
  messages: [],
  // ToDo adjust this
  users: [],
};

const reducer = (state: State, action: Action): State => {
  if (action.type === ActionType.SET_SELECTED_CONVERSATIONS) {
    return {
      ...state,
      selectedConversation: action.payload,
    };
  }

  if (action.type === ActionType.SET_MESSAGES) {
    return {
      ...state,
      messages: action.payload,
    };
  }

  // ToDo adjust this
  if (action.type === ActionType.SET_USERS) {
    return {
      ...state,
      users: action.payload,
    };
  }

  return state;
};

export const useConversationsState = () => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState,
  );

  const { callAPI, loading, error } = useAPI();

  const fetchUsers = async () => {
    const response = await callAPI({ method: 'GET', url: '/user' });

    // ToDo adjust this
    if (response) {
      dispatch({
        type: ActionType.SET_USERS,
        payload: response.data,
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { state, dispatch, loading, error };
};
