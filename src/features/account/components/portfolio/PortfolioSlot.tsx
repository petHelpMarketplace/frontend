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
      <label className="relative w-full aspect-square border-2 border-fire rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition">
        <svg className="w-12 h-12 fill-fire">
          <use href="/icons.svg#icon-acc-photo-add" />
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
      <div className="relative w-full aspect-square border-2 border-fire rounded-2xl overflow-hidden group">
        <img
          src={photo}
          alt="Портфоліо фото"
          className="object-cover w-full h-full"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/80 hover:bg-white transition"
          aria-label="Видалити фото"
        >
          <svg className="w-4 h-4 fill-fire">
            <use href="/icons.svg#icon-cross" />
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
