import HeroImage from '@/features/heroSection/components/Hero/HeroImage';
import HeroFilters from '@/features/heroSection/components/Hero/HeroFilters';
import DogWithBlob from '@/features/heroSection/components/Hero/HeroBlob';
import HeroTitle from '@/features/heroSection/components/Hero/HeroTitle';
import { useAppSelector } from '@/shared/hooks';
import { selectAnimal } from '@/features/heroSection/hooks/heroSelectors';

const HeroSection = () => {
  const selectedAnimal = useAppSelector(selectAnimal);

  const heightClass =
    selectedAnimal === 'cat' ? 'h-[666px] xl:h-180' : 'h-[794px] xl:h-180';

  return (
    <section
      className={`relative w-full max-w-[375px] xl:max-w-[1280px] mx-auto rounded-b-[40px] -mt-[56px] xl:-mt-20 px-[15px] pt-0 xl:py-12 xl:px-30 bg-hero-gradient ${heightClass}`}
    >
      <div className="flex xl:flex-row items-start xl:items-center">
        <HeroTitle />
        <HeroImage />
      </div>
      <DogWithBlob />
      <HeroFilters />
    </section>
  );
};

export default HeroSection;
