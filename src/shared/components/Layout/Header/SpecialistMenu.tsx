import { logout } from '@/features/auth/model/slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SpecialistMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // Перехід на головну сторінку або інша логіка:
    navigate('/');
  };

  return (
    <div className="flex gap-10 z-150">
      <button
        onClick={handleLogout}
        className="text-base/[122%] text-fire py-1 px-2 border border-transparent hover:border-fire rounded-2xl transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire focus-visible:ring-offset-2"
      >
        Вийти
      </button>
      <button className="flex justify-center items-center">
        <svg className="w-6 h-6 fill-fire rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_4px_1px_rgba(207,86,0,0.8)] focus:shadow-[0_0_4px_1px_rgba(207,86,0,0.8)] focus:outline-none">
          <use href="/icons.svg#icon-user" />
        </svg>
      </button>
    </div>
  );
};

export default SpecialistMenu;
