type BurgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const BurgerButton = ({ isOpen, onClick }: BurgerButtonProps) => (
  <button
    type="button"
    aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
    aria-expanded={isOpen ? 'true' : 'false'}
    aria-haspopup="menu"
    onClick={onClick}
    className="flex items-center justify-center rounded-full bg-alabaster"
  >
    {!isOpen ? (
      <svg className="w-4 h-2.5 fill-fire">
        <use href="/icons.svg#icon-burger-menu" />
      </svg>
    ) : (
      <svg className="w-3.5 h-3.5 fill-fire shadow-inset-thin [stroke-width:1.5]">
        <use href="/icons.svg#icon-close-btn" />
      </svg>
    )}
  </button>
);
export default BurgerButton;
