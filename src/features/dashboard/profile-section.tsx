import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { ActionIcon } from 'rizzui';

import { useAuth } from '@/providers/authentication/provider';
import { useGetUser } from '@/providers/layout/user-queries';

import EditProfileSection from './edit-profile-section';

const ProfileSection = () => {
  const { getUser, getToken } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const user = getUser();
  const token = getToken();

  const { data: userData } = useGetUser({
    userId: user?._id,
    authToken: token ?? undefined,
  });

  return (
    <div className='flex flex-1 flex-col gap-6'>
      <div className='flex items-center h-9 flex-row justify-between'>
        <h4 className='text-xl font-semibold'>Profile</h4>
        {editMode ? null : (
          <ActionIcon variant='text' onClick={() => setEditMode(true)}>
            <FaPencilAlt />
          </ActionIcon>
        )}
      </div>
      {editMode ? (
        <EditProfileSection close={() => setEditMode(false)} />
      ) : (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-base font-semibold'>Name</p>
            <p className='text-sm'>{userData?.name}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-base font-semibold'>About</p>
            <p className='text-sm'>{userData?.bio ?? '-'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
