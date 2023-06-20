import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const { authUser } = useAuth();

  if (!authUser.isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthRoute;