// import { logout } from '@/features/auth/model/slice';
import { logoutSpec } from '@/features/auth/model/operations';
import { useAppDispatch } from '@/shared/hooks';
import { useNavigate } from 'react-router-dom';

const SpecialistMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutSpec());
    // Перехід на головну сторінку або інша логіка:
    navigate('/');
  };

  return (
    <div className="z-150 flex gap-10">
      <button
        onClick={handleLogout}
        className="text-fire hover:border-fire focus-visible:ring-fire rounded-2xl border border-transparent px-2 py-1 text-base/[122%] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Вийти
      </button>
      <button
        className="flex items-center justify-center"
        onClick={() => navigate('/account')}
        aria-label="Перейти до аккаунту"
      >
        <svg className="fill-fire h-6 w-6 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_4px_1px_rgba(207,86,0,0.8)] focus:shadow-[0_0_4px_1px_rgba(207,86,0,0.8)] focus:outline-none">
          <use href="/icons.svg#icon-user" />
        </svg>
      </button>
    </div>
  );
};

export default SpecialistMenu;
