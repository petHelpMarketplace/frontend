const SpecialistMenu = () => {
  return (
    <div className="flex gap-10">
      <button className="text-fire">Вийти</button>
      <button>
        <svg className="w-6 h-6 fill-fire">
          <use href="/icons.svg#icon-user" />
        </svg>
      </button>
    </div>
  );
};

export default SpecialistMenu;
