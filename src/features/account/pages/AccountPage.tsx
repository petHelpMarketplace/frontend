import { Suspense } from 'react';
import { tabs } from '../tabs';
import BackButton from '@/shared/components/UI/BackButton';
import { NavLink, Outlet } from 'react-router-dom';

export default function AccountPage() {
  return (
    <section className="mx-auto flex max-w-[375px] flex-col xl:max-w-7xl xl:px-30 xl:pt-17 xl:pb-16">
      {/* <button
        type="button"
        id="save-btn"
        className="btn-outline text-left font-semibold text-fire transition-[text-shadow] duration-300 ease-in-out hover:text-shadow-xs mb-8.5"
      >
        Зберегти
      </button> */}
      <BackButton label="Назад" className="mb-9" />

      {/* Навігація вкладок */}
      <div className="flex flex-col items-center justify-between xl:mb-12">
        <nav className="flex w-full items-start justify-between gap-13 overflow-hidden px-4">
          {tabs.map(tab => (
            <NavLink
              to={tab.key}
              key={tab.key}
              className={({ isActive }) =>
                `gap-col-4 relative flex flex-wrap items-end justify-center pb-4 text-xl font-semibold ${
                  isActive
                    ? 'after:bg-tenn text-fire fill-fire after:absolute after:bottom-[0] after:h-[3px] after:w-[calc(100%+32px)] after:content-[""]'
                    : 'text-cod-gray/80 fill-cod-gray/80 transition-[text-shadow] duration-300 ease-in-out hover:text-shadow-lg'
                }`
              }
            >
              <svg
                className="mr-3.5 h-[26px] w-[26px]"
                role="img"
                aria-label={tab.label}
              >
                <title>{tab.label}</title>
                <use href={`/icons.svg#${tab.icon}`} />
              </svg>
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Контент активної вкладки */}
      <Suspense fallback={<h3>Loading data...</h3>}>
        <Outlet />
      </Suspense>
    </section>
  );
}
