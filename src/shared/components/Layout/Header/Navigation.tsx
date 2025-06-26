import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav>
      <Link
        to="#"
        className="flex text-fire px-2 xl:py-1 leading-[122%] border-[2px] border-transparent rounded-full hover:border-fire transition-colors"
      >
        Сервіси
      </Link>
    </nav>
  );
};
