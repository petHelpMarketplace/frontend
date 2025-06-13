import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '@/features/searchSpecialists/components/Pagination';
import SpecialistsList from '@/features/searchSpecialists/components/SpecialistsList';
import { mockSpecialists } from '@/data/mockSpecialists';
import BackButton from '@/features/searchSpecialists/components/BackButton';
import StateDisplay from '@/features/searchSpecialists/components/StateDisplay';
import SpecialistCardSkeleton from '@/features/searchSpecialists/components/SpecialistCardSkeleton';
const SearchSpecialistsPage = () => {
  // Дістаємо district з query params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedDistrict = params.get('district') || '';
  const specialistsPerPage = 16;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(16);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const listRef = useRef<HTMLDivElement | null>(null);

  const filteredSpecialists = selectedDistrict
    ? mockSpecialists.filter(s => s.district === selectedDistrict)
    : mockSpecialists;
  const totalPages = Math.ceil(filteredSpecialists.length / specialistsPerPage);

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

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const renderSkeletons = () => (
    <div className="grid grid-cols-2 gap-x-[40px] gap-y-[40px] mb-[58px]">
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
    <div className="max-w-[1040px] mx-auto pt-[47px] pb-[58px]">
      <BackButton />
      {!loading && !hasError && specialistsToShow.length > 0 && (
        <h1 className="flex items-center gap-2 font-semibold text-xl text-fire mb-5">
          Ми знайшли фахівців для вашого запиту
          <svg className="w-[17px] h-[15px] fill-fire">
            <use href="/icons.svg#icon-two-paws-print" />
          </svg>
        </h1>
      )}
      <div ref={listRef}>{content}</div>
      {!loading && !hasError && specialistsToShow.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={handleChangePage}
        />
      )}
    </div>
  );
};

export default SearchSpecialistsPage;
