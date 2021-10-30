/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect, use } from 'chai';
import * as sinonChai from 'sinon-chai';

import { IEthersContext, useEthersContext } from '~~/context';
import { hookTestHarness } from '~~/helpers/test-utils';
import {
  const_DefaultTestChainId,
  const_singleTimeout,
  defaultBlockWaitOptions,
} from '~~/helpers/test-utils/constants';
import { getHardhatAccount } from '~~/helpers/test-utils/harness';
import { MockConnector } from '~~/helpers/test-utils/harness/wrapper';

use(sinonChai);

const TestHook = (): IEthersContext => {
  return useEthersContext();
};

describe('EthersAppContext', function () {
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
        expect(context.changeSigner).to.exist;
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
        await harness.waitForNextUpdate(defaultBlockWaitOptions);

        expect((firstContext.connector as MockConnector).spyDeactivate.getCalls()).length.to.be.greaterThanOrEqual(1);

        const secondContext = harness.result.current;
        expect((secondContext.connector as MockConnector).spyActivate).to.be.calledOnce;
        expect(secondContext.active).to.be.true;
      });

      it('When activate is called, then the old connector is deactivated and new connector is activated', async () => {
        const harness = await hookTestHarness(() => TestHook());
        const firstContext = harness.result.current;
        expect(firstContext.chainId).to.equal(const_DefaultTestChainId);

        // open the modal
        await firstContext.activate(new MockConnector(harness.mockProvider));

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

        expect((firstContext.connector as MockConnector).spyDeactivate.getCalls()).length.be.greaterThanOrEqual(1);
        expect(harness.result.current.active).to.be.false;
      });

      it('When changeSigner is called, then the connector.changeSigner is called once', async () => {
        const harness = await hookTestHarness(() => TestHook());
        const firstContext = harness.result.current;
        expect(firstContext.chainId).to.equal(const_DefaultTestChainId);

        const newAccount = await getHardhatAccount(harness.mockProvider, 2);
        const newSigner = firstContext.ethersProvider!.getSigner(newAccount);
        expect(newSigner).to.exist;
        await firstContext.changeSigner?.(newSigner);

        expect((firstContext.connector as MockConnector).spyChangeSigner).to.be.calledOnce;
        expect((firstContext.connector as MockConnector).spyChangeSigner).to.be.calledWith(newSigner);
      });

      it('When setModalTheme is invoked with `dark`, then the connector.setModalTheme is called once with same value', async () => {
        const harness = await hookTestHarness(() => TestHook());
        const firstContext = harness.result.current;
        expect(firstContext.chainId).to.equal(const_DefaultTestChainId);

        firstContext.setModalTheme?.('dark');

        expect((firstContext.connector as MockConnector).spySetModalTheme).to.be.calledOnce;
        expect((firstContext.connector as MockConnector).spySetModalTheme).to.be.calledWith('dark');
      });
    });
  });
});
