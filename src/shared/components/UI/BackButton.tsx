import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

type BackButtonProps = {
  label?: string;
  className?: string;
};

const BackButton: React.FC<BackButtonProps> = ({
  label = 'Назад',
  className,
}) => {
  const backBtnClass = clsx(
    'font-semibold text-fire flex gap-3 items-center transition-[text-shadow] duration-300 ease-in-out hover:text-shadow-xs',
    className
  );

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Returns to the previous page
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
