import { useNavigate } from 'react-router-dom';
import { SignInFormDataProps, fetchSignIn } from '../api/auth';
import { useEffect, useRef, useState } from 'react';
import useAuth from './useAuth';
import useModal from './useModal';

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};

const useSignIn = () => {
  const navigate = useNavigate();
  const { successLogin } = useAuth();
  const { openModal } = useModal();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [signInData, setSignInData] = useState<SignInFormDataProps>({
    email: '',
    password: ''
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setSignInData((signInData) => ({ ...signInData, [name]: value }));
  };

  const handleSubmitSignIn = async () => {
    if (!validateEmail(signInData.email)) {
      openModal({ content: '이메일 형식을 입력해주세요.' });
      return;
    }
    if (!validatePassword(signInData.password)) {
      openModal({ content: '비밀번호를 8자리 이상 입력해주세요.' });
      return;
    }

    const res = await fetchSignIn(signInData);
    if (!res) {
      openModal({ content: '문제가 발생했습니다.' });
      return;
    }

    if (res.status === 'OK') {
      const token = res.data['X-AUTH-TOKEN'];
      successLogin(token);
      navigate('/');
    } else {
      openModal({ content: res.data.msg });
      console.error(res.data.code);
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

  const handleKakaoSignIn = () => {};

  useEffect(() => {
    changeBtnDisabled();
  }, [signInData]);

  return {
    signInData,
    isDisabled,
    handleChangeInput,
    handleSubmitSignIn,
    handleKakaoSignIn
  };
};

export default useSignIn;
