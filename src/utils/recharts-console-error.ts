// required this function to element this issue: https://github.com/recharts/recharts/issues/3615
/**
 *
 */
export default function hideRechartsConsoleError() {
  const error = console.error;
  return (console.error = (...arguments_: any) => {
    if (/defaultProps/.test(arguments_[0])) return;
    error(...arguments_);
  });
}
