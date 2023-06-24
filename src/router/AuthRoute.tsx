import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const { authUser } = useAuth();

  if (!authUser.isLoggedIn) {
    alert('로그인이 필요한 페이지입니다.');
    return <Navigate to={'/signIn'} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthRoute;
