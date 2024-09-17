import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoadingState } from '../../store/features/chat/chatSlice';
import { Message } from '../Message';
import { Message as MessageType, LoadingStates } from '../../types/sharedTypes';
import { MessagesSkeleton } from './MessagesSkeleton';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';

interface MessagesProps {
  messages: MessageType[] | null;
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const isLoading = useSelector(selectLoadingState);
  const lastMessagesRef = useScrollToBottom<
    HTMLLIElement,
    MessageType[] | null
  >(messages);

  return (
    <div className="px-4 flex-1 overflow-auto max-h-[80vh] scrollbar-thin font-semibold">
      {isLoading === LoadingStates.LOADING && !messages ? (
        <MessagesSkeleton />
      ) : (
        <ul>
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <li key={message._id} ref={lastMessagesRef}>
                <Message
                  message={message.message}
                  senderId={message.senderId}
                />
              </li>
            ))
          ) : (
            <p className="px-4 text-lg text-center">No messages yet</p>
          )}
        </ul>
      )}
    </div>
  );
};
