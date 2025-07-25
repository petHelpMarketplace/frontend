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
    <div className="flex justify-center bg-alabaster w-full xl:w-1/2 xl:h-[48px] ">
      {(['dog', 'cat'] as const).map(animal => (
        <button
          key={animal}
          onClick={() => handleSelect(animal)}
          tabIndex={0}
          className={`px-4 flex-1 h-[47px] xl:h-[48px] xl:w-1/2 py-[13px] font-semibold transition hover:shadow-shark focus:shadow-shark focus:outline-none active:shadow-inset-shark border-[2px] border-tenn ${
            selectedAnimal === animal
              ? `bg-tenn text-alabaster ${
                  animal === 'dog'
                    ? 'rounded-l-[15px] xl:rounded-l-[16px]'
                    : 'rounded-r-[15px] xl:rounded-r-[16px]'
                }`
              : `text-fire border-[2px] border-tenn ${
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
