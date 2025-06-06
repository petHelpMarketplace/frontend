import Logo from '@/shared/components/UI/Logo';
import { LangSwitch } from './LangSwitch';
import { Navigation } from './Navigation';
import GradientHeaderWrapper from '../Shared/ui/GradientHeaderWrapper/GradientHeaderWrapper';
import { UserActions } from './UserActions';
import { AccUserActions } from '@/features/account/components/userAction/accUserAction';
import { useAppSelector } from '@/shared/hooks/index';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  // const { isAuthenticated } = useAppSelector(state => state.auth);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <header className="relative z-20 h-17 font-base max-w-[1232px] shadow-box mx-auto mt-2 flex">
      {!isHomePage && <GradientHeaderWrapper />}
      <div className="relative z-30 bg-alabaster container mx-auto px-24 flex items-center justify-between  rounded-[16px]">
        {/* Left block: Language, Nav*/}
        <div className="flex items-center gap-10">
          <LangSwitch />
          <Navigation />
        </div>
        {/* Center block: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Logo className="text-fire" iconFill="fill-fire" />
        </div>
        {/* Right block: User actions */}
        <div className="hidden xl:flex items-center gap-6">
          {isAuthenticated ? <AccUserActions /> : <UserActions />}
        </div>
      </div>
    </header>
  );
};

export default Header;
