import mockProfileData from '@/data/__mocks__/mockProfileData';

const SpecialistInfo = () => {
  const { avatar, name, joinDate, experience } = mockProfileData;

  return (
    <div className="xl:w-[304px] xl:px-4 pt-4 pb-[15px] box-border rounded-2xl shadow-[0_1px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-center w-[274px] h-[364px] mb-[30px] rounded-2xl overflow-hidden">
        <img
          src={avatar || '/booking-img/default-specialist-avatar.png'}
          alt={`Фото ${name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="flex gap-3 items-center">
          <p className="text-xl font-semibold text-fire leading-[135%] ">
            {name}
          </p>
          <svg className="w-5 h-5 fill-fire" role="img">
            <title>Верифікований фахівець</title>
            <use href="/icons.svg#icon-verified" />
          </svg>
        </div>
        <p>На сайті з {joinDate}</p>
        <p className="text-mineShaft">
          <span className="font-semibold">Досвід:</span> {experience}
        </p>
      </div>
    </div>
  );
};

export default SpecialistInfo;
