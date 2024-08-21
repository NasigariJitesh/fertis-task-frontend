/**
 *
 * @param function_
 * @param waitFor
 */
export function debounce<F extends (...arguments_: any[]) => void>(function_: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout>;

  const debouncedFunction = function (...arguments_: Parameters<F>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => function_(...arguments_), waitFor);
  } as F & { cancel: () => void };

  debouncedFunction.cancel = () => {
    clearTimeout(timeout);
  };

  return debouncedFunction;
}
