import RegisterForm from '@/features/auth/components/RegisterForm';
import Modal from '@/shared/components/UI/Modal';
import Button from '@/shared/components/UI/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchButton = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Button
        label="Пошук"
        type="button"
        onClick={() => navigate('/specialists')}
        className="flex xl:flex-1 items-center justify-center text-[22px] btn-2lg xl:px-6 xl:py-4 rounded-[15px] xl:rounded-2xl shadow-filter xl:shadow-none"
      />
      <Modal
        isOpen={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
      >
        <RegisterForm />
      </Modal>
    </>
  );
};

export default SearchButton;
