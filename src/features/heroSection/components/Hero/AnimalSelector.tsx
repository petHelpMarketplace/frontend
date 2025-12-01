// src/components/Hero/AnimalSelector.tsx
import { useAppDispatch, useAppSelector } from '@/shared/hooks/index';
import { setAnimal } from '@/features/heroSection/hooks/heroSlice';
import { selectAnimal } from '@/features/heroSection/hooks/heroSelectors';

const AnimalSelector = () => {
  const dispatch = useAppDispatch();
  const selectedAnimal = useAppSelector(selectAnimal);

  const handleSelect = (animal: 'dog' | 'cat') => {
    dispatch(setAnimal(animal));
  };

  return (
    <div className="bg-alabaster flex w-full justify-center xl:h-[48px] xl:w-1/2">
      {(['dog', 'cat'] as const).map(animal => (
        <button
          key={animal}
          id={`hero-filter-animal-${animal}`}
          onClick={() => handleSelect(animal)}
          tabIndex={0}
          className={`hover:shadow-shark focus:shadow-shark active:shadow-inset-shark border-tenn h-[47px] flex-1 border-[2px] px-4 py-[13px] font-semibold transition focus:outline-none xl:h-[48px] xl:w-1/2 ${
            selectedAnimal === animal
              ? `bg-tenn text-alabaster ${
                  animal === 'dog'
                    ? 'rounded-l-[15px] xl:rounded-l-[16px]'
                    : 'rounded-r-[15px] xl:rounded-r-[16px]'
                }`
              : `text-fire border-tenn border-[2px] ${
                  animal === 'dog' ? 'rounded-l-[15px]' : 'rounded-r-[15px]'
                }`
          }`}
        >
          {animal === 'dog' ? 'Собаки' : 'Коти'}
        </button>
      ))}
    </div>
  );
};

export default AnimalSelector;
