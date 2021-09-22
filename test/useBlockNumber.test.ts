import { waitFor } from '@testing-library/react';
import { expect } from 'chai';
import { MockProvider } from 'ethereum-waffle';

import { mineBlock as mineBlock } from '~helpers/hardhatActions';
import { mockProvider, renderTestHook } from '~helpers/renderTestHook';
import { useBlockNumber } from '~~/useBlockNumber';

describe('useBlockNumber', function () {
  it('When the provider receives a new block, then the block returns the block number', async function () {
    const hook = renderTestHook((mockProvider: MockProvider) => useBlockNumber(mockProvider));
    hook.rerender(mockProvider);

    await mineBlock(mockProvider);
    await waitFor(async () => expect(await mockProvider.getBlockNumber()).equal(1));
    await hook.waitForNextUpdate({ timeout: 10000 });
    expect(hook.result.current).equal(1);

    await mineBlock(mockProvider);
    await waitFor(async () => expect(await mockProvider.getBlockNumber()).equal(2));
    await hook.waitForNextUpdate({ timeout: 10000 });

    expect(hook.result.current).equal(2);
  });
});
