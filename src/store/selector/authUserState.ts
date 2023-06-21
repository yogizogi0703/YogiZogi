import { selector } from 'recoil';
import {
  AUTH_TOKEN_KEY,
  authUser as authAtom
} from '../../store/atom/authAtom';
import { decoderToken } from '../../utils/tokenUtil';

export const authLoginState = selector({
  key: 'authentification/id',
  get: ({ get }) => {
    const value = get(authAtom);
    console.log(value);
    if (value.token) {
      const payload = decoderToken(value.token);
      console.log(payload);
      if (payload) {
        return { ...value, user: payload.user, expiration: payload.expiration };
      } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        return { ...value, user: {} };
      }
    }

    return value;
  },
  set({ set }, newValue) {
    set(authAtom, newValue);
  }
});
