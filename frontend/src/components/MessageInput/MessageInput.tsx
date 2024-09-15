/// <reference types="vite-plugin-svgr/client" />
import SendIcon from '../../assets/send.svg?react';

export const MessageInput = () => {
  return (
    <form className="px-4 my-3 relative pr-0">
      <div className="w-full ">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2 bg-slate-200 border-gray-300"
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
