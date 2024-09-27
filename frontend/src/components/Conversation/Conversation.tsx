import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setSidebarState } from '../../store/features/ui/uiSlice';
import { selectIsUserOnline } from '../../store/features/chat/chatSlice';
import { RootState } from '../../store/store';
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
  const isUserOnline = useSelector((state: RootState) =>
    selectIsUserOnline(state, id),
  );
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => {
        handleSelectConversation(id);
        dispatch(setSidebarState(false));
      }}
    >
      <div
        className={`flex gap-2 items-center hover:bg-sky-300 hover:text-white rounded p-2 py-1 cursor-pointer ${isActive ? 'bg-orange-500' : ''}`}
      >
        <div className={`avatar ${isUserOnline ? 'online' : ''}`}>
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
    </div>
  );
};
