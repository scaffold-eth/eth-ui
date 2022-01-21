import { expect } from 'chai';

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
export const mochaWaitFor = async (
  untilCondition: (() => Promise<boolean>) | (() => boolean),
  timeout: number
): Promise<void> => {
  let hasTimedOut = false;
  setTimeout(() => {
    hasTimedOut = true;
  }, timeout);

  while (!(await untilCondition()) && !hasTimedOut) {
    await sleep(250);
  }

  expect(hasTimedOut, 'mochaWaitFor: timed out').to.be.false;
};
