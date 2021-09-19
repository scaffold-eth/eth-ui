import { getMockProvider } from '~helpers/getMockProvider';
import { renderTestHook } from '~helpers/renderTestHook';
import { useBlockNumber } from '~~/useBlockNumber';

describe('useBlockNumber', () => {
  const mockProvider = getMockProvider();
  it('When the provider receives a new block, then the block returns the block number', () => {
    const test = renderTestHook(() => useBlockNumber(mockProvider));

    console.log(test.result.current);
    // waitFor(()=> expect)
  });
});
