import RegisterForm from '@/features/auth/components/RegisterForm';
import Modal from '@/shared/components/UI/Modal';
import Button from '@/shared/components/UI/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchButtonProps = {
  selected: string;
};

const SearchButton = ({ selected }: SearchButtonProps) => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Button
        label="Пошук"
        type="button"
        onClick={() =>
          navigate(
            selected
              ? `/specialists?district=${encodeURIComponent(selected)}`
              : '/specialists'
          )
        }
        className="flex flex-1 w-full items-center justify-center text-xl xl:text-[22px] btn-2lg xl:px-6 xl:py-4 rounded-[15px] xl:rounded-2xl"
      />
      <Modal
        isOpen={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
      >
        <RegisterForm onOpenLogin={() => setOpenRegisterModal(false)} />
      </Modal>
    </>
  );
};

export default SearchButton;
