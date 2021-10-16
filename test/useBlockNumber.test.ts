import { expect } from 'chai';

import { renderTestHook } from '~test-utils/harness/renderTestHarness';
import { mineBlock } from '~test-utils/hooks/hardhatActions';
import { useBlockNumber } from '~~/useBlockNumber';

describe('useBlockNumber', function () {
  it.only('When the provider receives a new block, then the block returns the block number', async () => {
    const harness = await renderTestHook(() => useBlockNumber());
    let blockNumber: number | undefined = undefined;
    blockNumber = await harness.mockProvider.getBlockNumber();

    // mine a block
    await mineBlock(harness.mockProvider);
    await harness.waitForNextUpdate({ timeout: 10000 });
    expect(blockNumber).not.equal(harness.result.current);
    blockNumber = await harness.mockProvider.getBlockNumber();
    expect(harness.result.current).equal(blockNumber);

    // mine an another block
    await mineBlock(harness.mockProvider);
    await harness.waitForNextUpdate({ timeout: 10000 });
    expect(blockNumber).not.equal(harness.result.current);
    blockNumber = await harness.mockProvider.getBlockNumber();
    expect(harness.result.current).equal(blockNumber);
  });
});
