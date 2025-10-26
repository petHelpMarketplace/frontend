import boneImg from './bone.png';
interface SpinnerProps {
  width?: string;
  height?: string;
  fallbackHeight?: string;
}

const Spinner = ({
  width = '80px',
  height = '80px',
  fallbackHeight = '80vh',
}: SpinnerProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: fallbackHeight,
      }}
    >
      <img
        src={boneImg}
        alt="Loading..."
        className="animate-spin"
        style={{
          width,
          height,
          animationDuration: '1s',
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
};

export default Spinner;
