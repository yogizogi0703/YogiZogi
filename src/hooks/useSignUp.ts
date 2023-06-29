import { SignUpFormDataProps, fetchSignUp } from '../api/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from './useModal';

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};

const useSignUp = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [signUpData, setSignUpData] = useState<SignUpFormDataProps>({
    email: '',
    nickName: '',
    password: '',
    passwordCheck: ''
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setSignUpData((signUpData) => ({ ...signUpData, [name]: value }));
  };

  const handleSubmitSignUp = async () => {
    if (!validateEmail(signUpData.email)) {
      openModal({ content: '이메일 형식을 입력해주세요.' });
      return;
    }
    if (signUpData.nickName.length < 2) {
      openModal({ content: '닉네임을 2자리 이상 입력해주세요.' });
      return;
    }
    if (!validatePassword(signUpData.password)) {
      openModal({ content: '비밀번호를 8자리 이상 입력해주세요.' });
      return;
    }
    if (signUpData.password !== signUpData.passwordCheck) {
      openModal({ content: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    const res = await fetchSignUp(signUpData);
    if (!res) {
      openModal({ content: '문제가 발생했습니다.' });
      return;
    }
    if (res.status === 'OK') {
      openModal({ content: res.data.msg });
      navigate('/signIn');
    }
  };

  const changeBtnDisabled = () => {
    let isCheck = false;
    for (let key in signUpData) {
      if (!signUpData[key]) {
        isCheck = true;
      }
    }
    setIsDisabled(isCheck);
  };

  useEffect(() => {
    changeBtnDisabled();
  }, [signUpData]);

  return { signUpData, isDisabled, handleChangeInput, handleSubmitSignUp };
};

export default useSignUp;
