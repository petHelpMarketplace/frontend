import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

type BackButtonProps = {
  label?: string;
  className?: string;
  to?: string;        // куди перейти замість history back
  replace?: boolean;  // не додавати новий запис в історію
};

const BackButton = ({
  label = 'Назад',
  className,
    to,
  replace = false,
}: BackButtonProps) => {
   const navigate = useNavigate();

  const backBtnClass = clsx(
    'font-semibold text-fire flex gap-3 items-center transition-[text-shadow] duration-300 ease-in-out hover:text-shadow-xs',
    className
  );

 

  const handleClick = () => {
    if (to) navigate(to, {replace});
    else navigate(-1); // Returns to the previous page
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
