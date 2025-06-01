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
        className="flex flex-1 items-center justify-center text-[20px] max-w-[304px] h-auto px-6 py-4 rounded-[16px] hover:shadow-shark active:shadow-inset-shark"
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
