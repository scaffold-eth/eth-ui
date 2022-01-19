import { expect } from 'chai';
import { QueryStatus } from 'react-query';

import { hookTestWrapper, TTestHookResult } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';
import { useTimestamp } from '~~/hooks';

const expectTimestamp = async (
  harness: TTestHookResult<() => [timestamp: number, update: () => void, status: QueryStatus]>
): Promise<number> => {
  const blockNumber = await harness.mockProvider.getBlockNumber();
  expect(blockNumber).to.exist;
  const timestamp = (await harness.mockProvider.getBlock(blockNumber)).timestamp;
  expect(timestamp).be.greaterThan(0);
  return timestamp;
};

describe('useTimestamp', function () {
  it('When the hook is called; then it returns the current block timestamp', async () => {
    const harness = await hookTestWrapper(() => useTimestamp());
    await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);

    const timestamp1 = await expectTimestamp(harness);
    const [result1, updateResult1] = harness.result.current;
    expect(result1).be.equal(timestamp1);

    // mine another block
    await mineBlock(harness.mockProvider);

    await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);
    const timestamp2 = await expectTimestamp(harness);
    const [result2, updateResult2] = harness.result.current;
    expect(result2).be.equal(timestamp2);
  });
});
