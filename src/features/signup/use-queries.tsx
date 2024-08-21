/* eslint-disable unicorn/consistent-function-scoping */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { env } from '@/config/env';

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const signUp = async (input: SignUpInput): Promise<string | undefined> => {
    try {
      const response = await axios.post(`${env.BACKEND_URL}/signup`, input);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return useMutation({
    mutationFn: signUp,
    mutationKey: ['sign-up'],
  });
};
