import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

type BackButtonProps = {
  label?: string;
  className?: string;
  /** куди вести, якщо немає history або state.from */
  fallback?: string;
};

const BackButton: React.FC<BackButtonProps> = ({
  label = 'Назад',
  className,
  fallback = '/specialists?page=1',
}) => {
  const backBtnClass = clsx(
    'font-semibold text-fire flex gap-3 items-center transition-[text-shadow] duration-300 ease-in-out hover:text-shadow-xs',
    className
  );

  const navigate = useNavigate();
const location = useLocation();
const from = (location.state as { from?: string } | null)?.from;
  const handleClick = () => {
    if (from) {
      // прийшли зі списку з правильним ?page=...
      navigate(-1);
    } else {
      // відкрили сторінку напряму або історії немає
      navigate(fallback);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={backBtnClass}>
      <svg className="w-2 h-4 fill-fire">
        <use href="/icons.svg#icon-arrow-left" />
      </svg>
      {label}
    </button>
  );
};

export default BackButton;
