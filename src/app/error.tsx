'use client'; // Error components must be Client Components

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Empty, EmptyProductBoxIcon } from '@/components/ui/empty';

/**
 *
 * @param root0
 * @param root0.error
 * @param root0.reset
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { replace } = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center'>
      <Empty image={<EmptyProductBoxIcon />} text='Something went wrong!' />

      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            reset();
            replace('/');
          }
        }
      >
        Go to home
      </Button>
    </div>
  );
}
