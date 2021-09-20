import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import { MockProvider } from 'ethereum-waffle';

import { mineBlock as mineBlock } from '~helpers/mockProviderActions';
import { mockProvider } from '~helpers/renderTestHook';
import { useBlockNumber } from '~~/useBlockNumber';

describe('useBlockNumber', function () {
  it('When the provider receives a new block, then the block returns the block number', async function () {
    // await waitFor(() => expect(test.result.current).equal(1));
    // await waitFor(async () => expect(await mockProvider.getBlockNumber()).equal(1));

    const hook = renderHook((mockProvider: MockProvider) => useBlockNumber(mockProvider));

    await mineBlock(mockProvider);
    await waitFor(async () => expect(await mockProvider.getBlockNumber()).equal(1));
    hook.rerender(mockProvider);
    await waitFor(() => {
      expect(hook.result.current).equal(1);
    });

    await mineBlock(mockProvider);
    await waitFor(async () => expect(await mockProvider.getBlockNumber()).equal(2));
    hook.rerender(mockProvider);
    await waitFor(
      () => {
        expect(hook.result.current).equal(2);
      },
      { timeout: 10000 }
    );
  });
});
