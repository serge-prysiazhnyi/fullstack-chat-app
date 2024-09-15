import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/auth/authSlice';
import {
  selectActiveConversation,
  selectUserById,
} from '../../store/features/chat/chatSlice';
import { RootState } from '../../store/store';

interface MessageProps {
  message: string;
  senderId: string;
}

export const Message: React.FC<MessageProps> = ({ message, senderId }) => {
  const selectedConversation = useSelector(selectActiveConversation);
  const receiverId = useSelector((state: RootState) =>
    selectUserById(state, selectedConversation ?? ''),
  );

  const user = useSelector(selectUser);
  const isUser = user?._id === senderId;
  const chatClass = isUser ? 'chat-end' : 'chat-start';
  const profilePic = isUser ? user.profilePic : receiverId?.profilePic;
  const bubbleBGClass = isUser ? 'bg-blue-500' : 'bg-gray-500';

  return (
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBGClass}`}>{message}</div>
    </div>
  );
};
