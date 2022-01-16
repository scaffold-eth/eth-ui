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

  it('When the a new block arrives, useBlockNumberContext updates to the latest value', async () => {
    const harness = await hookTestWrapper(() => useBlockNumber(provider));

    // mine a block
    await mineBlock(harness.mockProvider);
    await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);
    expect(await harness.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 1);
    const [result1, updateResult1] = harness.result.current;
    expect(result1).equal(testStartBockNumber + 1);

    // mine another block
    await mineBlock(harness.mockProvider);
    await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);
    const [result2, updateResult2] = harness.result.current;
    expect(result2).equal(testStartBockNumber + 2);
    expect(await harness.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 2);
  });

  it('When the hook called without a new block arriving, useBlockNumber gets the current blockNumber', async () => {
    const harness = await hookTestWrapper(() => useBlockNumber(provider));

    const blockNumber = await harness.mockProvider.getBlockNumber();
    await harness.waitFor(() => harness.result.current[0] === blockNumber, defaultBlockWaitOptions);

    const [result, updateResult] = harness.result.current;
    expect(result).to.equal(testStartBockNumber);
  });
});
