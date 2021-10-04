import { expect } from 'chai';

import { getMockProvider } from '~test-utils/harness/getMockProvider';
import { renderTestHook } from '~test-utils/harness/renderTestHook';
import { mineBlock } from '~test-utils/hooks/hardhatActions';
import { useBlockNumber } from '~~/useBlockNumber';

describe('useBlockNumber', function () {
  it('When the provider receives a new block, then the block returns the block number', async () => {
    const mockProvider = getMockProvider();
    const hook = renderTestHook(mockProvider, () => useBlockNumber());
    hook.rerender(mockProvider);

    let blockNumber = await mockProvider.getBlockNumber();

    // mine a block
    await mineBlock(mockProvider);
    await hook.waitForNextUpdate({ timeout: 10000 });
    expect(blockNumber).not.equal(hook.result.current);

    blockNumber = await mockProvider.getBlockNumber();
    expect(hook.result.current).equal(blockNumber);

    // mine an another block
    await mineBlock(mockProvider);
    await hook.waitForNextUpdate({ timeout: 10000 });
    expect(blockNumber).not.equal(hook.result.current);

    blockNumber = await mockProvider.getBlockNumber();
    expect(hook.result.current).equal(blockNumber);
  });
});
