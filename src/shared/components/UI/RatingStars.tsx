type RatingProps = {
  rating?: number;
  size?: string; // tailwind class, e.g. "w-4 h-4"
  max?: number;
  className?: string;
  readOnly?: boolean;
  onRate?: (value: number) => void;
  labels?: string[];
};

const RatingStars = ({
  rating = 0,
  max = 5,
  size = 'w-4 h-4',
  className = '',
  readOnly = true,
  onRate,
  labels = [],
}: RatingProps) => {
  const handleClick = (index: number) => {
    if (!readOnly && onRate) {
      onRate(index + 1);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {Array.from({ length: max }).map((_, i) => {
        const fillPercent = Math.max(0, Math.min(1, rating - i)) * 100;
        const isInteractive = !readOnly;

        return (
          <div
            key={i}
            className="flex flex-col items-center gap-[6px] focus:outline-none focus:underline focus:text-fire transition-colors duration-300 ease-in-out"
            role={isInteractive ? 'button' : undefined}
            aria-label={
              isInteractive ? `Rate ${i + 1} out of ${max} stars` : undefined
            }
            aria-pressed={isInteractive ? i < rating : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            onKeyDown={
              isInteractive
                ? e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleClick(i);
                    }
                  }
                : undefined
            }
            onClick={() => isInteractive && handleClick(i)}
          >
            <span
              className={`relative inline-block ${
                isInteractive ? 'cursor-pointer' : ''
              }`}
            >
              <svg className={`${size} fill-none stroke-fire stroke-2`}>
                <use href="/icons.svg#icon-star" />
              </svg>

              <svg
                className={`${size} fill-fire stroke-fire absolute top-0 left-0 pointer-events-none transition-all duration-300 ease-in-out`}
                style={{
                  fill: 'var(--color-fire)',
                  maskImage: `linear-gradient(to right, black ${fillPercent}%, transparent ${fillPercent}%)`,
                  WebkitMaskImage: `linear-gradient(to right, black ${fillPercent}%, transparent ${fillPercent}%)`,
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                }}
              >
                <use href="/icons.svg#icon-star" />
              </svg>
            </span>

            {/* Label under each star*/}
            {!readOnly && <span>{labels[i]}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;
