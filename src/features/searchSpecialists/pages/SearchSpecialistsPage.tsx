import { useEffect, useMemo, useState } from 'react';
import {
  useLocation,
  useNavigationType,
  useSearchParams,
} from 'react-router-dom';
import Pagination from '@/features/searchSpecialists/components/Pagination';
import SpecialistsList from '@/features/searchSpecialists/components/SpecialistsList';
import { mockSpecialists } from '@/data/mockSpecialists';
import BackButton from '@/features/searchSpecialists/components/BackButton';
import StateDisplay from '@/features/searchSpecialists/components/StateDisplay';
import SpecialistCardSkeleton from '@/features/searchSpecialists/components/SpecialistCardSkeleton';

const specialistsPerPage = 16;

const SearchSpecialistsPage = () => {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP' | 'PUSH' | 'REPLACE'
  const [searchParams] = useSearchParams();

  // ---- filters from URL ----
  const selectedDistrict = searchParams.get('district') || '';

  // ---- derive data ----
  const filteredSpecialists = useMemo(
    () =>
      selectedDistrict
        ? mockSpecialists.filter(s => s.district === selectedDistrict)
        : mockSpecialists,
    [selectedDistrict]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSpecialists.length / specialistsPerPage)
  );

  // ---- page comes ONLY from URL ----
  const currentPage = (() => {
    const raw = Number(searchParams.get('page')) || 1;
    return Math.min(Math.max(raw, 1), totalPages);
  })();

  const specialistsToShow = useMemo(
    () =>
      filteredSpecialists.slice(
        (currentPage - 1) * specialistsPerPage,
        currentPage * specialistsPerPage
      ),
    [filteredSpecialists, currentPage]
  );

  // ---- UI state ----
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(16);

  // ---- scroll restore key (враховує фільтри і сторінку) ----
  const scrollKey = useMemo(
    () => `scroll:/specialists${location.search || ''}`,
    [location.search]
  );

  // ---- responsive skeletons ----
  useEffect(() => {
    const apply = () => setSkeletonCount(window.innerWidth < 768 ? 2 : 4);
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  // ---- scroll behavior ----
  useEffect(() => {
    const raw = sessionStorage.getItem(scrollKey);

    if (navType === 'POP') {
      // повернення по історії — пробуємо відновити точну позицію
      if (raw) {
        sessionStorage.removeItem(scrollKey);
        try {
          const saved = JSON.parse(raw) as { y?: number };
          const y = Number(saved?.y) || 0;
          requestAnimationFrame(() =>
            window.scrollTo({ top: y, left: 0, behavior: 'auto' })
          );
        } catch {
          const y = Number(raw) || 0;
          requestAnimationFrame(() =>
            window.scrollTo({ top: y, left: 0, behavior: 'auto' })
          );
        }
      } else {
        // не зберігали — просто зверху
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    } else {
      // будь-який не-POP вхід — зверху
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      if (raw) sessionStorage.removeItem(scrollKey);
    }
  }, [scrollKey, navType]);

  // зберігаємо позицію при виході зі сторінки списку
  useEffect(() => {
    return () => {
      sessionStorage.setItem(scrollKey, JSON.stringify({ y: window.scrollY }));
    };
  }, [scrollKey]);

  // ---- loading imitation ----
  useEffect(() => {
    setHasError(false);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [currentPage, selectedDistrict]);

  // ---- render helpers ----
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 gap-y-5 mb-[30px] xl:grid-cols-2 xl:gap-x-[40px] xl:gap-y-[40px] xl:mb-[58px]">
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <SpecialistCardSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );

  let content;
  if (hasError) content = <StateDisplay type="error" />;
  else if (loading) content = renderSkeletons();
  else if (specialistsToShow.length === 0)
    content = <StateDisplay type="empty" />;
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
