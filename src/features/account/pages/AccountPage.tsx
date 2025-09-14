import { useState, type ReactNode } from 'react';
import { tabs, TabKey } from '../tabs';
import AccountPersonalDataForm from '../components/personalData/AccountPersonalDataForm';
import PortfolioGallery from '../components/portfolio/PortfolioGallery';
import SettingsForm from '../components/settings/AccountSettingsForm';
import AccountServicesForm from '../components/services/AccountServicesForm';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = (key: TabKey) => {
    const componentsMap: Record<TabKey, ReactNode> = {
      personal: <AccountPersonalDataForm />,
      services: <AccountServicesForm />,
      portfolio: <PortfolioGallery />,
      settings: <SettingsForm />,
    };

    return componentsMap[key] || null;
  };

  return (
    <section className="mx-auto max-w-[375px] xl:max-w-7xl xl:pt-17 xl:pb-16 xl:px-30 flex flex-col">
      <button
        type="button"
        id="save-btn"
        className="btn-outline text-left font-semibold text-fire transition-[text-shadow] duration-300 ease-in-out hover:text-shadow-xs mb-8.5"
      >
        Зберегти
      </button>

      {/* Навігація вкладок */}
      <div className="flex flex-col justify-between items-center xl:mb-12">
        <div className="w-full flex gap-13 items-start justify-between overflow-hidden px-4">
          {tabs.map((tab, i) => (
            <button
              type="button"
              key={tab.key}
              onClick={() => setActiveTab(i)}
              className={`relative text-xl font-semibold flex flex-wrap justify-center items-end gap-col-4 pb-4 ${
                i === activeTab
                  ? 'after:content-[""] after:absolute after:w-[calc(100%+32px)] after:h-[3px] after:bg-tenn after:bottom-[0] text-fire fill-fire'
                  : 'text-cod-gray/80 fill-cod-gray/80 transition-[text-shadow] duration-300 ease-in-out hover:text-shadow-lg'
              }`}
            >
              <svg
                className="h-[26px] w-[26px] mr-3.5"
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
    </section>
  );
}
