import mockProfileData from '@/data/__mocks__/mockProfileData';

const SpecialistInfo = () => {
  const { avatar, name, joinDate, experience, rating, reviewsCount } =
    mockProfileData;

  return (
    <>
      <div className="flex xl:flex-col gap-2.5 xl:gap-6">
        <div className="flex items-center justify-center w-[96px] xl:w-[272px] h-[96px] xl:h-[364px] rounded-2xl overflow-hidden">
          <img
            src={avatar || '/booking-img/default-specialist-avatar.png'}
            alt={`Фото ${name}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 xl:gap-5 xl:items-center justify-center xl:mb-5">
          <div className="flex gap-3 items-center">
            <p className="text-lg xl:text-xl font-semibold text-fire leading-[122%] xl:leading-none">
              {name}
            </p>
            <svg className="w-4 xl:w-5 h-4 xl:h-5 fill-fire" role="img">
              <title>Верифікований фахівець</title>
              <use href="/icons.svg#icon-verified" />
            </svg>
          </div>
          <div className="xl:hidden flex items-center min-h-[27px]">
            {reviewsCount && reviewsCount > 0 && typeof rating === 'number' ? (
              <>
                <span className="text-lg text-fire font-semibold mr-1">
                  {rating.toFixed(1)}
                </span>
                <svg
                  className="w-4 h-4 fill-fire mr-1.5"
                  aria-label="Зірка рейтингу"
                  role="img"
                >
                  <use href="/icons.svg#icon-star" />
                </svg>
                <span className="text-sm text-cod-gray">
                  ({reviewsCount} відгуків)
                </span>
              </>
            ) : (
              <span className="text-base text-gray-400 italic">
                Ще не оцінено
              </span>
            )}
          </div>
          <p className="hidden xl:block">На сайті з {joinDate}</p>
          <p className="text-mineShaft text-sm xl:text-base">
            <span className="font-semibold">Досвід:</span> {experience}
          </p>
        </div>
      </div>
      <div className="hidden xl:block border border-fire rounded-2xl mb-5"></div>
    </>
  );
};

export default SpecialistInfo;
