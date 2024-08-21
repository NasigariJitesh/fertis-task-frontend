import React from 'react';

import cn from '@/utils/class-names';

interface SkeletonProps {
  className?: string;
}

const Skeleton = (props: SkeletonProps) => {
  return <div className={cn('h-5 w-3/4 rounded-md bg-gray-300  dark:bg-gray-600 animate-pulse', props.className)} />;
};

export default Skeleton;
