'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { useState } from 'react';

// Options
const queryClientOptions = {
  defaultOptions: {
    // 5 * 1000
    queries: {
      staleTime: 60_000,
    },
  },
};

export const queryClient = new QueryClient(queryClientOptions);

const ReactQueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // State
  const [queryClientStore] = useState(queryClient);
  // Return Provider
  return <QueryClientProvider client={queryClientStore}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
