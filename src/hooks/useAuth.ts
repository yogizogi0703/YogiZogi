import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { AUTH_TOKEN_KEY } from '../store/atom/authAtom';
import { authLoginState } from '../store/selector/authUserState';

const useAuth = () => {
  const [authUser, setAuthUser] = useRecoilState(authLoginState);

  const successLogin = useCallback((token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setAuthUser({ ...authUser, isLoggedIn: true, token: token });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthUser({ ...authUser, isLoggedIn: false, token: '' });
  };

  useEffect(() => {
    console.log(authUser);
  }, [authUser]);

  return { authUser, successLogin, handleLogout };
};

export default useAuth;
