import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <Link
        to="#"
        className="flex text-fire px-2 py-1 border-[2px] border-transparent rounded-full hover:border-fire transition-colors"
      >
        Сервіси
      </Link>
    </nav>
  );
};
