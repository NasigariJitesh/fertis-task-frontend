/**
 *
 * @param array
 * @param filterKeys
 */
export function filterData<T extends Record<string, any>>(array: T[], filterKeys: string[]) {
  return array.filter((object) => {
    return Object.values(object).some((key) => filterKeys.includes(key));
  });
}
