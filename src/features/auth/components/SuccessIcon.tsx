const SuccessIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={`absolute right-[19px] top-[-7px] w-4 h-4 fill-tenn bg-alabaster border-l border-r border-alabaster box-content ${className}`}
  >
    <use href="/icons.svg#icon-success" />
  </svg>
);

export default SuccessIcon;
