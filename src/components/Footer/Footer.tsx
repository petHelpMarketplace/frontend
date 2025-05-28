import { useBreakpoint } from '@/hooks/useBreakpoint';
import { footerSections } from '@/data/footerData';
import { Link } from 'react-router-dom';
import Accordion from '@/components/Footer/Accordion';

const Footer = () => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';


  const getFooterClasses = () => {
    const baseClasses =
      'w-full mx-auto text-alabaster bg-gradient-to-t from-red-beech to-fiery-tenn rounded-t-[60px]';
    const desktopClasses = 'px-[120px] pt-[29px] pb-[25px] max-w-[1280px]';
    const mobileClasses = 'px-[26px] pt-[44px] pb-[27px] max-w-[375px]';
    return `${baseClasses} ${isDesktop ? desktopClasses : mobileClasses}`;
  };

  return (
    <footer className={getFooterClasses()}>
      {/* Логотип */}
      <div className={`flex justify-center ${isDesktop ? 'mb-[39px]' : 'mb-[73px]'}`}>
        <Link to="/" className="flex items-baseline gap-1">
          <span className="text-lg font-third">PETS</span>
          <svg
            className={`fill-alabaster ${isDesktop ? 'w-[61px] h-[39px]' : 'w-[48px] h-[32px]'}`}
          >
            <use href="/icons.svg#icon-logo" />
          </svg>
          <span className="text-lg font-third">HELP</span>
        </Link>
      </div>

      {/* Секції */}
      {isDesktop ? (
        <div className="flex gap-[138px] mb-[31px]">
          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h3 className="font-semibold text-xl mb-[10px]">{title}</h3>
              <ul className="leading-[2.5]">
                {links.map(({ text, to }) => (
                  <li key={text}>
                    <Link to={to} className="text-alabaster">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col text-lg gap-7 mb-15">
          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <Accordion title={title}>
                <ul className="flex flex-col text-sm gap-4">
                  {links.map(({ text, to }) => (
                    <li key={text}>
                      <Link
                        to={to}
                        className="text-alabaster text-sm font-normal leading-[1.2]"
                      >
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
          ))}
        </div>
      )}

      {/* Копірайт */}
      <p className="text-xs text-center">
        <span className="mr-2 xl:mr-[9px]">&copy;</span>
        2025 PetsHelp marketplace
      </p>
    </footer>
  );
};

export default Footer;
