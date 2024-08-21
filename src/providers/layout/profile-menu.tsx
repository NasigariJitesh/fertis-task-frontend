'use client';

import Link from 'next/link';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';

import { useAuth } from '../authentication/provider';

interface ProfileMenuProps {
  name: string;
  image?: string;
}
/**
 *
 * @param root0
 * @param root0.name
 * @param root0.role
 * @param root0.image
 */
function DropdownMenu({ name, image }: ProfileMenuProps) {
  const { logout } = useAuth();

  const menuItems: {
    name: string;
    href: string;
    onclick: () => void;
  }[] = [];

  return (
    <div className='w-72 text-left rtl:text-right'>
      <div className='flex items-center  px-6 pb-5 pt-6'>
        <Avatar src={image} name={name} color='invert' />
        <div className='flex ms-3 overflow-hidden '>
          <Text tag='p' className='overflow-hidden text-ellipsis whitespace-nowrap font-semibold mr-3'>
            {name}
          </Text>
        </div>
      </div>
      {menuItems.length > 0 ? (
        <div className='grid px-3.5 border-t border-gray-300 py-3.5 font-medium text-gray-700'>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={item?.onclick}
              className='group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50'
            >
              {item.name}
            </Link>
          ))}
        </div>
      ) : null}
      <div className='border-t border-gray-300 px-6 pb-6 pt-5'>
        <Button
          className='h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-600 focus-visible:ring-0'
          variant='text'
          onClick={() => logout()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

/**
 *
 * @param root0
 * @param root0.name
 * @param root0.role
 * @param root0.image
 */
export default function ProfileMenu({ name, image }: ProfileMenuProps) {
  return (
    <Popover
      content={() => <DropdownMenu name={name} image={image} />}
      shadow='sm'
      placement='bottom-end'
      className='z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100'
    >
      <button className='w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10'>
        <Avatar src={image} name={name} color='invert' className='!h-10 w-10' />
      </button>
    </Popover>
  );
}
