'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Password } from '@/components/ui/password';

import { useSignUp } from './use-queries';

const signUpSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 or more characters long' })
    .max(32, { message: 'Password cannot exceed 32 characters' })
    .regex(new RegExp('.*[A-Z].*'), {
      message: 'Password must contain at least one uppercase character',
    })
    .regex(new RegExp('.*[a-z].*'), {
      message: 'Password must contain at least one lowercase character',
    })
    .regex(new RegExp('.*\\d.*'), { message: 'Password must contain at least one number' })
    .regex(new RegExp('.*[^A-Za-z0-9].*'), {
      message: 'Password must contain at least one special character',
    }),
  name: z.string().min(5, { message: 'Name should be at least 5 characters long.' }),
});

type SignUp = z.infer<typeof signUpSchema>;

const routes = {
  signin: '/signin',
};

/**
 *
 */
export default function SignInForm() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUp>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    resolver: zodResolver(signUpSchema),
  });
  const { push } = useRouter();

  const { mutateAsync: signUp, isPending: loading } = useSignUp();

  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    signUp({
      email: data.email,
      password: data.password,
      name: data.name,
    })
      .then((response) => {
        if (response) {
          toast.success('Signed up successfully');
          setTimeout(() => {
            push('/signin');
            reset();
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };
  return (
    <div className='space-y-5'>
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
      />
      <Controller
        control={control}
        name='email'
        render={({ field: { value, onChange } }) => (
          <Input
            type='email'
            label='Email'
            placeholder='Enter your email address'
            color='info'
            className='[&>label>span]:font-medium'
            inputClassName='text-sm'
            value={value}
            onChange={onChange}
            error={errors.email?.message as string}
          />
        )}
        rules={{ required: true }}
      />
      <Controller
        control={control}
        name='password'
        render={({ field: { value, onChange } }) => (
          <Password
            label='Password'
            placeholder='Enter your password'
            className='[&>label>span]:font-medium'
            inputClassName='text-sm'
            color='info'
            value={value}
            onChange={onChange}
            error={errors.password?.message as string}
          />
        )}
        rules={{ required: true }}
      />

      <div className='flex items-center justify-between pb-2'>
        <Link
          href={routes.signin}
          className='text-blue h-auto p-0 text-sm font-semibold underline transition-colors hover:text-gray-900 hover:no-underline'
        >
          Already have an account?
        </Link>
      </div>
      <Button className='w-full' onClick={handleSubmit(onSubmit)}>
        <React.Fragment>
          <span>Sign up</span>
          {isSubmitting || loading ? <Loader color='primary' /> : <PiArrowRightBold className='ms-2 mt-0.5 h-5 w-5' />}
        </React.Fragment>
      </Button>
    </div>
  );
}
