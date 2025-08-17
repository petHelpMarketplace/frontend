import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '@/features/auth/model/selectors';
import { PrivateRouteProps } from '@/features/auth/types/types';

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? children : <Navigate to="/" />;
  // return isLoggedIn ? children : <Navigate to="/account" />;
};

export default PrivateRoute;
