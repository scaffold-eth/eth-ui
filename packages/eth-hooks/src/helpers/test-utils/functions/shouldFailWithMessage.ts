import { expect } from 'chai';

/**
 * Wrapped around a function to ensure that it fails with the correct message
 * and doesn't pass successfully
 *
 * @param failingFunction Function expect to fail
 * @param errorMessage Error message expect to fail with
 */
export const shouldFailWithMessage = async (
  failingFunction: () => Promise<any>,
  errorMessage: string
): Promise<void> => {
  try {
    await failingFunction();
  } catch (e: any) {
    expect(e.message).to.contain(errorMessage);
    return;
  }
  expect.fail(); // Fail test if it doesn't fail
};
