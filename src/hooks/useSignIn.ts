import { useNavigate } from 'react-router-dom';
import { SignInFormDataProps, fetchSignIn } from '../api/auth';
import { useEffect, useRef, useState } from 'react';
import useAuth from './useAuth';

const useSignIn = () => {
  const navigate = useNavigate();
  const { successLogin } = useAuth();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [signInData, setSignInData] = useState<SignInFormDataProps>({
    email: '',
    password: ''
  });
  const loginMaintainRef = useRef<boolean>(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setSignInData((signInData) => ({ ...signInData, [name]: value }));
  };

  const handleSubmitSignIn = async () => {
    const res = await fetchSignIn(signInData);
    if (!res) {
      return;
    }

    if (res.status === 'OK') {
      const token = res.data['X-AUTH-TOKEN'];
      successLogin(token, loginMaintainRef.current);
      navigate('/');
    }
  };

  const changeBtnDisabled = () => {
    let isCheck = false;
    for (let key in signInData) {
      if (!signInData[key]) {
        isCheck = true;
      }
    }
    setIsDisabled(isCheck);
  };

  const handleChangeMaintain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const checked = target.checked;
    loginMaintainRef.current = checked;
  };

  const handleKakaoSignIn = () => {
    location.href =
      'https://kauth.kakao.com/oauth/authorize?client_id=32665db00eb9aef9b6b5246fc2a2e8b4&r[…]tps://13.209.131.228:8443/api/user/kakao-login&response_type=code';
  };

  useEffect(() => {
    changeBtnDisabled();
  }, [signInData]);

  return {
    signInData,
    isDisabled,
    handleChangeInput,
    handleSubmitSignIn,
    handleKakaoSignIn,
    handleChangeMaintain
  };
};

export default useSignIn;
