import AnimalSelector from '@/features/heroSection/components/Hero/AnimalSelector';
import DistrictSelector from '@/features/heroSection/components/Hero/DistrictSelector';
import ServiceTypeSelector from '@/features/heroSection/components/Hero/ServiceTypeSelector';
import WeightSelector from '@/features/heroSection/components/Hero/WeightSelector';
import SearchButton from '@/features/heroSection/components/Hero/SearchButton';
import { useAppSelector } from '@/shared/hooks';
import { selectAnimal } from '@/features/heroSection/hooks/heroSelectors';
import { useState } from 'react';

const HeroFilters = () => {
  const selectedAnimal = useAppSelector(selectAnimal);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const heightClass =
    selectedAnimal === 'cat' ? 'max-h-[416px]' : 'max-h-[622px]';
  const mobileBottomPadding =
    selectedAnimal === 'dog' ? 'pb-[77px]' : 'pb-[27px]';

  return (
    <div
      className={`absolute bg-alabaster shadow-box rounded-[25px] xl:rounded-2xl py-[27px] px-4.5 xl:py-5 xl:px-8 xl:w-[1040px] mx-auto xl:max-h-[298px] flex flex-col xl:gap-3.5 xl:mb-0 xl:-mt-212 z-10 left-1/2 -translate-x-1/2 ${heightClass} ${mobileBottomPadding}`}
    >
      <div className="flex flex-col xl:flex-row xl:justify-center gap-[13px] xl:gap-8 mb-[38px] xl:mb-0">
        <AnimalSelector />
        <DistrictSelector
          selected={selectedDistrict}
          setSelected={setSelectedDistrict}
        />
      </div>
      <ServiceTypeSelector />
      <div className="flex flex-col xl:flex-row justify-center xl:justify-end xl:gap-10 xl:min-h-[68px] xl:ml-auto">
        {selectedAnimal === 'dog' && <WeightSelector />}
        <SearchButton selected={selectedDistrict} />
      </div>
    </div>
  );
};

export default HeroFilters;
