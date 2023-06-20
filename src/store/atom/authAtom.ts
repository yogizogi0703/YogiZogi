import { atom } from 'recoil';

export const AUTH_TOKEN_KEY = 'authToken';

interface AuthUserProps {
  id: number;
  email: string;
  nickname: string;
  token: string;
  isLoggedIn: boolean;
}

const initialize: AuthUserProps = {
  id: 0,
  email: '',
  nickname: '',
  token: localStorage.getItem(AUTH_TOKEN_KEY) || '',
  isLoggedIn: !!localStorage.getItem(AUTH_TOKEN_KEY)
};

export const authUser = atom({
  key: 'authUser',
  default: initialize
});
