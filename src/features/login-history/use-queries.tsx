import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { env } from '@/config/env';
import { User } from '@/providers/layout/user-queries';

export interface LoginHistory {
  _id: string;
  timestamp: number;
  userId: string;
  user: User;
}

export const useLoginHistory = ({ authToken, userId }: { authToken?: string; userId?: string }) => {
  const getUser = async (): Promise<LoginHistory[] | undefined> => {
    try {
      const response = await axios.get(
        `${env.BACKEND_URL}/user/${userId}/loginHistory`,

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

  return useQuery({
    queryKey: ['login-history'],
    queryFn: getUser,
    enabled: !!authToken && !!userId,
  });
};
