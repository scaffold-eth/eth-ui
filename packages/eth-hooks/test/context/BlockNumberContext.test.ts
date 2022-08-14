import { expect } from 'chai';

import { useBlockNumberContext } from '~~/context';
import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';

import 'test/helpers/chai-imports';

describe('BlockNumberContext', function () {
  describe('Give that context is initalized', function () {
    let initialBlockNumber = 0;

    before(async () => {
      const wrapper = await hookTestWrapper(() => useBlockNumberContext());
      initialBlockNumber = await wrapper.mockProvider.getBlockNumber();
      console.log('initial block number', initialBlockNumber);
    });

    it('When the hook called without a new block arriving; then useBlockNumberContext gets the current blockNumber', async () => {
      const wrapper = await hookTestWrapper(() => useBlockNumberContext());
      expect(initialBlockNumber).to.exist;
      expect(wrapper.result.current).to.equal(initialBlockNumber);
    });

    it('When the a new block arrives; then useBlockNumberContext updates to the latest value', async () => {
      const wrapper = await hookTestWrapper(() => useBlockNumberContext());
      expect(wrapper.result.all.length).equals(2);

      // mine a block
      await mineBlock(wrapper.mockProvider);
      await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions);
      expect(wrapper.result.current).equal(initialBlockNumber + 1);
      expect(wrapper.result.all.length).equals(4);

      // mine another block
      await mineBlock(wrapper.mockProvider);
      await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions);
      expect(wrapper.result.current).equal(initialBlockNumber + 2);

      expect(wrapper.result.all.length).equals(6);
    });
  });
});
