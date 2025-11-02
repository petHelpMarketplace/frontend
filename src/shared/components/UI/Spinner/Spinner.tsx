import { useEffect, useState } from 'react';

interface SpinnerProps {
  fallbackHeight?: string;
  size?: number; // загальний розмір кола спінера
  boneWidth?: number;
  boneHeight?: number;
  animationInterval?: number; // мілісекунд
}

const Spinner = ({
  fallbackHeight = '80vh',
  size = 156,
  boneWidth = 20,
  boneHeight = 34,
  animationInterval = 75,
}: SpinnerProps) => {
  const bonesCount = 8;
  const radius = size / 2 - boneHeight / 1.3;
  const [step, setStep] = useState(0);

  const minOpacity = 0.3;
  const maxOpacity = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % bonesCount);
    }, animationInterval);

    return () => clearInterval(interval);
  }, [animationInterval, bonesCount]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: fallbackHeight,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Loading"
      >
        <g transform={`translate(${size / 2.35},${size / 2.5})`}>
          {Array.from({ length: bonesCount }).map((_, i) => {
            const angle = (360 / bonesCount) * i;

            // Відносна позиція кістки щодо поточного кроку
            const relativeIndex = (i - step + bonesCount) % bonesCount;

            // Прозорість від max до min по колу
            const opacity =
              minOpacity +
              (maxOpacity - minOpacity) *
                ((bonesCount - relativeIndex) / bonesCount);

            return (
              <use
                key={i}
                href="/icons.svg#icon-bone"
                width={boneWidth}
                height={boneHeight}
                transform={`rotate(${angle}) translate(0, -${radius})`}
                fill="#CF5600"
                opacity={opacity}
                style={{
                  transformOrigin: `${boneWidth / 2}px ${boneHeight / 2}px`,
                }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default Spinner;
