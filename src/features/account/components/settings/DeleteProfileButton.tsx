// import { useState } from 'react';

import { twMerge } from 'tailwind-merge';

const DeleteProfileButton = () => {
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const handleOpenModal = () => {
  //   setIsDeleteModalOpen(true);
  //   console.log('Модалка має відкритися');
  // };

  return (
    <button
      type="button"
      className={twMerge(
        'btn',
        'xl:w-2/3 flex gap-4 items-center justify-center'
      )}
      // onClick={handleOpenModal}
    >
      <svg
        className="w-4.5 h-4.5 fill-alabaster"
        aria-label="Видалити профіль"
        focusable="false"
        aria-hidden="true"
      >
        <use href="/icons.svg#icon-delete" />
      </svg>
      Видалити профіль
    </button>
  );
};

export default DeleteProfileButton;
