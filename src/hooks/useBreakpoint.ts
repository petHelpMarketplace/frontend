import { useState, useEffect } from 'react';

// Тип для зручної типізації результату
type Breakpoint = 'mobile' | 'tablet' | 'desktop';

// Медіа-запити, які відповідають брейкпоінтам
const queries = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1279px)',
  desktop: '(min-width: 1280px)',
};

// Функція, що повертає поточний брейкпоінт на основі ширини екрана
const getCurrent = (): Breakpoint => {
  // SSR-захист — під час серверного рендерингу немає window
  if (typeof window === 'undefined') return 'mobile';

  // Перевірка відповідності поточного вікна кожному медіа-запиту
  if (window.matchMedia(queries.desktop).matches) return 'desktop';
  if (window.matchMedia(queries.tablet).matches) return 'tablet';
  return 'mobile';
};

// Хук useBreakpoint
export function useBreakpoint(): Breakpoint {
  // Ініціалізуємо стан одразу з фактичним значенням (а не просто 'mobile')
  const [value, setValue] = useState<Breakpoint>(getCurrent);

  useEffect(() => {
    // SSR-захист (на всяк випадок)
    if (typeof window === 'undefined') return;

    // Створюємо MediaQueryList об'єкти для кожного брейкпоінта
    const mediaQueryLists = {
      desktop: window.matchMedia(queries.desktop),
      tablet: window.matchMedia(queries.tablet),
      mobile: window.matchMedia(queries.mobile),
    };

    // Обробник зміни брейкпоінта — оновлює стан
    const handler = () => setValue(getCurrent());

    // Додаємо слухачі на зміну кожного медіа-запиту
    Object.values(mediaQueryLists).forEach(mql =>
      mql.addEventListener('change', handler)
    );

    // Видаляємо слухачі після демонтажу компонента, щоб уникнути memory leaks
    return () => {
      Object.values(mediaQueryLists).forEach(mql =>
        mql.removeEventListener('change', handler)
      );
    };
  }, []); // Запускаємо ефект лише один раз після монтування

  // Повертаємо поточне значення брейкпоінта
  return value;
}
