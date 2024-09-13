import React from 'react';

interface MessageProps {
  message: string;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-512.png"
            alt="user avatar"
          />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500 ">{message}</div>
    </div>
  );
};
