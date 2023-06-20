import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { decoderToken } from '../../utils/tokenUtil';

const AuthCallback = () => {
  const { successLogin } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  if (token) {
    const payload = decoderToken(token);
    if (payload) {
      successLogin(token);
    } else {
      return <Navigate to={'/'} />;
    }
  }

  return <></>;
};

export default AuthCallback;
