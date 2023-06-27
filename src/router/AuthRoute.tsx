import useAuth from '../hooks/useAuth';
import useModal from '../hooks/useModal';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const { authUser } = useAuth();
  const { openModal } = useModal();

  if (!authUser.isLoggedIn) {
    openModal({ content: '로그인이 필요한 페이지입니다.' });
    return <Navigate to={'/signIn'} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthRoute;
