// Logo.tsx
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface LogoProps {
  iconFill?: string; // Колір заповнення для SVG
  iconSize?: string; // Розмір для SVG іконки (наприклад, "w-[26px] h-[18px] xl:w-[60px] xl:h-[40px]")
  textColor?: string; // Колір тексту (наприклад, "text-fire xl:text-fire")
  textSize?: string; // Розмір тексту (наприклад, "text-[7px] xl:text-lg")
  textShadow?: string; // Тінь тексту (наприклад, "text-shadow-xs xl:text-shadow-none")
  className?: string; // Загальні класи для батьківського Link-контейнера лого (якщо потрібно)
}

const Logo = ({
  iconFill,
  iconSize,
  textColor,
  textSize,
  textShadow,
  className,
}: LogoProps) => {
  return (
    <Link
      to="/"
      className={clsx('flex items-baseline gap-[2px]', className)} // className застосовується до Link
      aria-label="PetsHelp Home"
    >
      <span
        className={clsx(
          'font-second leading-[130%]', // Загальні стилі, які не змінюються
          textColor,
          textSize,
          textShadow
        )}
      >
        PETS
      </span>
      <svg
        className={clsx(
          iconSize,
          iconFill, // Колір заповнення SVG
          'relative top-[1px]'
        )}
      >
        <use href="/icons.svg#icon-logo" />
      </svg>
      <span
        className={clsx(
          'font-second leading-[130%]', // Загальні стилі, які не змінюються
          textColor,
          textSize,
          textShadow
        )}
      >
        HELP
      </span>
    </Link>
  );
};

export default Logo;
