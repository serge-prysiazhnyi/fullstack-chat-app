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
      className="my-3"
      onSubmit={handleSubmit}
      data-testid="send-message-form"
    >
      <div className="w-full flex rounded-lg border border-gray-300 bg-slate-200 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-base block w-full p-2 pr-12 bg-slate-200"
          placeholder="Type a message..."
        />
        <Button
          className="absolute flex max-w-12 items-center px-3 top-0 bottom-0 right-1.5"
          type="submit"
          dataTestId="send-message-button"
        >
          <SendIcon className="w-full h-6" />
        </Button>
      </div>
    </form>
  );
};
