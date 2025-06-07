const ErrorIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={`absolute right-[19px] top-[-7px] w-4 h-4 fill-red-tenn bg-alabaster border-l border-r border-alabaster box-content ${className}`}
  >
    <use href="/icons.svg#icon-alert-circle" x="0.5" />
  </svg>
);

export default ErrorIcon;
