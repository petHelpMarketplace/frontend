import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { useState } from 'react';

const PrivacyAccordion = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Disclosure>
      {({ open }) => (
        <div className="border-fire rounded-2xl border-2 px-4 py-5 xl:px-8">
          <DisclosureButton
            className="text-fire border-fire flex w-full items-center justify-between text-lg/[150%]"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="flex gap-2 xl:gap-7.5">
              <svg className="fill-fire h-7 w-7">
                <use href="/icons.svg#icon-rolled-document" />
              </svg>
              <h2>Загальні положення</h2>
            </div>
            <svg
              className={`fill-fire h-4 w-2 transform transition-transform duration-300 ease-in-out ${
                open ? 'rotate-90' : 'rotate-270'
              }`}
            >
              <use href="/icons.svg#icon-arrow-left" />
            </svg>
          </DisclosureButton>
          <DisclosurePanel className="mt-4.5 xl:mt-5">
            1. Ця Політика конфіденційності (надалі – «Політика») розроблена у
            відповідності до діючого законодавства України, в тому числі, але не
            виключно, Закону України «Про захист персональних даних» від 01
            червня 2010 року № 2297-VI щодо Користувачів Порталу PetsHelp і
            встановлює порядок отримання, збору, накопичення, зберігання,
            обробки, використання, забезпечення захисту і розкриття персональних
            даних (надалі – «Дані») Користувачів Сайту.
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
};

export default PrivacyAccordion;
