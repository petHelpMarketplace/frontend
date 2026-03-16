// src/components/Hero/AnimalSelector.tsx
import { useAppDispatch, useAppSelector } from '@/shared/hooks/index';
import { setAnimal } from '@/features/heroSection/hooks/heroSlice';
import { selectAnimal } from '@/features/heroSection/hooks/heroSelectors';
import { animals, AnimalCategoryId } from '@/shared/constants/animals';

const AnimalSelector = () => {
  const dispatch = useAppDispatch();
  const selectedAnimal = useAppSelector(selectAnimal);

  const handleSelect = (animalCategoryId: AnimalCategoryId) => {
    dispatch(setAnimal(animalCategoryId));
  };

  return (
    <div className="bg-alabaster flex w-full justify-center xl:h-[48px] xl:w-1/2">
      {animals.map((animal, index) => (
        <button
          key={animal.id}
          id={`hero-filter-animal-${animal.id}`}
          onClick={() => handleSelect(animal.id)}
          tabIndex={0}
          className={`hover:shadow-shark focus:shadow-shark active:shadow-inset-shark border-tenn h-[47px] flex-1 border-[2px] px-4 py-[13px] font-semibold transition focus:outline-none xl:h-[48px] xl:w-1/2 ${
            selectedAnimal === animal.id
              ? `bg-tenn text-alabaster ${
                  index === 0
                    ? 'rounded-l-[15px] xl:rounded-l-[16px]'
                    : 'rounded-r-[15px] xl:rounded-r-[16px]'
                }`
              : `text-fire border-tenn border-[2px] ${
                  index === 0 ? 'rounded-l-[15px]' : 'rounded-r-[15px]'
                }`
          }`}
        >
          {animal.label}
        </button>
      ))}
    </div>
  );
};

export default AnimalSelector;
