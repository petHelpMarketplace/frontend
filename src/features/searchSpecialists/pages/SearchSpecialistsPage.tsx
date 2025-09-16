import { useState, useEffect, useRef, useMemo, type ReactNode } from 'react';
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

  // ключ для sessionStorage (враховує фільтри з URL)
  const scrollKey = useMemo(
    () => `scroll:/specialists${location.search || ''}`,
    [location.search]
  );

  const filteredSpecialists = selectedDistrict
    ? mockSpecialists.filter(s => s.district === selectedDistrict)
    : mockSpecialists;

  const totalPages = Math.ceil(filteredSpecialists.length / specialistsPerPage) || 1;

  const getPageFromSearch = () => {
    const p = Number(new URLSearchParams(location.search).get('page')) || 1;
    return Math.min(Math.max(p, 1), totalPages || 1);
  };

  // page — truth із URL
  const [page, setPage] = useState(getPageFromSearch());

  // тримаємо page у синхроні з URL
  useEffect(() => {
    const p = getPageFromSearch();
    if (p !== page) setPage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, totalPages]);

  // при зміні district — завжди -> ?page=1 (replace)
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    if (sp.get('page') !== '1') {
      sp.set('page', '1');
      navigate({ pathname: location.pathname, search: `?${sp.toString()}` }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict]);

  // поточний зріз
  const specialistsToShow = filteredSpecialists.slice(
    (page - 1) * specialistsPerPage,
    page * specialistsPerPage
  );

  // скелетони під ширину
  useEffect(() => {
    const apply = () => setSkeletonCount(window.innerWidth < 768 ? 2 : 4);
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  // ---------- POP-відновлення ----------
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
        // POP без збереженої позиції — зверху
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    } else {
      // на будь-який НЕ-POP захід на список — зверху
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      if (raw) sessionStorage.removeItem(scrollKey);
    }
  }, [scrollKey, navType, page, totalPages]);

  // після зміни page на POP — доскролити у збережену позицію
  useEffect(() => {
    if (navType === 'POP' && pendingRestoreY.current !== null) {
      const y = pendingRestoreY.current;
      pendingRestoreY.current = null;
      requestAnimationFrame(() =>
        window.scrollTo({ top: y, left: 0, behavior: 'auto' })
      );
    }
  }, [page, navType]);

  // індикатор завантаження
  useEffect(() => {
    setHasError(false);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [page, selectedDistrict]);

  // збереження позиції при виході зі сторінки списку
  useEffect(() => {
    return () => {
      sessionStorage.setItem(scrollKey, JSON.stringify({ y: window.scrollY, page }));
    };
  }, [scrollKey, page]);

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
      <div>{content}</div>
      {!loading && !hasError && specialistsToShow.length > 0 && (
        <Pagination totalPages={totalPages} />
      )}
    </div>
  );
};

export default SearchSpecialistsPage;
