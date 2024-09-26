/// <reference types="vite-plugin-svgr/client" />
import SendIcon from '../../assets/send.svg?react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  sendMessage,
  selectActiveConversation,
} from '../../store/features/chat/chatSlice';
import { Button } from '../Button';

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
      className="px-4 my-3 pr-0"
      onSubmit={handleSubmit}
      data-testid="send-message-form"
    >
      <div className="w-full flex rounded-lg border border-gray-300 bg-slate-200">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="text-sm block w-full p-2 pr-12 bg-slate-200 grow"
          placeholder="Type a message..."
        />
        <Button
          className="flex items-center pe-3 right-1 basis-12"
          type="submit"
          dataTestId="send-message-button"
        >
          <SendIcon className="w-full h-6" />
        </Button>
      </div>
    </form>
  );
};
