import { footerSections } from '@/shared/components/Layout/Footer/footerData';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion from '@/shared/components/Layout/Footer/Accordion';
import Logo from '@/shared/components/UI/Logo';

const Footer = () => {
  const [openAcordion, setOpenAccordion] = useState<string | null>(null);
  return (
    <footer
      role="contentinfo"
      className="w-full mx-auto text-alabaster bg-footer-gradient rounded-t-[60px] p-10 max-w-[375px] xl:px-[120px] xl:pt-[29px] xl:pb-[25px] xl:max-w-[1280px]"
    >
      {/* Логотип */}
      <div className="flex justify-center mb-[77px] xl:mb-[39px]">
        <Logo
          iconSize="w-[60px] h-[40px]"
          iconFill="fill-alabaster"
          textColor="text-alabaster"
          textSize="text-lg"
          textShadow="text-shadow-none"
        />
      </div>

      {/* Mobile: Accordion */}
      <div className="flex flex-col text-lg gap-[26px] mb-[56px] xl:hidden">
        {footerSections.map(({ title, links }) => (
          <Accordion
            key={title}
            title={title}
            isOpen={openAcordion === title}
            onToggle={() =>
              setOpenAccordion(prev => (prev === title ? null : title))
            }
          >
            <ul className="flex flex-col text-sm gap-3.5 mt-5">
              {links.map(({ text, to }) => (
                <li key={`${to}-${text}`}>
                  <Link
                    to={to}
                    className="text-alabaster text-sm font-normal block leading-[120%]"
                    tabIndex={openAcordion === title ? 0 : -1}
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
      <div className="hidden xl:flex xl:gap-[138px] xl:mb-[31px]">
        {footerSections.map(({ title, links }) => (
          <div key={title}>
            <h3 className="font-semibold text-xl mb-[10px]">{title}</h3>
            <ul className="leading-[2.5]">
              {links.map(({ text, to }) => (
                <li key={`${to}-${text}`}>
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
      <p className="text-xs text-center leading-[120%]">
        <span className="mr-2 xl:mr-[9px]">©</span>
        {new Date().getFullYear()} PetsHelp marketplace
      </p>
    </footer>
  );
};

export default Footer;
