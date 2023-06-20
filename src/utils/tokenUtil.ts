import jwtDecode, { JwtPayload } from 'jwt-decode';

export const decoderToken = (token: string) => {
  try {
    const decodedToken: JwtPayload = jwtDecode(token);

    // 유효 시간 확인
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp) {
      if (decodedToken.exp < currentTime) {
        alert('토큰이 만료되었습니다.');
        return { auth: decodedToken, expiration: false };
      }
    }
    return { ...decodedToken, expiration: true };
  } catch (error) {
    console.error('유효하지 않은 토큰입니다.');
  }
};
