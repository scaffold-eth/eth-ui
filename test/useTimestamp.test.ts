import { expect } from 'chai';
import { QueryStatus } from 'react-query';

import { hookTestWrapper, TTestHookResult } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';
import { useTimestamp } from '~~/hooks';

import 'test/helpers/chai-imports';

const expectTimestamp = async (
  wrapper: TTestHookResult<() => [timestamp: number, update: () => void, status: QueryStatus]>
): Promise<number> => {
  const blockNumber = await wrapper.mockProvider.getBlockNumber();
  expect(blockNumber).to.exist;
  const timestamp = (await wrapper.mockProvider.getBlock(blockNumber)).timestamp;
  expect(timestamp).be.greaterThan(0);
  return timestamp;
};

describe('useTimestamp', function () {
  it('When the hook is called; then it returns the current block timestamp', async () => {
    const wrapper = await hookTestWrapper(() => useTimestamp());
    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

    const timestamp1 = await expectTimestamp(wrapper);
    const [result1] = wrapper.result.current;
    expect(result1).be.equal(timestamp1);

    // mine another block
    await mineBlock(wrapper.mockProvider);

    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
    const timestamp2 = await expectTimestamp(wrapper);
    const [result2] = wrapper.result.current;
    expect(result2).be.equal(timestamp2);
  });
});
