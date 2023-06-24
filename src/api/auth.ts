import axios from 'axios';

export interface SignInFormDataProps {
  [key: string]: string;
  email: string;
  password: string;
}

export interface SignUpFormDataProps extends SignInFormDataProps {
  nickname: string;
  passwordCheck: string;
}

export const fetchSignIn = async (data: SignInFormDataProps) => {
  const res = await axios({
    method: 'post',
    url: '/api/user/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }).catch((error) => console.log(error));

  return res?.data;
};

export const fetchSignUp = async (data: SignUpFormDataProps) => {
  const res = await axios({
    method: 'post',
    url: '/api/user/sign-up',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }).catch((error) => console.log(error));

  return res?.data;
};
