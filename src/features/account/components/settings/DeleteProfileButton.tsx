import { useState } from 'react';

const DeleteProfileButton = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsDeleteModalOpen(true);
    console.log('Модалка має відкритися');
  };

  return (
    <button
      type="button"
      className="xl:w-2/3 xl:h-12 flex gap-4 items-center justify-center btn bg-tenn text-alabaster rounded-2xl"
      onClick={handleOpenModal}
    >
      <svg
        role="image"
        className="w-4.5 h-4.5 fill-alabaster"
        aria-label="Видалити профіль"
      >
        <use href="/icons.svg#icon-delete" />
      </svg>
      Видалити профіль
    </button>
  );
};

export default DeleteProfileButton;
