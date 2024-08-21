'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

import { ActionIcon } from '@/components/ui/action-icon';
import { Tooltip } from '@/components/ui/tooltip';
import { siteConfig } from '@/config/site.config';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import cn from '@/utils/class-names';

import { useAuth } from '../authentication/provider';
import HamburgerButton from './hamburger-button';
import ProfileMenu from './profile-menu';
import { useGetUser } from './user-queries';

/**
 *
 */
export default function Header() {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();

  const { theme, setTheme } = useTheme();
  const { getUser, getToken } = useAuth();

  const user = getUser();
  const token = getToken();

  const { data: userData } = useGetUser({
    userId: user?._id,
    authToken: token ?? undefined,
  });
  const toggleTheme = (value: string) => {
    setTheme(value);
  };
  return (
    <header
      className={cn(
        'bg-gray-0/80 3xl:px-8 4xl:px-10 sticky top-0 z-50 flex items-center justify-between px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 2xl:py-5 ',
        ((isMounted && windowScroll.y) as number) > 2 ? 'card-shadow' : '',
      )}
    >
      <div className='flex w-full max-w-2xl items-center'>
        <HamburgerButton />
        <Link href={'/'} className='me-4 w-9 shrink-0 lg:me-5 xl:hidden'>
          <Image src={siteConfig.icon} alt={siteConfig.title} priority height={80} />
        </Link>
      </div>
      <div className='flex items-center gap-3'>
        {theme === 'light' ? (
          <Tooltip size='lg' content={() => 'Switch Theme'} color='invert' className='z-51 text-sm'>
            <ActionIcon size='sm' variant='text' aria-label='Switch Theme'>
              <FiSun className='h-4 w-4 cursor-pointer' onClick={() => toggleTheme('dark')} />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip size='lg' content={() => 'Switch Theme'} color='invert' className='z-50 text-sm'>
            <ActionIcon size='sm' variant='text' aria-label='Switch Theme'>
              <FiMoon className='h-4 w-4 cursor-pointer' onClick={() => toggleTheme('light')} />
            </ActionIcon>
          </Tooltip>
        )}
        {user ? (
          <div className='ml-5'>
            <ProfileMenu image={userData?.image} name={user.name} />
          </div>
        ) : null}
      </div>
    </header>
  );
}
