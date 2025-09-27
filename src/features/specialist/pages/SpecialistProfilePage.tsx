import { useEffect, useRef } from 'react';
import { SpecialistProfileHeader } from '../components/SpecialistProfileHeader';
import { SpecialistPetsCarousel } from '../components/SpecialistPetsCarousel';
import SpecialistReviewsSection from '../components/SpecialistReviewsSection';
import mockProfileData from '../../../data/__mocks__/mockProfileData';
import BackButton from '@/shared/components/UI/BackButton';

const SpecialistProfilePage = () => {
  const regionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // A11y: фокус на заголовок (після рендера)
    requestAnimationFrame(() => regionRef.current?.focus());
  }, []);
  
  return (
    <div className="mx-auto px-[120px] pt-17 pb-30 max-w-[1280px]">
      <div 
        ref={regionRef}
        tabIndex={-1}
        className="flex mb-12">
        <BackButton />
        <h1 className="sr-only flex text-5xl uppercase mx-auto text-center">
          Сторінка фахівця
        </h1>
      </div>
      <SpecialistProfileHeader profile={mockProfileData} />
      <SpecialistPetsCarousel images={mockProfileData} />
      <SpecialistReviewsSection />
    </div>
  );
};

export default SpecialistProfilePage;
