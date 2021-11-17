import { expect } from 'chai';

import { hookTestHarness } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';
import { currentTestBlockNumber, harnessTestSetupHelper } from '~~/helpers/test-utils/harness/hardhatTestHelpers';
import { useBlockNumber } from '~~/hooks';
import { TEthersProvider } from '~~/models';

describe('useBlockNumber', function () {
  let provider: TEthersProvider;
  before(async () => {
    const harness = await harnessTestSetupHelper();
    provider = harness.mockProvider;
  });

  let testStartBockNumber = 0;
  beforeEach(async () => {
    testStartBockNumber = await currentTestBlockNumber();
  });

  it.skip('When the hook called without a new block arriving, useBlockNumber gets the current blockNumber', async () => {
    const harness = await hookTestHarness(() => useBlockNumber(provider));
    expect(await harness.mockProvider.getBlockNumber()).to.exist;
    await harness.waitForNextUpdate(defaultBlockWaitOptions);
    expect(harness.result.current).to.equal(testStartBockNumber);
  });

  it('When the a new block arrives, useBlockNumberContext updates to the latest value', async () => {
    const harness = await hookTestHarness(() => useBlockNumber(provider));

    // mine a block
    await mineBlock(harness.mockProvider);
    await harness.waitForNextUpdate(defaultBlockWaitOptions);
    expect(await harness.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 1);
    expect(harness.result.current).equal(testStartBockNumber + 1);

    // mine another block
    await mineBlock(harness.mockProvider);
    await harness.waitForNextUpdate(defaultBlockWaitOptions);
    expect(harness.result.current).equal(testStartBockNumber + 2);
    expect(await harness.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 2);
  });

  describe('Given when polling', function () {
    it('When a new block arrives, useBlockNumberContext updates to the latest value', async () => {
      const harness = await hookTestHarness(() => useBlockNumber(provider, 12000));

      // mine a block
      await mineBlock(harness.mockProvider);
      await harness.waitForNextUpdate({ ...defaultBlockWaitOptions, timeout: 20000 });
      expect(await harness.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 1);
      expect(harness.result.current).equal(testStartBockNumber + 1);
    });
  });
});
