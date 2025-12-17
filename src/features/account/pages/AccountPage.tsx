import { Suspense, useEffect } from 'react';
import { tabs } from '../tabs';
import BackButton from '@/shared/components/UI/BackButton';
import { NavLink, Outlet } from 'react-router-dom';
import Spinner from '@/shared/components/UI/Spinner/Spinner';
import { useAppDispatch } from '@/shared/hooks';
import { getSpecInfo } from '../model/operations';

export default function AccountPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSpecInfo());
  }, [dispatch]);

  return (
    <section className="section-wrap">
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
      <Suspense fallback={<Spinner fallbackHeight="40vh" />}>
        <Outlet />
      </Suspense>
    </section>
  );
}
