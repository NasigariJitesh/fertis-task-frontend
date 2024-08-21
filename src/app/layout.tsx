import './globals.css';

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Toaster } from 'sonner';

import { siteConfig } from '@/config/site.config';
import { AuthenticationProvider } from '@/providers/authentication/provider';
import GlobalDrawer from '@/providers/drawer';
import ReactQueryProvider from '@/providers/react-query';
import { ThemeProvider } from '@/providers/theme-provider';
import cn from '@/utils/class-names';

import { inter, lexendDeca } from './fonts';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

const NextProgress = dynamic(() => import('@/components/next-top-loader-client'), {
  ssr: false,
});

/**
 *
 * @param root0
 * @param root0.children
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' dir='ltr' suppressHydrationWarning>
      <body suppressHydrationWarning className={cn(inter.variable, lexendDeca.variable, 'font-inter')}>
        <ThemeProvider>
          <ReactQueryProvider>
            <AuthenticationProvider>
              <NextProgress />
              {children}
              <Toaster position='bottom-right' richColors />
              <GlobalDrawer />
            </AuthenticationProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
