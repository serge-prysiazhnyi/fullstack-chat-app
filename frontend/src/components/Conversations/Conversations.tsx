import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Conversation } from '../Conversation';
import { Spinner } from '../Spinner';
import {
  fetchUsersList,
  setActiveConversationAndFetchMessages,
  selectUsers,
  selectChatSliceLoading,
  selectChatSliceError,
  selectActiveConversation,
} from '../../store/features/chat/chatSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export const Conversations = () => {
  const dispatch = useAppDispatch();

  const activeConversation = useSelector(selectActiveConversation);
  const error = useSelector(selectChatSliceError);
  const users = useSelector(selectUsers);
  const loading = useSelector(selectChatSliceLoading);

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
    <div className="relative">
      {loading === 'loading' && <Spinner />}
      <div
        className={`py-2 flex flex-col overflow-auto ${loading === 'loading' ? 'opacity-70' : ''}`}
      >
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
