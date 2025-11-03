import { useState } from 'react';
import Logo from '@/shared/components/UI/Logo';
import { LangSwitch } from './LangSwitch';
import { Navigation } from './Navigation';
import GradientHeaderWrapper from '@/features/heroSection/components/Hero/GradientHeaderWrapper';
import { UserActions } from './UserActions';
import { useLocation } from 'react-router-dom';
import BurgerButton from '@/shared/components/Layout/Header/BurgerButton';
import LoginForm from '@/features/auth/components/LoginForm';
import RegisterForm from '@/features/auth/components/RegisterForm';
import MobileMenu from '@/shared/components/Layout/Header/MobileMenu';
import Modal from '@/shared/components/UI/Modal';
import { useAppSelector } from '@/shared/hooks';
import { selectIsLoggedIn } from '@/features/auth/model/selectors';
import SpecialistMenu from './SpecialistMenu';
import PwdRecoveryForm from '@/features/auth/components/PwdRecoveryForm';
import { ModalType } from '@/features/auth/types/types';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);
  const toggleMenu = () => setMenuOpen(open => !open);

  return (
    <>
      <header className="xl:font-base relative z-20 mx-auto mt-[10px] flex h-[46px] max-w-[345px] xl:mt-2 xl:h-[68px] xl:max-w-[1232px]">
        {!isHomePage && <GradientHeaderWrapper />}
        <div className="bg-alabaster shadow-box relative z-30 container flex items-center justify-between rounded-[20px] px-4 xl:rounded-2xl xl:px-24">
          {/* Left block: Language, Nav*/}
          <div className="hidden items-center gap-10 xl:flex">
            <LangSwitch />
            <Navigation />
          </div>

          {/* Center block: Logo */}
          <div className="flex xl:absolute xl:left-1/2 xl:-translate-x-1/2 xl:transform xl:items-center">
            <Logo
              iconSize="w-[26px] h-[18px] xl:w-[60px] xl:h-[40px]"
              iconFill="fill-fire"
              textColor="text-fire"
              textSize="text-[7px] xl:text-lg"
              textShadow="text-shadow-box xl:text-shadow-inset-mobile-logo"
            />
          </div>

          {/* Right block: Burger for mobile, UserActions -desktop */}
          <div className="flex items-end xl:hidden">
            <BurgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
          <div className="hidden xl:flex xl:items-center">
            {/* Desktop: We don't pass a closeMenu callback here, as there's no mobile menu to close */}
            {isLoggedIn ? (
              <SpecialistMenu />
            ) : (
              <UserActions
                onLogin={() => openModal('login')}
                onRegister={() => openModal('register')}
                className="hidden xl:flex xl:gap-2"
              />
            )}
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        onLogin={() => {
          setMenuOpen(false);
          openModal('login');
        }}
        onRegister={() => {
          setMenuOpen(false);
          openModal('register');
        }}
      />

      {/* Modals */}
      <Modal isOpen={activeModal === 'login'} onClose={closeModal}>
        <LoginForm
          onClose={closeModal}
          onOpenPwdRecovery={() => openModal('pwdRecovery')}
        />
      </Modal>

      <Modal isOpen={activeModal === 'register'} onClose={closeModal}>
        <RegisterForm onOpenLogin={() => openModal('login')} />
      </Modal>

      <Modal isOpen={activeModal === 'pwdRecovery'} onClose={closeModal}>
        <PwdRecoveryForm onOpenLogin={() => openModal('login')} />
      </Modal>
    </>
  );
};

export default Header;
