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
  fallback = '/',
}) => {
  const backBtnClass = clsx(
    'font-semibold text-fire flex gap-3 items-center transition-[text-shadow] duration-300 ease-in-out hover:text-shadow-xs',
    className
  );

  const navigate = useNavigate();
const location = useLocation();
const from = (location.state as { from?: string } | null)?.from;
  const handleClick = () => {
    const hasHistory =
      typeof window !== 'undefined' && window.history.state?.idx > 0;
    if (hasHistory) {
      navigate(-1);
      return;
    }
    if (from) {
      navigate(from);
      return;
    }
    navigate(fallback);
  };

  return (
    <button type="button" onClick={handleClick} className={backBtnClass}>
      <svg className="fill-fire h-4 w-2">
        <use href="/icons.svg#icon-arrow-left" />
      </svg>
      {label}
    </button>
  );
};

export default BackButton;
