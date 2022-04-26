import { expect } from 'chai';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';
import { currentTestBlockNumber, wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper/hardhatTestHelpers';
import { useBlockNumber } from '~~/hooks';
import { TEthersProvider } from '~~/models';

import 'test/helpers/chai-imports';

describe('useBlockNumber', function () {
  let provider: TEthersProvider;
  before(async () => {
    const wrapper = await wrapperTestSetupHelper();
    provider = wrapper.mockProvider;
  });

  let testStartBockNumber = 0;
  beforeEach(async () => {
    testStartBockNumber = await currentTestBlockNumber();
  });

  it('When the a new block arrives, useBlockNumberContext updates to the latest value', async () => {
    const wrapper = await hookTestWrapper(() => useBlockNumber(provider));

    // mine a block
    await mineBlock(wrapper.mockProvider);
    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
    expect(await wrapper.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 1);
    const [result1] = wrapper.result.current;
    expect(result1).equal(testStartBockNumber + 1);

    // mine another block
    await mineBlock(wrapper.mockProvider);
    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
    const [result2] = wrapper.result.current;
    expect(result2).equal(testStartBockNumber + 2);
    expect(await wrapper.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 2);
  });

  it('When the hook called without a new block arriving, useBlockNumber gets the current blockNumber', async () => {
    const wrapper = await hookTestWrapper(() => useBlockNumber(provider));

    const blockNumber = await wrapper.mockProvider.getBlockNumber();
    await wrapper.waitFor(() => wrapper.result.current[0] === blockNumber, defaultBlockWaitOptions);

    const [result] = wrapper.result.current;
    expect(result).to.equal(testStartBockNumber);
  });
});
