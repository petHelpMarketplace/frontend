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

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const onMenuToggle = () => setMenuOpen(open => !open);

  const openLogin = (closeMenu?: () => void) => {
    closeMenu?.(); // If closeMenu is provided (from mobile menu), call it. Otherwise, do nothing.
    setOpenLoginModal(true); // Always open the login modal.
  };

  const openRegister = (closeMenu?: () => void) => {
    closeMenu?.(); // If closeMenu is provided, call it.
    setOpenRegisterModal(true); // Always open the register modal.
  };

  return (
    <>
      <header className="relative z-20 flex  mx-auto h-[46px] max-w-[345px] mt-[10px] xl:max-w-[1232px] xl:h-[68px] xl:font-base xl:mt-2">
        {!isHomePage && <GradientHeaderWrapper />}
        <div className="relative z-30 bg-alabaster flex px-4 items-center justify-between rounded-[20px] shadow-box container xl:rounded-2xl xl:px-24">
          {/* Left block: Language, Nav*/}
          <div className="hidden xl:flex items-center gap-10">
            <LangSwitch />
            <Navigation />
          </div>

          {/* Center block: Logo */}
          <div className="flex xl:items-center xl:absolute xl:left-1/2 xl:transform xl:-translate-x-1/2">
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
            <BurgerButton isOpen={isMenuOpen} onClick={onMenuToggle} />
          </div>
          <div className="hidden xl:flex xl:items-center">
            {/* Desktop: We don't pass a closeMenu callback here, as there's no mobile menu to close */}
            <UserActions
              onLogin={() => openLogin()} // Calls openLogin without closeMenu
              onRegister={() => openRegister()} // Calls openRegister without closeMenu
              className="hidden xl:flex xl:gap-2"
            />
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)} // This is the close function for the MobileMenu itself
        onLogin={() => openLogin(() => setMenuOpen(false))} // Mobile: Passes a callback to close the menu
        onRegister={() => openRegister(() => setMenuOpen(false))} // Mobile: Passes a callback to close the menu
      />
      <Modal isOpen={openLoginModal} onClose={() => setOpenLoginModal(false)}>
        <LoginForm />
      </Modal>
      <Modal
        isOpen={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
      >
        <RegisterForm
          onOpenLogin={() => {
            setOpenRegisterModal(false);
            setTimeout(() => setOpenLoginModal(true), 350);
          }}
        />
      </Modal>
    </>
  );
};

export default Header;
