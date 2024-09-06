import { Conversation } from '../Conversation';
import { useConversationsState } from '../../hooks/useConversationsState';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const Conversations = () => {
  const { error, state } = useConversationsState();

  useEffect(() => {
    if (error) {
      if (error?.response?.data && typeof error?.response?.data === 'string') {
        toast.error(error?.response?.data);
      }
    }
  }, [error]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {state.users.map((user) => (
        <Conversation
          key={user._id}
          userName={user?.username}
          profilePic={user?.profilePic}
        />
      ))}
    </div>
  );
};
