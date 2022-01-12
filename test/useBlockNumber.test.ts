import { expect } from 'chai';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';
import { currentTestBlockNumber, wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper/hardhatTestHelpers';
import { useBlockNumber } from '~~/hooks';
import { TEthersProvider } from '~~/models';

describe('useBlockNumber', function () {
  let provider: TEthersProvider;
  before(async () => {
    const harness = await wrapperTestSetupHelper();
    provider = harness.mockProvider;
  });

  let testStartBockNumber = 0;
  beforeEach(async () => {
    testStartBockNumber = await currentTestBlockNumber();
  });

  it.skip('When the hook called without a new block arriving, useBlockNumber gets the current blockNumber', async () => {
    const harness = await hookTestWrapper(() => useBlockNumber(provider));
    expect(await harness.mockProvider.getBlockNumber()).to.exist;
    await harness.waitForNextUpdate(defaultBlockWaitOptions);
    const [result, updateResult] = harness.result.current;
    expect(result).to.equal(testStartBockNumber);
  });

  it('When the a new block arrives, useBlockNumberContext updates to the latest value', async () => {
    const harness = await hookTestWrapper(() => useBlockNumber(provider));

    // mine a block
    await mineBlock(harness.mockProvider);
    await harness.waitForNextUpdate(defaultBlockWaitOptions);
    expect(await harness.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 1);
    const [result1, updateResult1] = harness.result.current;
    expect(result1).equal(testStartBockNumber + 1);

    // mine another block
    await mineBlock(harness.mockProvider);
    await harness.waitForNextUpdate(defaultBlockWaitOptions);
    const [result2, updateResult2] = harness.result.current;
    expect(result2).equal(testStartBockNumber + 2);
    expect(await harness.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 2);
  });

  // describe('Given when polling', function () {
  //   it('When a new block arrives, useBlockNumberContext updates to the latest value', async () => {
  //     const harness = await hookTestWrapper(() => useBlockNumber(provider, 12000));

  //     // mine a block
  //     await mineBlock(harness.mockProvider);
  //     await harness.waitForNextUpdate({ ...defaultBlockWaitOptions, timeout: 20000 });
  //     expect(await harness.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 1);
  //     expect(harness.result.current).equal(testStartBockNumber + 1);
  //   });
  // });
});
