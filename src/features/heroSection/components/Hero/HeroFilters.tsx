import AnimalSelector from '@/features/heroSection/components/Hero/AnimalSelector';
import DistrictSelector from '@/features/heroSection/components/Hero/DistrictSelector';
import ServiceTypeSelector from '@/features/heroSection/components/Hero/ServiceTypeSelector';
import WeightSelector from '@/features/heroSection/components/Hero/WeightSelector';
import SearchButton from '@/features/heroSection/components/Hero/SearchButton';
import { useAppSelector } from '@/shared/hooks';
import { selectAnimal } from '@/features/heroSection/hooks/heroSelectors';

const HeroFilters = () => {
  const selectedAnimal = useAppSelector(selectAnimal);
  return (
    <div className="relative bg-alabaster shadow-box rounded-[25px] max-h-[622px] xl:rounded-2xl pt-[27px] pb-[77px] px-4.5 xl:py-4 xl:px-8 w-full mx-auto flex flex-col  xl:gap-3.5 mb-[-64px] xl:mb-0 xl:-mt-212 z-10">
      <div className="flex flex-col xl:flex-row xl:justify-center gap-[13px] xl:gap-8 mb-[37px] xl:mb-0">
        <AnimalSelector />
        <DistrictSelector />
      </div>
      <ServiceTypeSelector />
      <div className="flex flex-col  xl:flex-row mx-auto justify-center xl:justify-end xl:gap-10 xl:min-h-[68px]">
        {selectedAnimal === 'dog' && <WeightSelector />}
        <SearchButton />
      </div>
    </div>
  );
};

export default HeroFilters;
