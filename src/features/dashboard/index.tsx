import React from 'react';

import { useAuth } from '@/providers/authentication/provider';
import { useGetUser } from '@/providers/layout/user-queries';

import Skeleton from '../common/skeleton';
import ProfileImage from './profile-image';
import ProfileSection from './profile-section';

const Dashboard = () => {
  const { getUser, getToken } = useAuth();

  const user = getUser();
  const token = getToken();

  const { data: userData, isPending } = useGetUser({
    userId: user?._id,
    authToken: token ?? undefined,
  });

  if (!userData && isPending) {
    return (
      <div className='flex flex-col-reverse gap-4 sm:flex-row'>
        <div className='flex flex-1 flex-col gap-6'>
          <div className='flex items-center h-9 flex-row justify-between'>
            <Skeleton className='w-32 h-7 rounded-full' />
            <Skeleton className='w-5 h-5 rounded-md' />
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <Skeleton className='w-24 h-6 rounded-full' />
              <Skeleton className='w-[50%] h-5 rounded-full' />
            </div>
            <div className='flex flex-col gap-1'>
              <Skeleton className='w-24 h-6 rounded-full' />
              <Skeleton className='w-[80%] h-5 rounded-full' />
              <Skeleton className='w-[80%] h-5 rounded-full' />
              <Skeleton className='w-[80%] h-5 rounded-full' />
            </div>
          </div>
        </div>

        <div className='w-full flex justify-center sm:w-1/4'>
          <Skeleton className='w-32 h-32 rounded-full' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col-reverse gap-4 sm:flex-row'>
      <ProfileSection />
      <ProfileImage />
    </div>
  );
};

export default Dashboard;
