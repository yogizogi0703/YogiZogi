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
    console.log('로그아웃');
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthUser({ user: {}, isLoggedIn: false, token: '' });
  };

  useEffect(() => {
    console.log(authUser);
    if (authUser.token) {
      if (!authUser.expiration) {
        handleLogout();
        location.href = '/';
      }
    }
  }, [authUser]);

  return { authUser, successLogin, handleLogout };
};

export default useAuth;
