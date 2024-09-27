import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/auth/authSlice';

export const UserBadge = () => {
  const user = useSelector(selectUser);

  return (
    <div className="flex items-center gap-2 p-2">
      <div className="w-8 rounded-full">
        <img src={user?.profilePic} alt="user avatar" />
      </div>
      <div className="flex flex-col flex-1">
        <p className="text-gray-800 text-sm font-semibold">{user?.username}</p>
      </div>
    </div>
  );
};
