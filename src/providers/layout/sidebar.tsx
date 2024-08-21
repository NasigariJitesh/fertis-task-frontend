'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useSelectedLayoutSegments } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Fragment } from 'react';
import { FaHistory } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { PiCaretDownBold } from 'react-icons/pi';

import { Collapse } from '@/components/ui/collapse';
import SimpleBar from '@/components/ui/simplebar';
import { Text } from '@/components/ui/text';
import { siteConfig } from '@/config/site.config';
import cn from '@/utils/class-names';

const getMenuItems = () => {
  return [
    {
      name: 'Dashboard',
      href: '/',
      icon: <MdSpaceDashboard />,
    },
    {
      name: 'Login History',
      href: '/login-history',
      icon: <FaHistory />,
    },
  ];
};

/**
 *
 * @param root0
 * @param root0.className
 */
export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const params = useParams();
  const segments = useSelectedLayoutSegments();
  const { theme } = useTheme();

  const logo = theme === 'light' ? siteConfig.logo : siteConfig.logoDark;
  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72',
        className,
      )}
    >
      <div className='bg-gray-0/10 sticky top-0 z-40 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6'>
        <Link href={params.orgId ? `/o/${params.orgId}` : '/'}>
          <Image src={logo} alt={siteConfig.title} priority height={50} />
        </Link>
      </div>

      <SimpleBar className='h-[calc(100%-80px)]'>
        <div className='3xl:mt-6 mt-4 pb-3'>
          {getMenuItems().map((item, index) => {
            if (!item) return;
            const segmentValue = segments[0] ? `/${segments[0]}` : '';
            const isActive = `/o/${params?.orgId}${segmentValue}` === (item?.href as string);
            // @ts-ignore
            const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
              (dropdownItem: any) => dropdownItem.href === pathname,
            );
            const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

            return (
              <Fragment key={item.name + '-' + index}>
                {item?.href ? (
                  <>
                    {/* @ts-ignore */}
                    {item?.dropdownItems ? (
                      <Collapse
                        defaultOpen={isDropdownOpen}
                        header={({ open, toggle }) => (
                          <div
                            onClick={toggle}
                            className={cn(
                              'group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
                              isDropdownOpen
                                ? 'before:top-2/5 text-primary before:bg-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md 2xl:before:-start-5'
                                : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700',
                            )}
                          >
                            <span className='flex items-center'>
                              {item?.icon && (
                                <span
                                  className={cn(
                                    'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                                    isDropdownOpen
                                      ? 'text-primary'
                                      : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700',
                                  )}
                                >
                                  {item?.icon}
                                </span>
                              )}
                              {item.name}
                            </span>

                            <PiCaretDownBold
                              strokeWidth={3}
                              className={cn(
                                'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                                open && 'rotate-0',
                              )}
                            />
                          </div>
                        )}
                      >
                        {/* @ts-ignore */}
                        {item?.dropdownItems?.map((dropdownItem, id) => {
                          const isChildActive = pathname === (dropdownItem?.href as string);

                          return (
                            <Link
                              href={dropdownItem?.href}
                              key={dropdownItem?.name + id}
                              className={cn(
                                'mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
                                isChildActive
                                  ? 'text-gray-900'
                                  : 'text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900',
                              )}
                            >
                              <span
                                className={cn(
                                  'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                                  isChildActive ? 'bg-primary ring-primary ring-[1px]' : 'opacity-40',
                                )}
                              />{' '}
                              {dropdownItem?.name}
                            </Link>
                          );
                        })}
                      </Collapse>
                    ) : (
                      <Link
                        href={item?.href}
                        className={cn(
                          'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                          isActive
                            ? 'before:top-2/5 text-primary before:bg-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md 2xl:before:-start-5'
                            : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90',
                        )}
                      >
                        {item?.icon && (
                          <span
                            className={cn(
                              'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                              isActive
                                ? 'text-primary'
                                : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700',
                            )}
                          >
                            {item?.icon}
                          </span>
                        )}
                        {item.name}
                      </Link>
                    )}
                  </>
                ) : (
                  <Text
                    tag='h6'
                    className={cn(
                      'mb-2 truncate px-6 text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8',
                      index !== 0 && '3xl:mt-7 mt-6',
                    )}
                  >
                    {item.name}
                  </Text>
                )}
              </Fragment>
            );
          })}
        </div>
      </SimpleBar>
    </aside>
  );
}
