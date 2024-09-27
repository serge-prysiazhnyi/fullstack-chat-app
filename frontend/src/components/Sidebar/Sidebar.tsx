import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setSidebarState } from '../../store/features/ui/uiSlice';
import { selectSidebarState } from '../../store/features/ui/uiSlice';
import { SearchConversation } from '../SearchConversation';
import { Conversations } from '../Conversations';
import { Logout } from '../Logout';
import { Hamburger } from '../Hamburger';
import { UserBadge } from '../UserBadge';

export const Sidebar = () => {
  const isSidebarOpen = useSelector(selectSidebarState);
  const dispatch = useAppDispatch();

  return (
    <>
      <Hamburger
        isOpen={isSidebarOpen}
        setIsOpen={() => dispatch(setSidebarState(!isSidebarOpen))}
      />
      <div
        className={`
          fixed transition-transform duration-300 ease-in-out transform p-2 bg-base-200 z-10 h-full w-full
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:max-h-screen flex flex-col lg:bg-transparent lg:w-auto
        `}
        data-testid="Sidebar"
      >
        <UserBadge />
        <div className="divider m-0 py-2 opacity-75"></div>
        <SearchConversation />
        <div className="divider my-0 opacity-0" />
        <Conversations />
        <div className="divider my-0 opacity-0" />
        <Logout />
      </div>
    </>
  );
};
