import { useState, useEffect, useRef, useMemo, useLayoutEffect, type ReactNode } from 'react';
import { useLocation, useNavigationType, useNavigate } from 'react-router-dom';
import Pagination from '@/features/searchSpecialists/components/Pagination';
import SpecialistsList from '@/features/searchSpecialists/components/SpecialistsList';
import { mockSpecialists } from '@/data/mockSpecialists';
import BackButton from '@/features/searchSpecialists/components/BackButton';
import StateDisplay from '@/features/searchSpecialists/components/StateDisplay';
import SpecialistCardSkeleton from '@/features/searchSpecialists/components/SpecialistCardSkeleton';

const SearchSpecialistsPage = () => {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP' | 'PUSH' | 'REPLACE'
  const navigate = useNavigate();

  // query params
  const params = new URLSearchParams(location.search);
  const selectedDistrict = params.get('district') || '';

  const specialistsPerPage = 16;

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(16);
  const listRef = useRef<HTMLDivElement | null>(null);

  // ключ для sessionStorage (враховує фільтри з URL)
  const scrollKey = useMemo(
    () => `scroll:/specialists${location.search || ''}`,
    [location.search]
  );

  const filteredSpecialists = selectedDistrict
    ? mockSpecialists.filter(s => s.district === selectedDistrict)
    : mockSpecialists;

  const totalPages = Math.ceil(filteredSpecialists.length / specialistsPerPage) || 1;

  // helper: читаємо і обмежуємо page з URL
  const getPageFromSearch = () => {
    const p = Number(new URLSearchParams(location.search).get('page')) || 1;
    return Math.min(Math.max(p, 1), totalPages || 1);
  };

  // page ініціалізуємо з URL (джерело істини)
  const [page, setPage] = useState(getPageFromSearch());

  // синхронізуємо локальний page із URL при будь-якій навігації
  useEffect(() => {
    const p = getPageFromSearch();
    if (p !== page) setPage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, totalPages]);

  // при зміні district — скидаємо і URL до ?page=1
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    if (sp.get('page') !== '1') {
      sp.set('page', '1');
      navigate(
        { pathname: location.pathname, search: `?${sp.toString()}` },
        { replace: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict]);

  // дані для поточної сторінки
  const specialistsToShow = filteredSpecialists.slice(
    (page - 1) * specialistsPerPage,
    page * specialistsPerPage
  );

  // скелетони під ширину (і на ресайз)
  useEffect(() => {
    const apply = () => setSkeletonCount(window.innerWidth < 768 ? 2 : 4);
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  // утиліта для синхронного скролу на верх
  const scrollToTopSync = () => {
    const el = document.scrollingElement || document.documentElement || document.body;
    el.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  // ВІДНОВЛЕННЯ {page, y} НА POP
  const pendingRestoreY = useRef<number | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(scrollKey);

    if (navType === 'POP') {
      if (raw) {
        sessionStorage.removeItem(scrollKey);
        try {
          const saved = JSON.parse(raw) as { y?: number; page?: number };
          const y = Number(saved?.y) || 0;
          const targetPage = Math.min(Math.max(saved?.page ?? 1, 1), totalPages || 1);

          if (targetPage !== page) {
            pendingRestoreY.current = y;
            setPage(targetPage);
          } else {
            requestAnimationFrame(() =>
              window.scrollTo({ top: y, left: 0, behavior: 'auto' })
            );
          }
        } catch {
          const y = Number(raw) || 0;
          requestAnimationFrame(() =>
            window.scrollTo({ top: y, left: 0, behavior: 'auto' })
          );
        }
      } else {
        // POP між ?page=... → позиції немає → показуємо з хедера
        scrollToTopSync();
      }
    } else {
      // non-POP
      if (raw) sessionStorage.removeItem(scrollKey);
    }
  }, [scrollKey, navType, page, totalPages]);

  // коли після POP ми змінили page — відновлюємо скрол після рендера потрібної сторінки
  useEffect(() => {
    if (navType === 'POP' && pendingRestoreY.current !== null) {
      const y = pendingRestoreY.current;
      pendingRestoreY.current = null;
      requestAnimationFrame(() =>
        window.scrollTo({ top: y, left: 0, behavior: 'auto' })
      );
    }
  }, [page, navType]);

  // СКРОЛ НА ВЕРХ ПРИ ЗМІНІ СТОРІНКИ (не POP)
  const prevPageRef = useRef(page);
  useLayoutEffect(() => {
    const changed = prevPageRef.current !== page;
    if (changed && navType !== 'POP') {
      scrollToTopSync(); // клік по пагінації → одразу з самого верху (від хедера)
    }
    prevPageRef.current = page;
  }, [page, navType]);

  // Керування loading (окремо від скролу)
  useEffect(() => {
    setHasError(false);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [page, selectedDistrict]);

  // рендер
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 gap-y-5 mb-[30px] xl:grid-cols-2 xl:gap-x-[40px] xl:gap-y-[40px] xl:mb-[58px]">
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <SpecialistCardSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );

  let content: ReactNode;
  if (hasError) content = <StateDisplay type="error" />;
  else if (loading) content = renderSkeletons();
  else if (specialistsToShow.length === 0) content = <StateDisplay type="empty" />;
  else content = <SpecialistsList specialists={specialistsToShow} />;

  return (
    <div className="w-full max-w-[375px] xl:max-w-[1280px] mx-auto px-[15px] pt-[39px] xl:px-30 xl:pt-[69px]">
      <BackButton />
      {!loading && !hasError && specialistsToShow.length > 0 && (
        <h1 className="font-semibold text-sm xl:text-xl text-fire mb-[25px] xl:mb-5">
          Ми знайшли фахівців для вашого{' '}
          <span className="whitespace-nowrap inline-flex items-center gap-2">
            запиту
            <svg className="w-[15px] xl:w-[17px] h-[15px] fill-fire">
              <use href="/icons.svg#icon-two-paws-print" />
            </svg>
          </span>
        </h1>
      )}
      <div ref={listRef}>{content}</div>
      {!loading && !hasError && specialistsToShow.length > 0 && (
        <Pagination totalPages={totalPages} />
      )}
    </div>
  );
};

export default SearchSpecialistsPage;
