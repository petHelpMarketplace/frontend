import HeroImage from './Hero/HeroImage';
import HeroFilters from './Hero/HeroFilters';
import DogWithBlob from './Hero/HeroBlob';
import HeroTitle from './Hero/HeroTitle';

const HeroSection = () => {
  return (
    <section className="relative w-full max-w-[375px] xl:max-w-[1280px] mx-auto max-h-[858px] xl:max-h-165 rounded-b-[40px] z-10 -mt-[56px] xl:-mt-20 px-[15px] pt-0 xl:py-12 xl:px-30 mb-0 xl:mb-40 bg-hero-gradient">
      <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center xl:justify-between">
        <HeroTitle />
        <HeroImage className="hidden xl:block" />
      </div>
      <DogWithBlob className="hidden xl:block" />
      <HeroFilters />
    </section>
  );
};

export default HeroSection;
