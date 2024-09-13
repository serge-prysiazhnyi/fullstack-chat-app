import React from 'react';
import { Message } from '../Message';
import { Message as MessageType } from '../../types/sharedTypes';

interface MessagesProps {
  messages: MessageType[];
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="px-4 flex-1 overflow-auto max-h-[550px] scrollbar-thin">
      {messages.map((message) => (
        <Message key={message._id} message={message.message} />
      ))}
    </div>
  );
};
