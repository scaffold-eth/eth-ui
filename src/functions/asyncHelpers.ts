/**
 * #### Summary
 * js .some function that can be used with async predicates
 *
 * @category Helpers
 *
 * @param arr
 * @param predicate
 * @returns
 */
export const asyncSome = async <T>(arr: Array<T>, predicate: (item: T) => Promise<boolean>): Promise<T | undefined> => {
  for (const e of arr) {
    if (await predicate(e)) return e;
  }
  return undefined;
};

export const asyncForEach = async <T>(
  array: Array<T>,
  callback: (item: T, index: number) => Promise<void>
): Promise<void> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
};
