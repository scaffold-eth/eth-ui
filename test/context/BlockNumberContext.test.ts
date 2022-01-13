import { expect, use } from 'chai';
import * as sinonChai from 'sinon-chai';

import { useBlockNumberContext } from '~~/context';
import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';

use(sinonChai);
describe('BlockNumberContext', function () {
  describe('Give that context is initalized', function () {
    let initialBlockNumber = 0;

    before(async () => {
      const harness = await hookTestWrapper(() => useBlockNumberContext());
      initialBlockNumber = await harness.mockProvider.getBlockNumber();
      console.log('initial block number', initialBlockNumber);
    });

    it('When the hook called without a new block arriving; then useBlockNumberContext gets the current blockNumber', async () => {
      const harness = await hookTestWrapper(() => useBlockNumberContext());
      expect(harness.result.current).to.equal(0);
      expect(await harness.mockProvider.getBlockNumber()).to.exist;
      expect(initialBlockNumber).to.exist;
      expect(harness.result.all.length).equals(1);
    });

    it('When the a new block arrives; then useBlockNumberContext updates to the latest value', async () => {
      const harness = await hookTestWrapper(() => useBlockNumberContext());
      expect(harness.result.all.length).equals(1);

      // mine a block
      await mineBlock(harness.mockProvider);
      await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
      expect(harness.result.current).equal(initialBlockNumber + 1);
      expect(harness.result.all.length).equals(2);

      // mine another block
      await mineBlock(harness.mockProvider);
      await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
      expect(harness.result.current).equal(initialBlockNumber + 2);

      expect(harness.result.all.length).equals(3);
    });
  });
});
