import { useCallback, useState } from 'react';

import { useEventListener, useIsomorphicLayoutEffect } from './use-event-listener';

type Size = {
  width: number;
  height: number;
};

/**
 *
 */
export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [(node: T | null) => void, Size] {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [reference, setReference] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  // Prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    setSize({
      width: reference?.offsetWidth || 0,
      height: reference?.offsetHeight || 0,
    });
  }, [reference?.offsetHeight, reference?.offsetWidth]);

  useEventListener('resize', handleSize);

  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, [reference?.offsetHeight, reference?.offsetWidth]);

  return [setReference, size];
}
