import { useAppDispatch } from '@/hooks/index';
import { logout } from '@/features/auth/model/authSlice';
import { useNavigate } from 'react-router-dom';

export const AccUserActions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex items-center gap-4 text-fire">
      <button
        onClick={handleLogout}
        className="px-2 py-1 border-[2px] border-transparent rounded-full hover:border-fire transition-colors"
        type="button"
      >
        Вийти
      </button>
      {/* <UserIcon className="w-6 h-6 fill-fire" /> */}
    </div>
  );
};
