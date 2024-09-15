import React from 'react';
import { Message } from '../Message';
import { Message as MessageType } from '../../types/sharedTypes';

interface MessagesProps {
  messages: MessageType[] | null;
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="px-4 flex-1 overflow-auto max-h-[80vh] scrollbar-thin">
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <Message
            key={message._id}
            message={message.message}
            senderId={message.senderId}
          />
        ))
      ) : (
        <p>No messages yet</p>
      )}
    </div>
  );
};
