import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Textarea } from 'rizzui';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuth } from '@/providers/authentication/provider';
import { useGetUser } from '@/providers/layout/user-queries';

import { useUpdateUser } from './use-queries';

interface EditProfileSectionProps {
  close: () => void;
}

const profileSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),

  bio: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

const EditProfileSection = ({ close }: EditProfileSectionProps) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchema>({
    defaultValues: {
      name: '',
      bio: '',
    },
    mode: 'onChange',
    resolver: zodResolver(profileSchema),
  });

  const { getUser, getToken } = useAuth();

  const user = getUser();
  const token = getToken();

  const { data: userData, isFetching } = useGetUser({
    userId: user?._id,
    authToken: token ?? undefined,
  });

  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();

  const resetValues = () => {
    if (userData) {
      reset({
        bio: userData.bio,
        name: userData.name,
      });
    }
  };

  useEffect(() => {
    resetValues();
  }, [userData]);

  const handleClose = () => {
    resetValues();

    close();
  };

  const updateValues = (data: ProfileSchema) => {
    if (!token || !user) return;
    updateUser({
      input: {
        ...data,
      },
      authToken: token,
      userId: user?._id,
    })
      .then((response) => {
        if (response) handleClose();
        else throw new Error('Something went wrong');
      })
      .catch(() => {
        toast.error('Could not update. Something went wrong');
      });
  };
  return (
    <div className='flex flex-col w-full gap-4'>
      <Controller
        control={control}
        name='name'
        render={({ field: { value, onChange } }) => (
          <Input
            type='text'
            label='Name'
            placeholder='Enter your name'
            color='info'
            className='[&>label>span]:font-medium'
            inputClassName='text-sm'
            value={value}
            onChange={onChange}
            error={errors.name?.message as string}
          />
        )}
        rules={{ required: true }}
      />
      <Controller
        control={control}
        name='bio'
        render={({ field: { value, onChange } }) => (
          <Textarea
            label='About'
            placeholder='Write something about yourself'
            className='[&>label>span]:font-medium text-sm'
            color='info'
            value={value}
            onChange={onChange}
            error={errors.bio?.message as string}
          />
        )}
        rules={{ required: true }}
      />
      <div className='w-full flex flex-row justify-between items-center'>
        <Button disabled={isFetching || isUpdating} variant='outline' onClick={handleClose}>
          Cancel
        </Button>

        <Button
          disabled={isFetching || isUpdating}
          isLoading={isFetching || isUpdating || isSubmitting}
          variant='solid'
          onClick={handleSubmit(updateValues)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EditProfileSection;
