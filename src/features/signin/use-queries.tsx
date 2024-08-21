/* eslint-disable unicorn/consistent-function-scoping */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { env } from '@/config/env';
import { SignInResponse } from '@/providers/authentication/use-queries';

export interface SigninInput {
  email: string;
  password: string;
}

export const useSignin = () => {
  const signin = async (input: SigninInput): Promise<SignInResponse | undefined> => {
    try {
      const response = await axios.post(`${env.BACKEND_URL}/signin`, input);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return useMutation({
    mutationFn: signin,
    mutationKey: ['sign-in'],
  });
};
