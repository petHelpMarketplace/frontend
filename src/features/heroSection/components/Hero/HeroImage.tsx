type HeroImageProps = {
  className?: string;
};
const HeroImage = ({ className = '' }: HeroImageProps) => {
  return (
    <div
      className={`hidden xl:block absolute right-[51px] top-[49px] overflow-visible w-full max-w-[524px] max-h-[738px] ${className}`}
    >
      <img
        src="/images/hero-mops-1x.png"
        alt="Dog"
        className="relative z-50 w-full h-auto"
      />
    </div>
  );
};

export default HeroImage;
