import { SearchConversation } from '../SearchConversation';
import { Conversations } from '../Conversations';
import { Logout } from '../Logout';

export const Sidebar = () => {
  return (
    <div>
      <SearchConversation />
      <div className="divider px-3" />
      <Conversations />
      <div className="divider px-3" />
      <Logout />
    </div>
  );
};
