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

    it('When openModal is called, then the old connector is deactivated and new connector is activated', async () => {
      const harness = await hookTestHarness(() => TestHook());
      const firstContext = harness.result.current;
      expect(firstContext.chainId).to.equal(const_DefaultTestChainId);

      // open the modal
      firstContext.openModal(new MockConnector(harness.mockProvider));
      await harness.waitForNextUpdate({ timeout: const_singleTimeout });

      expect((firstContext.connector as MockConnector).spyDeactivate.getCalls()).length.to.be.greaterThanOrEqual(1);

      const secondContext = harness.result.current;
      expect((secondContext.connector as MockConnector).spyActivate).to.be.calledOnce;
      expect(secondContext.active).to.be.true;
    });

    it('When disconnectModal is called, then the connector is deactivated', async () => {
      const harness = await hookTestHarness(() => TestHook());
      const firstContext = harness.result.current;
      expect(firstContext.chainId).to.equal(const_DefaultTestChainId);

      // open the modal
      firstContext.disconnectModal();

      expect((firstContext.connector as MockConnector).spyDeactivate.getCalls()).length.to.be.greaterThanOrEqual(1);
      expect(harness.result.current.active).to.be.false;
    });
  });
});
