import { expect } from 'chai';

import { hookTestHarness } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { useTimestamp } from '~~/hooks';

describe('useTimestamp', function () {
  it('When the hook is called; then it returns the current block timestamp', async () => {
    const harness = await hookTestHarness(() => useTimestamp());
    await harness.waitForNextUpdate(defaultBlockWaitOptions);

    const blockNumber = await harness.mockProvider.getBlockNumber();
    expect(blockNumber).to.exist;
    const timestamp = (await harness.mockProvider.getBlock(blockNumber)).timestamp;
    expect(harness.result.current).be.equal(timestamp);
  });
});
