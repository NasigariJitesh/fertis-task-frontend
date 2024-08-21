import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { env } from '@/config/env';

export interface SignInResponse {
  token: string;
  refresh_token: string;
}

export const useRefreshToken = ({ authToken }: { authToken: string }) => {
  const refreshToken = async (token: string): Promise<SignInResponse | undefined> => {
    try {
      const response = await axios.post(
        `${env.BACKEND_URL}/refresh-token`,
        {
          token: token,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return useMutation({
    mutationFn: refreshToken,
    mutationKey: ['refresh-token'],
  });
};
