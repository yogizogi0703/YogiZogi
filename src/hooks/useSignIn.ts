import { useNavigate } from 'react-router-dom';
import { SignInFormDataProps, fetchSignIn } from '../api/auth';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

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
      alert('이메일 형식을 입력해주세요.');
      return;
    }
    if (!validatePassword(signInData.password)) {
      alert('비밀번호를 8자리 이상 입력해주세요.');
      return;
    }

    const res = await fetchSignIn(signInData);
    if (!res) {
      alert('문제가 발생했습니다.');
      return;
    }

    if (res.status === 'OK') {
      console.log(res);
      const token = res.data['X-AUTH-TOKEN'];
      successLogin(token);
      navigate('/');
    } else {
      alert(res.data.msg);
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

  const handleKakaoSignIn = () => {
    location.href =
      '/FE#/auth/callback?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3YnMwOTZAZGF1bS5uZXRfMjgyMTI2NzgwMSIsImlzcyI6Ii7sgq3soJwuIzI4MjEyNjc4MDEiLCJqdGkiOiIxNiIsImlhdCI6MTY4NzI2MDY1MiwiZXhwIjoxNjg3MzQ3MDUyfQ.m8O-2imqlYu6UJ-lny4MdncvLka8R5r0U2soq23G3qo';
  };

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
