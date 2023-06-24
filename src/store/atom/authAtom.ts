import { atom } from 'recoil';

export const AUTH_TOKEN_KEY = 'authToken';

interface UserProps {
  id?: number;
  nickname?: string;
  email?: string;
}
interface AuthUserProps {
  user: UserProps;
  token: string;
  isLoggedIn: boolean;
  expiration?: boolean;
}

const initialize: AuthUserProps = {
  user: {},
  token: localStorage.getItem(AUTH_TOKEN_KEY) || '',
  isLoggedIn: !!localStorage.getItem(AUTH_TOKEN_KEY)
};

export const authUser = atom({
  key: 'authUser',
  default: initialize
});
