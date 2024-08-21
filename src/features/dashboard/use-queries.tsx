/* eslint-disable unicorn/consistent-function-scoping */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { env } from '@/config/env';
import { User } from '@/providers/layout/user-queries';
import { queryClient } from '@/providers/react-query';

export interface UpdateUserInput {
  name?: string;
  bio?: string;
  image?: string;
}

export const useUpdateUser = () => {
  const updateUser = async ({
    input,
    authToken,
    userId,
  }: {
    input: UpdateUserInput;
    authToken: string;
    userId: string;
  }): Promise<User | undefined> => {
    try {
      const response = await axios.put(`${env.BACKEND_URL}/user/${userId}`, input, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return useMutation({
    mutationFn: updateUser,
    mutationKey: ['update-user'],
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['user', variables.userId], data);
    },
  });
};
