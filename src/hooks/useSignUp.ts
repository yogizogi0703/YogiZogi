import { SignUpFormDataProps, fetchSignUp } from '../api/auth';
import { useEffect, useState } from 'react';
import { validateEmail, validatePassword } from './useSignIn';
import { useNavigate } from 'react-router-dom';
import useModal from './useModal';

const useSignUp = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [signUpData, setSignUpData] = useState<SignUpFormDataProps>({
    email: '',
    nickname: '',
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
    if (signUpData.nickname.length < 2) {
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
    } else {
      openModal({ content: res.msg });
      console.error(res.code);
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
