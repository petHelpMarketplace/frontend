// import { footerSections } from '@/shared/components/Layout/Footer/footerData';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Accordion from '@/shared/components/Layout/Footer/Accordion';
// import Logo from '@/shared/components/UI/Logo';

// const Footer = () => {
//   const [openAcordion, setOpenAccordion] = useState<string | null>(null);
//   return (
//     <footer
//       role="contentinfo"
//       className="w-full mx-auto text-alabaster bg-footer-gradient rounded-t-[60px] p-10 max-w-[375px] xl:px-[120px] xl:pt-[29px] xl:pb-[25px] xl:max-w-[1280px] mt-[137px] xl:mt-0"
//     >
//       {/* Логотип */}
//       <div className="flex justify-center mb-[77px] xl:mb-[39px]">
//         <Logo
//           iconSize="w-[60px] h-[40px]"
//           iconFill="fill-alabaster"
//           textColor="text-alabaster"
//           textSize="text-lg"
//           textShadow="text-shadow-none"
//         />
//       </div>

//       {/* Mobile: Accordion */}
//       <div className="flex flex-col text-lg gap-[26px] mb-[56px] xl:hidden">
//         {footerSections.map(({ title, links }) => (
//           <Accordion
//             key={title}
//             title={title}
//             isOpen={openAcordion === title}
//             onToggle={() =>
//               setOpenAccordion(prev => (prev === title ? null : title))
//             }
//           >
//             <ul className="flex flex-col text-sm gap-3.5 mt-5">
//               {links.map(({ text, to }) => (
//                 <li key={`${to}-${text}`}>
//                   <Link
//                     to={to}
//                     className="text-alabaster text-sm font-normal block leading-[120%]"
//                     tabIndex={openAcordion === title ? 0 : -1}
//                   >
//                     {text}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </Accordion>
//         ))}
//       </div>

//       {/* Desktop: Columns */}
//       <div className="hidden xl:flex xl:gap-[138px] xl:mb-[31px]">
//         {footerSections.map(({ title, links }) => (
//           <div key={title}>
//             <h3 className="font-semibold text-xl mb-[10px]">{title}</h3>
//             <ul className="leading-[2.5]">
//               {links.map(({ text, to }) => (
//                 <li key={`${to}-${text}`}>
//                   <Link to={to} className="text-alabaster">
//                     {text}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* Копірайт */}
//       <p className="text-xs text-center leading-[120%]">
//         <span className="mr-2 xl:mr-[9px]">©</span>
//         {new Date().getFullYear()} PetsHelp marketplace
//       </p>
//     </footer>
//   );
// };

// export default Footer;

import { footerSections } from '@/shared/components/Layout/Footer/footerData';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion from '@/shared/components/Layout/Footer/Accordion';
import Logo from '@/shared/components/UI/Logo';
import { isExternal, toInternalPath, isUnsafeProtocol } from "@/shared/components/Layout/Footer/links";

const Footer = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const renderFooterLink = (
    { text, to, external }: { text: string; to: string; external?: boolean },
    tabIndex?: number
  ) => {
    const lower = to.trim().toLowerCase();
    const isMailOrTel = lower.startsWith("mailto:") || lower.startsWith("tel:");

    // 1) небезпечні протоколи — інертний елемент
    if (isUnsafeProtocol(to)) {
      return (
        <span className="text-alabaster text-sm font-normal block leading-[inherit] opacity-80" aria-disabled="true">
          {text}
        </span>
      );
    }

    const forceExternal = external ?? isExternal(to);

    // 2) зовнішні — <a>, внутрішні — <Link>
    if (forceExternal) {
      const target = isMailOrTel ? undefined : "_blank";
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;
      return (
        <a
          href={to}
          target={target}
          rel={rel}
          className="text-alabaster text-sm font-normal block leading-[inherit]"
          tabIndex={tabIndex}
        >
          {text}
        </a>
      );
    }

    return (
      <Link
        to={toInternalPath(to)}
        className="text-alabaster text-sm font-normal block leading-[inherit]"
        tabIndex={tabIndex}
      >
        {text}
      </Link>
    );
  };

  return (
    <footer
      role="contentinfo"
      className="w-full mx-auto text-alabaster bg-footer-gradient rounded-t-[60px] p-10 max-w-[375px] xl:px-[120px] xl:pt-[29px] xl:pb-[25px] xl:max-w-[1280px] mt-[137px] xl:mt-0"
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
            isOpen={openAccordion === title}
            onToggle={() =>
              setOpenAccordion(prev => (prev === title ? null : title))
            }
          >
            <ul className="flex flex-col text-sm gap-3.5 mt-5">
              {links.map((link) => (
                <li key={`${link.to}-${link.text}`}>
                  {renderFooterLink(link, openAccordion === title ? 0 : -1)}
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
             {links.map((link) => (
                <li key={`${link.to}-${link.text}`}>{renderFooterLink(link)}</li>
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
