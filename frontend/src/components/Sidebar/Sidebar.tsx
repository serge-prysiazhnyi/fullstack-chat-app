import { SearchConversation } from '../SearchConversation';
import { Conversations } from '../Conversations';
import { Logout } from '../Logout';

export const Sidebar = () => {
  return (
    <div className="p-2 max-h-screen flex flex-col" data-testid="Sidebar">
      <SearchConversation />
      <div className="divider my-0 opacity-0" />
      <Conversations />
      <div className="divider my-0 opacity-0" />
      <Logout />
    </div>
  );
};
