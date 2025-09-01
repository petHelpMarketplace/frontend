import { useNavigate, type To } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type BackButtonProps = {
  label?: string;
  className?: string;
  to?: To;        
  replace?: boolean; 
};

const BackButton = ({
  label = 'Назад',
  className,
    to,
  replace = false,
}: BackButtonProps) => {
   const navigate = useNavigate();

  const backBtnClass = twMerge(
    'font-semibold text-fire flex gap-3 items-center transition-[text-shadow] duration-300 ease-in-out hover:text-shadow-xs',
    className
  );

 

  const handleClick = () => {
    if (to) navigate(to, {replace});
    else if (window.history.length > 1) navigate(-1);
    else navigate('/faq'); 
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
