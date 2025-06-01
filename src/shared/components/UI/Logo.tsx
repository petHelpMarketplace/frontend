import { Link } from 'react-router-dom';

interface LogoProps {
  textColor?: string;  
  iconFill?: string; 
  textSize?: string;    
  iconSize?: string;   
}

 const Logo = ({
  textColor = 'text-fire',
  iconFill = 'fill-fire',
  textSize = 'text-lg',
  iconSize = 'w-[60px] h-[40px]',
}: LogoProps) => (
  <Link
    to="/"
    className="flex items-baseline"
    aria-label="PetsHelp Home"
  >
    <span className={`${textSize} ${textColor}`}>PETS</span>
    <svg className={`${iconSize} ${iconFill} relative top-[1px]`}>
      <use href="/icons.svg#icon-logo" />
    </svg>
    <span className={`${textSize} ${textColor}`}>HELP</span>
  </Link>
);

export default Logo;