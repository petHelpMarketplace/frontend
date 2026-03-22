import RegisterForm from '@/features/auth/components/RegisterForm';
import Modal from '@/shared/components/UI/Modal';
import Button from '@/shared/components/UI/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchButtonProps = {
  selected: number | null;
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
        className="btn-2lg flex w-full flex-1 items-center justify-center rounded-[15px] text-xl xl:rounded-2xl xl:px-6 xl:py-4 xl:text-[22px]"
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
