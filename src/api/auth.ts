import { fetchData } from '../api';
import axios from 'axios';

export interface SignInFormDataProps {
  [key: string]: string;
  email: string;
  password: string;
}

export interface SignUpFormDataProps extends SignInFormDataProps {
  nickName: string;
  passwordCheck: string;
}

export const fetchSignIn = async (data: SignInFormDataProps) => {
  const res = await fetchData.post<SignInFormDataProps>('/user/login', data);
  return res?.data;
};

export const fetchSignUp = async (data: SignUpFormDataProps) => {
  const res = await fetchData.post('/user/sign-up', data);
  return res?.data;
};
