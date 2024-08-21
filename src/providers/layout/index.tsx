'use client';

import React, { ReactNode } from 'react';

import cn from '@/utils/class-names';

import Header from './header';
import Sidebar from './sidebar';

const Layout = ({
  children,
  noSidebar,
  noHeader,
}: {
  children: ReactNode;
  noSidebar?: boolean;
  noHeader?: boolean;
}) => {
  return (
    <main className='flex min-h-screen flex-grow '>
      {noSidebar ? null : <Sidebar className='fixed hidden dark:bg-gray-50 xl:block' />}
      <div
        className={cn(
          'flex w-full flex-col',
          noSidebar ? '' : 'xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]',
        )}
      >
        {noHeader ? null : <Header />}
        <div
          className={cn(
            '@container flex flex-grow flex-col 3xl:px-8 4xl:px-10 px-4 md:px-5 lg:px-6',
            noHeader ? '' : '3xl:py-4 4xl:py-9 py-2 lg:py-8',
          )}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
