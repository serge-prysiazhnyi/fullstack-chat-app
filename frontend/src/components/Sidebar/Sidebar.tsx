import { useState } from 'react';
import { SearchConversation } from '../SearchConversation';
import { Conversations } from '../Conversations';
import { Logout } from '../Logout';
import { Hamburger } from '../Hamburger';

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Hamburger isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`
          fixed transition-transform duration-300 ease-in-out transform p-2 bg-base-200 z-10 h-full
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:max-h-screen flex flex-col lg:bg-transparent
        `} data-testid="Sidebar">
        <SearchConversation />
        <div className="divider my-0 opacity-0" />
        <Conversations />
        <div className="divider my-0 opacity-0" />
        <Logout />
      </div>
    </>
  );
};
