import { Specialist } from '@/features/searchSpecialists/types/specialist';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/shared/components/UI/Button';
import Bio from '@/features/searchSpecialists/components/Bio';
import { useState } from 'react';

type Props = {
  specialist: Specialist;
};

const SpecialistCard = ({ specialist }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = `${location.pathname}${location.search}`; 
  const {
    id,
    name,
    family_name,
    rating,
    reviews_count,
    experience,
    is_verified,
    image_id,
    avatar,
    bio,
  } = specialist;

  const [hasImageError, setHasImageError] = useState(false);
  const imageBase = image_id?.[0]?.trim();
  const hasImageBase = imageBase && imageBase.length > 0;
  const imageSrc = avatar?.trim()
    ? avatar
    : hasImageBase
    ? `/imagesSpecialists/${imageBase}-1x.webp`
    : '/placeholder.webp';
  const shortFamilyName = family_name ? `${family_name[0]}.` : '';
  const renderExperience = () => {
    if (experience === 0) return 'Менше року';
    if (experience === 1) return '1 рік';
    if (experience > 1 && experience < 5) return `${experience} роки`;
    return `${experience} років`;
  };

  return (
    <div
      className="h-full w-full max-w-full grid 
    bg-alabaster rounded-2xl shadow-smoke
    px-5 py-[12px] xl:p-5 gap-x-[10px] gap-y-[12px] xl:gap-6
    [grid-template-areas:'photo_text'_'btn_btn']
    [grid-template-rows:96px_auto] xl:[grid-template-rows:auto]
    xl:[grid-template-areas:'photo text']
    [grid-template-columns:96px_minmax(0,1fr)]
    xl:[grid-template-columns:236px_minmax(0,1fr)]
    xl:max-w-[500px] max-h-[400px] "
    >
      {/* Фото */}
      <div className="[grid-area:photo] max-w-[96px] h-[96px] xl:max-w-[236px] xl:h-[360px] rounded-2xl overflow-hidden flex items-center justify-center bg-alabaster">
        {/* На мобілці — SVG-іконка зі спрайта */}
        {hasImageError || !hasImageBase ? (
          <>
            {/* Мобілка: png */}
            <img
              src="/placeholder-mobile.webp"
              alt="Плейсхолдер"
              className="block xl:hidden w-full h-full object-contain"
              loading="lazy"
            />
            {/* На десктопі — fallback картинка */}
            <img
              src="/placeholder.webp"
              alt="Плейсхолдер"
              className="hidden xl:block w-full h-full object-cover"
            />
          </>
        ) : (
          <picture className="w-full h-full">
            <source
              srcSet={`/imagesSpecialists/${imageBase}-2x.webp 2x, /imagesSpecialists/${imageBase}-1x.webp 1x`}
              type="image/webp"
            />
            <img
              src={imageSrc}
              alt={`${name} ${family_name}`}
              className="w-full h-full object-cover object-top"
              onError={e => {
                setHasImageError(true);
                e.currentTarget.onerror = null;
              }}
              loading="lazy"
            />
          </picture>
        )}
      </div>

      {/* Контент */}
      <div className="[grid-area:text] flex flex-col h-full">
        <div className="flex flex-col gap-[13px] only:gap-0 xl:gap-[18px] xl:mb-[30px] flex-grow">
          {/* Ім’я + іконка */}
          <div className="flex items-center">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <div className="text-lg font-semibold text-fire leading-[122%] xl:leading-[150%]">
                {name} {shortFamilyName}
              </div>
              {is_verified && (
                <svg
                  className="w-[17px] h-[17px] fill-fire shrink-0"
                  aria-label="Перевірений фахівець"
                  role="img"
                >
                  <use href="/icons.svg#icon-verified" />
                </svg>
              )}
            </span>
          </div>

          {/* Рейтинг і відгуки */}
          <div className="flex items-center min-h-[27px]">
            {reviews_count &&
            reviews_count > 0 &&
            typeof rating === 'number' ? (
              <>
                <span className="text-lg text-fire font-semibold mr-[5px]">
                  {rating.toFixed(1)}
                </span>
                <svg
                  className="w-4 h-4 fill-fire mr-[12px]"
                  aria-label="Зірка рейтингу"
                  role="img"
                >
                  <use href="/icons.svg#icon-star" />
                </svg>
                <span className="text-sm text-cod-gray">
                  ({reviews_count} відгуків)
                </span>
              </>
            ) : (
              <span className="text-base text-gray-400 italic">
                Ще не оцінено
              </span>
            )}
          </div>

          {/* Досвід */}
          <p className="text-sm text-cod-gray">
            <span className="font-semibold">Досвід:</span>{' '}
            <span className="font-normal">{renderExperience()}</span>
          </p>

          {/* Bio */}
          <div className="hidden xl:block">
            <Bio text={bio ?? null} />
          </div>
        </div>

        {/* Кнопка для десктопу*/}
        <Button
          label="Відкрити профіль"
          type="button"
          onClick={() => navigate(`/specialists/${id}`, {state: {from}})}
          className="hidden xl:block max-w-[304px] max-h-[40px] w-full mt-auto  xl:min-w-[200px] xl:h-[40px] whitespace-nowrap text-sm xl:text-base font-normal text-alabaster text-center rounded-2xl bg-tenn hover:shadow-shark active:shadow-inset-shark focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-tenn overflow-hidden text-ellipsis"
          aria-label={`Відкрити профіль ${name} ${family_name}`}
        />
      </div>
      {/* Кнопка для мобілки*/}
      <Button
        label="Відкрити профіль"
        type="button"
        onClick={() => navigate(`/specialists/${id}`, {state: {from}})}
        className="xl:hidden [grid-area:btn] max-w-[304px] w-full min-h-[35px] mt-auto xl:min-w-[200px] h-[40px] whitespace-nowrap text-sm xl:text-base font-normal text-alabaster text-center rounded-2xl bg-tenn hover:shadow-shark active:shadow-inset-shark focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-tenn  overflow-hidden text-ellipsis"
        aria-label={`Відкрити профіль ${name} ${family_name}`}
      />
    </div>
  );
};

export default SpecialistCard;
