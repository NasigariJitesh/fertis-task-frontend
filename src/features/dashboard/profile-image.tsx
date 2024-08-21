import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { toast } from 'sonner';

import { useAuth } from '@/providers/authentication/provider';
import { useGetUser } from '@/providers/layout/user-queries';

import { useUpdateUser } from './use-queries';

const ProfileImage = () => {
  const { getUser, getToken } = useAuth();
  const [image, setImage] = useState<string>();

  const user = getUser();
  const token = getToken();

  const { data: userData } = useGetUser({
    userId: user?._id,
    authToken: token ?? undefined,
  });

  const { mutateAsync: updateUser } = useUpdateUser();

  useEffect(() => {
    if (userData?.image) {
      setImage(userData.image);
    }
  }, [userData?.image]);

  const getBase64 = (file: File) => {
    return new Promise((resolve) => {
      let baseURL: string | ArrayBuffer | null = '';
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.addEventListener('load', () => {
        baseURL = reader.result;
        resolve(baseURL);
      });
    });
  };

  const uploadImage = (base64Image: string) => {
    if (!token || !userData) return;
    toast.promise(updateUser({ input: { image: base64Image }, authToken: token ?? undefined, userId: userData._id }), {
      loading: 'Updating profile image...',
      success: 'Profile image updated successfully',
      error: 'Failed to update profile image',
    });
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    getBase64(file)
      .then((result) => {
        setImage(result as string);
        uploadImage(result as string);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='w-full flex justify-center sm:w-1/4'>
      {image ? (
        <div className='relative w-32 h-32 rounded-full'>
          <Image alt='profile' src={image} width={128} height={128} className='rounded-full' />
          <label htmlFor='choose-image'>
            <div className='bg-white dark:bg-black cursor-pointer absolute p-2 bottom-0 right-0 rounded-full'>
              <FaCamera className='w-5 h-5' />
            </div>
          </label>
          <input
            multiple
            type='file'
            accept='image/*'
            id='choose-image'
            onChange={handleImage}
            className=' mx-auto sm:mx-0 hidden'
          />
        </div>
      ) : (
        <div className='w-32 h-32 cursor-pointer rounded-full'>
          <label htmlFor='upload-button'>
            <Image
              alt='profile'
              src='/profile-placeholder.webp'
              className=' cursor-pointer rounded-full'
              width={128}
              height={128}
            />
          </label>
          <input
            multiple
            type='file'
            accept='image/*'
            id='upload-button'
            onChange={handleImage}
            className=' mx-auto sm:mx-0 hidden'
          />
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
