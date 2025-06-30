import HeroImage from '@/features/heroSection/components/Hero/HeroImage';
import HeroFilters from '@/features/heroSection/components/Hero/HeroFilters';
import DogWithBlob from '@/features/heroSection/components/Hero/HeroBlob';
import HeroTitle from '@/features/heroSection/components/Hero/HeroTitle';

const HeroSection = () => {
  return (
    <section className="relative w-full max-w-[375px] xl:max-w-[1280px] mx-auto min-h-[716px] xl:min-h-0 max-h-[922px] xl:max-h-165 rounded-b-[40px] z-10 -mt-[56px] xl:-mt-20 px-[15px] pt-0 xl:py-12 xl:px-30 xl:mb-40 bg-hero-gradient">
      <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center xl:justify-between">
        <HeroTitle />
        <HeroImage />
      </div>
      <DogWithBlob />
      <HeroFilters />
    </section>
  );
};

export default HeroSection;
