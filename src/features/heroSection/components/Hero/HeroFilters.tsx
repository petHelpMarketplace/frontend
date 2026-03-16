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

  return (
    <div
      className={`bg-alabaster shadow-box absolute left-1/2 z-20 mx-auto flex -translate-x-1/2 flex-col rounded-[25px] px-4.5 py-7 xl:top-[476px] xl:z-60 xl:mb-0 xl:max-h-[298px] xl:w-[1040px] xl:gap-3.5 xl:rounded-2xl xl:px-8 xl:py-5`}
    >
      <div className="mb-[38px] flex flex-col gap-[13px] xl:mb-0 xl:flex-row xl:justify-center xl:gap-8">
        <AnimalSelector />
        <DistrictSelector
          selected={selectedDistrict}
          setSelected={setSelectedDistrict}
        />
      </div>
      <ServiceTypeSelector />
      <div className="flex flex-col justify-center xl:ml-auto xl:min-h-[68px] xl:flex-row xl:justify-end xl:gap-10">
        {selectedAnimal === 1 && <WeightSelector />}
        <SearchButton selected={selectedDistrict} />
      </div>
    </div>
  );
};

export default HeroFilters;
