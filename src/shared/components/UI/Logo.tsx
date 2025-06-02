import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface LogoProps {
  iconFill?: string;
  iconSize?: string;
  className?: string;
}

export const Logo = ({
  iconFill = 'fill-fire',
  iconSize = 'w-[60px] h-[40px]',
  className,
}: LogoProps) => {
  return (
    <Link
      to="/"
      className={clsx('flex items-baseline gap-[2px]')}
      aria-label="PetsHelp Home"
    >
      <span className={clsx('text-lg font-second', className)}>PETS</span>
      <svg className={clsx(iconSize, iconFill, 'relative top-[1px]')}>
        <use href="/icons.svg#icon-logo" />
      </svg>
      <span className={clsx('text-lg font-second', className)}>HELP</span>
    </Link>
  );
};

export default Logo;
