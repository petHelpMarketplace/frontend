import { footerSections } from '@/shared/components/Layout/Footer/footerData';
import { Link } from 'react-router-dom';
import Accordion from '@/shared/components/Layout/Footer/Accordion';
import Logo from '@/shared/components/UI/Logo';

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="w-full mx-auto text-alabaster bg-gradient-to-t from-red-beech to-fiery-tenn rounded-t-[60px]
        px-10 py-10 max-w-[375px]
        xl:px-[120px] xl:pt-[29px] xl:pb-[25px] xl:max-w-[1280px]"
    >
      {/* Логотип */}
      <div className="flex justify-center mb-[73px] xl:mb-[39px]">
      <Logo
      textColor="text-alabaster"
      iconFill="fill-alabaster"/>
      </div>
      
      {/* Mobile: Accordion */}
      <div className="flex flex-col text-lg gap-5 mb-[61px] xl:hidden">
        {footerSections.map(({ title, links }) => (
          <Accordion key={title} title={title}>
            <ul className="flex flex-col mt-[20px] text-sm gap-4">
              {links.map(({ text, to }) => (
                <li key={to}>
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
        ))}
      </div>

      {/* Desktop: Columns */}
      <div className="hidden xl:flex gap-[138px] mb-[31px]">
        {footerSections.map(({ title, links }) => (
          <div key={title}>
            <h3 className="font-semibold text-xl mb-[10px]">{title}</h3>
            <ul className="leading-[2.5]">
              {links.map(({ text, to }) => (
                <li key={to}>
                  <Link to={to} className="text-alabaster">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Копірайт */}
      <p className="text-xs text-center">
        <span className="mr-2 xl:mr-[9px]">©</span>
        {new Date().getFullYear()} PetsHelp marketplace
      </p>
    </footer>
  );
};

export default Footer;
