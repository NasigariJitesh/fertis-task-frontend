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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Password } from '@/components/ui/password';
import { useAuth } from '@/providers/authentication/provider';

import { useSignin } from './use-queries';

const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required' }),
  remember: z.boolean(),
});

type SignIn = z.infer<typeof signInSchema>;

const routes = {
  signup: '/signup',
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
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    resolver: zodResolver(signInSchema),
  });
  const { setToken, setRefreshToken, redirectRoute } = useAuth();
  const { push } = useRouter();

  const { mutateAsync: signIn, isPending: loading } = useSignin();

  const onSubmit: SubmitHandler<SignIn> = async (data) => {
    signIn({
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (response) {
          toast.success('Signed in successfully');
          setToken(response.token);
          setRefreshToken(response.refresh_token);

          reset();
          push(redirectRoute ?? '/');
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
        <Controller
          control={control}
          name='remember'
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={onChange}
              label='Remember Me'
              color='info'
              variant='flat'
              className='[&>label>span]:font-medium'
            />
          )}
        />

        <Link
          href={routes.signup}
          className='text-blue h-auto p-0 text-sm font-semibold underline transition-colors hover:text-gray-900 hover:no-underline'
        >
          {"Don't have an account?"}
        </Link>
      </div>
      <Button className='w-full' onClick={handleSubmit(onSubmit)}>
        <React.Fragment>
          <span>Sign in</span>
          {isSubmitting || loading ? <Loader color='primary' /> : <PiArrowRightBold className='ms-2 mt-0.5 h-5 w-5' />}
        </React.Fragment>
      </Button>
    </div>
  );
}
