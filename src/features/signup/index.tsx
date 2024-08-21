'use client';

import Image from 'next/image';
import Link from 'next/link';

import { UnderlineShape } from '@/components';
import { Text } from '@/components/ui/text';
import { siteConfig } from '@/config/site.config';
import cn from '@/utils/class-names';

import SignInForm from './sign-up-form';

const Signin = () => {
  return (
    <>
      <div className='relative flex min-h-screen w-full flex-col justify-center  p-4  lg:p-28'>
        <div
          className={cn(
            '3xl:rounded-3xl mx-auto w-full max-w-md rounded-xle px-4 py-9 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl',
          )}
        >
          <div className='flex flex-col items-center'>
            <Link href={'/'} className='mb-7 inline-block max-w-[120px] lg:mb-9'>
              <Image src={siteConfig.icon} alt='Isomorphic' height='100' />
            </Link>
            <Text
              tag='h2'
              className='mb-7 text-center text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl lg:leading-normal'
            >
              Hey! Please{' '}
              <div className='relative inline-block'>
                Sign up to
                <UnderlineShape className='text-blue absolute -bottom-2 start-0 h-2.5 w-24 md:w-28 xl:-bottom-1.5 xl:w-36' />
              </div>{' '}
              get started.
            </Text>
          </div>

          <SignInForm />
        </div>
      </div>
    </>
  );
};

export default Signin;
