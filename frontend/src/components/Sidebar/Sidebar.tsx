import { SearchConversation } from '../SearchConversation';
import { Conversations } from '../Conversations';
import { Logout } from '../Logout';

export const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 pr-4" data-testid="Sidebar">
      <SearchConversation />
      <div className="divider my-0 opacity-0" />
      <Conversations />
      <div className="divider my-0 opacity-0" />
      <Logout />
    </div>
  );
};
