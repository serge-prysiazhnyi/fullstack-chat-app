/// <reference types="vite-plugin-svgr/client" />
import SendIcon from '../../assets/send.svg?react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  sendMessage,
  selectActiveConversation,
} from '../../store/features/chat/chatSlice';

export const MessageInput = () => {
  const dispatch = useAppDispatch();
  const activeConversation = useSelector(selectActiveConversation) ?? '';
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      dispatch(sendMessage({ receiverId: activeConversation, message }));
      setMessage('');
    }
  };

  return (
    <form
      className="px-4 my-3 absolute bottom-0 right-0 w-full pr-0"
      onSubmit={handleSubmit}
    >
      <div className="w-full ">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="border text-sm rounded-lg block w-full p-2 bg-slate-200 border-gray-300 pr-12"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 right-1"
        >
          <SendIcon className="w-full h-6 " />
        </button>
      </div>
    </form>
  );
};
