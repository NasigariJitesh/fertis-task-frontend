import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { env } from '@/config/env';

export interface User {
  _id: string;
  email: string;
  name: string;
  image: string;
  bio: string;
}

export const useGetUser = ({ authToken, userId }: { authToken?: string; userId?: string }) => {
  const getUser = async (): Promise<User | undefined> => {
    try {
      const response = await axios.get(
        `${env.BACKEND_URL}/user/${userId}`,

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
    queryKey: ['user', userId],
    queryFn: getUser,
    enabled: !!userId && !!authToken,
  });
};
