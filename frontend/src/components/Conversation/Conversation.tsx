import React from 'react';
interface ConversationProps {
  userName: string;
  profilePic: string;
  id: string;
  handleSelectConversation: (id: string) => void;
  isActive: boolean;
}

export const Conversation: React.FC<ConversationProps> = ({
  userName,
  profilePic,
  handleSelectConversation,
  id,
  isActive,
}) => {
  return (
    <div onClick={() => handleSelectConversation(id)}>
      <div
        className={`flex gap-2 items-center hover:bg-sky-300 hover:text-white rounded p-2 py-1 cursor-pointer ${isActive ? 'bg-orange-500' : ''}`}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <p
            className={`font-bold text-gray-800 ${isActive ? 'text-white' : ''}`}
          >
            {userName}
          </p>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </div>
  );
};
