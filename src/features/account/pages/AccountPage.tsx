import { JSX, useState } from 'react';
import { tabs, TabKey } from '../tabs';

import AccountDataForm from '../components/AccountPersonalDataForm';
import ServicesForm from '../components/AccountServicesForm';
import PortfolioForm from '../components/AccountPortfolioForm';
import SettingsForm from '../components/AccountSettingsForm';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = (key: TabKey) => {
    const componentsMap: Record<TabKey, JSX.Element> = {
      personal: <AccountDataForm />,
      services: <ServicesForm />,
      portfolio: <PortfolioForm />,
      settings: <SettingsForm />,
    };

    return componentsMap[key] || null;
  };

  return (
    <div className="xl:max-w-[1280px] xl:mx-auto xl:mt-5 xl:pt-12 xl:pb-16 xl:px-30 flex flex-col">
      <button
        type="button"
        className="btn-outline text-left font-semibold text-fire hover:text-tenn transition mb-4"
      >
        Зберегти
      </button>

      {/* Навігація вкладок */}
      <div className="flex flex-col justify-between items-center xl:mb-8">
        <div className="w-full flex gap-13 items-start justify-between overflow-hidden px-4">
          {tabs.map((tab, i) => (
            <button
              type="button"
              key={tab.key}
              onClick={() => setActiveTab(i)}
              className={`relative text-xl font-semibold flex flex-wrap justify-center items-end gap-col-4 pb-4 ${
                i === activeTab
                  ? 'after:content-[""] after:absolute after:w-[calc(100%+32px)] after:h-[3px] after:bg-tenn after:bottom-[0] text-fire fill-fire'
                  : 'text-shark/50 fill-shark/50'
              }`}
            >
              <svg
                className="h-[26px] w-[26px] mr-4"
                role="img"
                aria-label={tab.label}
              >
                <title>{tab.label}</title>
                <use href={`/icons.svg#${tab.icon}`} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Контент активної вкладки */}

      {renderTabContent(tabs[activeTab].key)}
    </div>
  );
}
