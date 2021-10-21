import { expect } from 'chai';

import { hookTestHarness } from '~~/helpers/test-utils';
import { mineBlock } from '~~/helpers/test-utils/eth/hardhatActions';
import { useBlockNumber } from '~~/hooks';

describe('useBlockNumber', function () {
  it('When the provider receives a new block, then the block returns the block number', async () => {
    const harness = await hookTestHarness(() => useBlockNumber());
    let blockNumber: number | undefined = undefined;
    blockNumber = await harness.mockProvider.getBlockNumber();

    // mine a block
    await mineBlock(harness.mockProvider);
    await harness.waitForNextUpdate({ timeout: 10000 });
    expect(blockNumber).not.to.equal(harness.result.current);
    blockNumber = await harness.mockProvider.getBlockNumber();
    expect(harness.result.current).equal(blockNumber);

    // mine an another block
    await mineBlock(harness.mockProvider);
    await harness.waitForNextUpdate({ timeout: 10000 });
    expect(blockNumber).not.to.equal(harness.result.current);
    blockNumber = await harness.mockProvider.getBlockNumber();
    expect(harness.result.current).equal(blockNumber);
  });
});
