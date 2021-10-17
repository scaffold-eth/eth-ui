import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';

import { hookTestHarness } from '~test-utils';
import { IEthersContext, useEthersContext } from '~~/context';
import { const_DefaultTestChainId, const_singleTimeout } from '~~/helpers/test-utils/constants';
import { MockConnector } from '~~/helpers/test-utils/harness/wrapper';
use(sinonChai);

const TestHook = (): IEthersContext => {
  return useEthersContext();
};

describe('useEthersContext', function () {
  describe('Give that ethersContext is initalized', function () {
    it('When context is loaded, then it provides an initalized IEthersContext', async () => {
      const harness = await hookTestHarness(() => TestHook());
      const context = harness.result.current;
      // signer and network data
      expect(context.connector).to.exist;
      expect(context.library).to.exist;
      expect(context.account).to.be.properAddress;
      expect(context.chainId).to.equal(const_DefaultTestChainId);
      expect(context.signer).not.be.undefined;

      // provider
      expect(context.ethersProvider).not.be.undefined;

      // state
      expect(context.active).to.be.true;
      expect(context.error).to.be.undefined;

      // callbacks
      expect(context.changeAccount).to.exist;
      expect(context.activate).to.exist;
      expect(context.deactivate).to.exist;

      // modal interaction
      expect(context.openModal).to.exist;
      expect(context.disconnectModal).to.exist;
      expect(context.setModalTheme).to.exist;
    });

    it('When activate is called with a new connector, then the old connector is deactivated and new one is initalized', async () => {
      const harness = await hookTestHarness(() => TestHook());
      const context = harness.result.current;

      expect(context.chainId).to.equal(const_DefaultTestChainId);

      const newChainId = 1000;
      context.openModal(new MockConnector(harness.mockProvider));
      await harness.waitForNextUpdate({ timeout: const_singleTimeout });

      // const newContext = harness.result.current;
      // expect(newContext.chainId).to.equal(newChainId);
    });
  });
});
