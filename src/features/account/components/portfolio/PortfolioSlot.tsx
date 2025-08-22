type PortfolioSlotProps = {
  photo?: string;
  onRemove?: () => void;
  onAdd?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAddSlot?: boolean;
};

export default function PortfolioSlot({
  photo,
  onRemove,
  onAdd,
  isAddSlot = false,
}: PortfolioSlotProps) {
  if (isAddSlot) {
    return (
      <label
        title="Додати фото"
        className="relative w-full aspect-square border-2 border-fire rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition"
      >
        <svg className={`w-20 h-18 fill-fire`}>
          <use href="/icons.svg#icon-photo-add" />
        </svg>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onAdd}
          className="hidden"
        />
      </label>
    );
  }

  if (photo) {
    return (
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden group hover:brightness-80 transition duration-300 easy-in-out">
        <label
          title="Редагувати фото"
          className="absolute w-full aspect-square flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition"
        >
          <svg className="w-20 h-18 fill-alabaster opacity-0 group-hover:opacity-100 transition-opacity duration-300 easy-in-out">
            <use href="/icons.svg#icon-photo-change" />
          </svg>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onAdd}
            className="hidden"
          />
        </label>
        <img
          src={photo}
          alt="Портфоліо фото"
          className="object-cover w-full h-full"
        />
        <button
          type="button"
          onClick={onRemove}
          title="Видалити фото"
          className="absolute top-1.5 right-1.5 p-1 rounded-full hover:scale-115 transition duration-300 ease-in-out"
          aria-label="Видалити фото"
        >
          <svg className="w-5 h-5 fill-alabaster">
            <use href="/icons.svg#icon-minus" />
          </svg>
        </button>
      </div>
    );
  }

  // Порожнє місце без функціоналу
  return (
    <div className="w-42 aspect-square border-2 border-fire/50 rounded-2xl" />
  );
}
