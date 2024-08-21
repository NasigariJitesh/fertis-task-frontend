'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useAuth } from '@/providers/authentication/provider';
import Layout from '@/providers/layout';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { getToken, getUser, redirectRoute } = useAuth();

  const { replace } = useRouter();
  const token = getToken();
  const user = getUser();

  useEffect(() => {
    if (token && user) {
      replace(redirectRoute ?? '/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <Layout noHeader noSidebar>
      {children}
    </Layout>
  );
};

export default AuthLayout;
