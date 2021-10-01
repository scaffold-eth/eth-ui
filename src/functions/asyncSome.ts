export const asyncSome = async <T>(arr: Array<T>, predicate: (item: T) => Promise<boolean>): Promise<T | undefined> => {
  for (const e of arr) {
    if (await predicate(e)) return e;
  }
  return undefined;
};