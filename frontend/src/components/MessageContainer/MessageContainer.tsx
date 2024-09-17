/// <reference types="vite-plugin-svgr/client" />
import { useSelector } from 'react-redux';
import ChatsIcon from '../../assets/chats.svg?react';
import { Messages } from '../Messages';
import { MessageInput } from '../MessageInput';
import { RootState } from '../../store/store';
import {
  selectUserById,
  selectMessages,
} from '../../store/features/chat/chatSlice';

export const MessageContainer = () => {
  const messages = useSelector(selectMessages);
  const selectedConversation = useSelector(
    (state: RootState) => state.chat.selectedConversation,
  );
  const receiver = useSelector((state: RootState) =>
    selectUserById(state, selectedConversation ?? ''),
  );

  return (
    <div className="md:min-w-[450px] w-full flex flex-col">
      {selectedConversation ? (
        <>
          <div className="bg-slate-200 py-2 px-2 mb-2 mx-4 rounded-lg mr-0">
            <span className="label-text">
              To:{' '}
              <span className="font-slate-900 font-bold">
                {receiver?.username}
              </span>
            </span>
          </div>
          <Messages messages={messages} />
          <MessageInput />
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-lg md:text-xl text-gray-700 font-semibold flex flex-col items-center gap-2">
            <p>Select a chat to start messaging</p>
            <ChatsIcon className="w-full h-12" />
          </div>
        </div>
      )}
    </div>
  );
};
