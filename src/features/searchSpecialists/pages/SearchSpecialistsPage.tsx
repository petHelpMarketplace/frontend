import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/features/searchSpecialists/components/Pagination';
import SpecialistsList from '@/features/searchSpecialists/components/SpecialistsList';
import { mockSpecialists } from '@/data/mockSpecialists';
import BackButton from '@/features/searchSpecialists/components/BackButton';
import StateDisplay from '@/features/searchSpecialists/components/StateDisplay';
import SpecialistCardSkeleton from '@/features/searchSpecialists/components/SpecialistCardSkeleton';
const SearchSpecialistsPage = () => {
  const specialistsPerPage = 16;
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(16);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const listRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.ceil(mockSpecialists.length / specialistsPerPage);

  const specialistsToShow = mockSpecialists.slice(
    (page - 1) * specialistsPerPage,
    page * specialistsPerPage
  );
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) setSkeletonCount(2);
      else if (width < 1280) setSkeletonCount(4);
      else setSkeletonCount(4);
    }
  }, []);
  useEffect(() => {
    setLoading(true);
    setHasError(false);

    if (!isFirstRender) {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsFirstRender(false);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [page]);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 gap-y-5 mb-[30px] xl:grid-cols-2 xl:gap-x-[40px] xl:gap-y-[40px] xl:mb-[58px]">
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <SpecialistCardSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );

  let content;

  if (hasError) {
    content = <StateDisplay type="error" />;
  } else if (loading) {
    content = renderSkeletons();
  } else if (specialistsToShow.length === 0) {
    content = <StateDisplay type="empty" />;
  } else {
    content = <SpecialistsList specialists={specialistsToShow} />;
  }

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
