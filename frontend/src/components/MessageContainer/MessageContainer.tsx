/// <reference types="vite-plugin-svgr/client" />
import ChatsIcon from '../../assets/chats.svg?react';
import { Messages } from '../Messages';
import { MessageInput } from '../MessageInput';

export const MessageContainer = () => {
  const noChatSelected = true;

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelected ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-lg md:text-xl text-gray-700 font-semibold flex flex-col items-center gap-2">
            <p>Welcome UserName</p>
            <p>Select a chat to start messaging</p>
            <ChatsIcon className="w-full h-12" />
          </div>
        </div>
      ) : (
        <>
          <div className="bg-slate-300 px-4 py-2 mb-2">
            <span className="label-text">
              To: <span className="font-slate-900 font-bold">UserName</span>
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
