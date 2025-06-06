import AnimalSelector from './AnimalSelector';
import DistrictSelector from './DistrictSelector';
import ServiceTypeSelector from './ServiceTypeSelector';
import WeightSelector from './WeightSelector';
import SearchButton from './SearchButton';
import { useAppSelector } from '@/shared/hooks';
import { selectAnimal } from '@/features/hero/heroSelectors';

const HeroFilters = () => {
  const selectedAnimal = useAppSelector(selectAnimal);
  return (
    <div className="relative bg-alabaster shadow-md rounded-[20px] py-4 px-8 w-full flex flex-col gap-[17px] -mt-212 z-10">
      <div className="flex justify-center gap-8">
        <AnimalSelector />
        <DistrictSelector />
      </div>
      <ServiceTypeSelector />
      <div className="flex justify-end gap-[40px] min-h-[68px]">
        {selectedAnimal === 'dog' && <WeightSelector />}
        <SearchButton />
      </div>
    </div>
  );
};

export default HeroFilters;
