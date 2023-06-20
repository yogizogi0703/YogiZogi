import { selector } from 'recoil';
import { authUser as authAtom } from '../../store/atom/authAtom';
import { decoderToken } from '../../utils/tokenUtil';

export const authLoginState = selector({
  key: 'authentification/id',
  get: ({ get }) => {
    const value = get(authAtom);
    if (value.token) {
      const payload = decoderToken(value.token);
      if (payload) {
        return { ...value, user: payload.user, expiration: payload.expiration };
      }
    }

    return value;
  },
  set({ set }, newValue) {
    set(authAtom, newValue);
  }
});
