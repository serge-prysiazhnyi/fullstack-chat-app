import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Conversation } from '../Conversation';
import { Spinner } from '../Spinner';
import {
  fetchUsersList,
  setActiveConversationAndFetchMessages,
  selectUsers,
  selectChatSliceError,
  selectActiveConversation,
  selectLoadingState,
} from '../../store/features/chat/chatSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { LoadingStates } from '../../types/sharedTypes';

export const Conversations = () => {
  const dispatch = useAppDispatch();

  const loadingState = useSelector(selectLoadingState);
  const activeConversation = useSelector(selectActiveConversation);
  const error = useSelector(selectChatSliceError);
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSelectConversation = useCallback((_id: string) => {
    dispatch(setActiveConversationAndFetchMessages(_id));
  }, []);

  return (
    <div className="relative max-h-[75vh] overflow-auto">
      {users.length === 0 && loadingState === LoadingStates.LOADING && (
        <Spinner />
      )}
      <div className="py-2 flex flex-col overflow-auto">
        {users.map((user) => (
          <Conversation
            key={user._id}
            id={user._id}
            userName={user.username}
            profilePic={user.profilePic}
            handleSelectConversation={handleSelectConversation}
            isActive={user._id === activeConversation}
          />
        ))}
      </div>
    </div>
  );
};
