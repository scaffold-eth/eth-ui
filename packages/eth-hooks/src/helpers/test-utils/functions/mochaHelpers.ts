import { AssertionError, expect } from 'chai';

export type TExpectExpression = (() => Promise<void>) | (() => void);

const returnExpectAsBool = async (expectExpression: TExpectExpression): Promise<boolean> => {
  try {
    await expectExpression();
  } catch (e) {
    if (e instanceof AssertionError) {
      return false;
    } else {
      throw e;
    }
  }
  return true;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
export const waitForCondition = async (
  untilCondition: (() => Promise<boolean>) | (() => boolean),
  { timeout, interval }: { timeout?: number; interval?: number }
): Promise<void> => {
  let hasTimedOut = false;
  setTimeout(() => {
    hasTimedOut = true;
  }, timeout);

  while (!(await untilCondition()) && !hasTimedOut) {
    await sleep(interval ?? 250);
  }

  expect(hasTimedOut, `waitForCondition: timed out ${untilCondition.toString()}`).to.be.false;
};

export const waitForExpect = async (
  expectExpression: TExpectExpression,
  { timeout, interval }: { timeout?: number; interval?: number }
): Promise<void> => {
  let hasTimedOut = false;
  setTimeout(() => {
    hasTimedOut = true;
  }, timeout);

  while (!(await returnExpectAsBool(expectExpression)) && !hasTimedOut) {
    await sleep(interval ?? 250);
  }

  expect(hasTimedOut, `returnExpectAsBool: timed out ${expectExpression.toString()}`).to.be.false;
};
