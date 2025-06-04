import HeroImage from './Hero/HeroImage';
import HeroFilters from './Hero/HeroFilters';
import DogWithBlob from './Hero/HeroBlob';
import HeroTitle from './Hero/HeroTitle';

const HeroSection = () => {
  return (
    <section className="relative py-12 bg-gradient-to-bl from-red-beech via-tenn to-red-beech z-10 w-full rounded-b-[40px] max-w-[1280px] mx-auto -mt-20 px-30 max-h-165 mb-40">
      <div className="container relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between">
        <HeroTitle />
        <HeroImage />
      </div>
      <DogWithBlob />
      <HeroFilters />
    </section>
  );
};

export default HeroSection;
