import Lottie from 'lottie-react';
import emptyAnimation from '@/features/searchSpecialists/animations/dog-in-the-box.json';
import errorAnimation from '@/features/searchSpecialists/animations/black-cat-error.json';

type StateType = 'empty' | 'error';

type Props = {
  type: StateType;
};

const config = {
  empty: {
    animationData: emptyAnimation,
    sizeMobile: 160,
    sizeDesktop: 200,
    message: (
      <>
        На жаль, ми не знайшли фахівців за вашим запитом.
        <br />
        Спробуйте змінити фільтри або ключові слова.
      </>
    ),
  },
  error: {
    animationData: errorAnimation,
    sizeMobile: 220,
    sizeDesktop: 300,
    message: <>Щось пішло не так. Спробуйте ще раз пізніше.</>,
  },
};

const StateDisplay = ({ type }: Props) => {
  const { animationData, sizeMobile, sizeDesktop, message } = config[type];

  return (
    <div className="flex flex-col items-center gap-6 my-6 xl:my-10 px-4 text-center">
      {/* Мобільна анімація */}
      <div
        className="block xl:hidden"
        style={{ width: sizeMobile, height: sizeMobile }}
      >
        <Lottie autoplay loop animationData={animationData} />
      </div>

      {/* Десктопна анімація */}
      <div
        className="hidden xl:block"
        style={{ width: sizeDesktop, height: sizeDesktop }}
      >
        <Lottie autoplay loop animationData={animationData} />
      </div>

      <div className="text-base xl:text-lg text-cod-gray">{message}</div>
    </div>
  );
};

export default StateDisplay;
