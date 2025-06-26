type DogWithBlobProps = {
  className?: string;
};
const DogWithBlob = ({ className = '' }: DogWithBlobProps) => {
  return (
    <img
      src="/images/blob-behind-dog.png"
      alt="Decorative blob behind dog"
      className={`hidden xl:block relative z-[1] w-auto h-auto -top-[784px] -right-[528px] ${className}`}
    />
  );
};

export default DogWithBlob;
