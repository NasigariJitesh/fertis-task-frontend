'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useAuth } from '@/providers/authentication/provider';
import Layout from '@/providers/layout';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { getToken, getUser, setRedirectPathAfterLogin } = useAuth();

  const { replace } = useRouter();
  const pathname = usePathname();
  const token = getToken();
  const user = getUser();

  useEffect(() => {
    if (!(token && user)) {
      setRedirectPathAfterLogin(pathname);
      replace('/signin');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <Layout>{children}</Layout>;
};

export default DashboardLayout;
