import { expect } from 'chai';

import { useEthersContext } from '~~/context';
import { hookTestWrapper } from '~~/helpers/test-utils';
import { const_DefaultTestChainId, defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { getTestSigners, MockConnector } from '~~/helpers/test-utils/wrapper';
import { IEthersContext } from '~~/models';

import 'test/helpers/chai-imports';

const TestHook = (): IEthersContext => {
  return useEthersContext();
};

describe('EthersAppContext', function () {
  describe('useEthersContext', function () {
    describe('Give that ethersContext is initalized', function () {
      it('When context is loaded; then it provides an initalized IEthersContext', async () => {
        const wrapper = await hookTestWrapper(() => TestHook());
        const context = wrapper.result.current;
        // signer and network data
        expect(context.connector).to.exist;
        expect(context.library).to.exist;
        expect(context.account).to.be.properAddress;
        expect(context.chainId).to.equal(const_DefaultTestChainId);
        expect(context.signer).not.be.undefined;

        // provider
        expect(context.provider).not.be.undefined;

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

      it('When openModal is called; then the old connector is deactivated and new connector is activated', async () => {
        const wrapper = await hookTestWrapper(() => TestHook());
        const firstContext = wrapper.result.current;
        expect(firstContext.chainId).to.equal(const_DefaultTestChainId);

        // open the modal
        firstContext.openModal(new MockConnector(wrapper.mockProvider));
        await wrapper.waitForNextUpdate(defaultBlockWaitOptions);

        expect((firstContext.connector as MockConnector).spyDeactivate.getCalls()).length.to.be.greaterThanOrEqual(1);

        const secondContext = wrapper.result.current;
        expect((secondContext.connector as MockConnector).spyActivate).to.be.calledOnce;
        expect(secondContext.active).to.be.true;
      });

      it('When activate is called; then the old connector is deactivated and new connector is activated', async () => {
        const wrapper = await hookTestWrapper(() => TestHook());
        const firstContext = wrapper.result.current;
        expect(firstContext.chainId).to.equal(const_DefaultTestChainId);

        // open the modal
        await firstContext.activate(new MockConnector(wrapper.mockProvider));

        expect((firstContext.connector as MockConnector).spyDeactivate.getCalls()).length.to.be.greaterThanOrEqual(1);

        const secondContext = wrapper.result.current;
        expect((secondContext.connector as MockConnector).spyActivate).to.be.calledOnce;
        expect(secondContext.active).to.be.true;
      });

      it('When disconnectModal is called; then the connector is deactivated', async () => {
        const wrappper = await hookTestWrapper(() => TestHook());
        const firstContext = wrappper.result.current;
        expect(firstContext.chainId).to.equal(const_DefaultTestChainId);

        // open the modal
        firstContext.disconnectModal();

        expect((firstContext.connector as MockConnector).spyDeactivate.getCalls()).length.be.greaterThanOrEqual(1);
        expect(wrappper.result.current.active).to.be.false;
      });

      it('When changeSigner is called; then the connector.changeSigner is called once', async () => {
        const wrapper = await hookTestWrapper(() => TestHook());
        const firstContext = wrapper.result.current;
        expect(firstContext.chainId).to.equal(const_DefaultTestChainId);

        const newSigner = (await getTestSigners(wrapper.mockProvider)).user2;
        expect(newSigner).to.exist;
        await firstContext.changeSigner?.(newSigner);

        expect((firstContext.connector as MockConnector).spyChangeSigner).to.be.calledOnce;
        expect((firstContext.connector as MockConnector).spyChangeSigner).to.be.calledWith(newSigner);
      });

      it('When setModalTheme is invoked with `dark`; then the connector.setModalTheme is called once with same value', async () => {
        const wrapper = await hookTestWrapper(() => TestHook());
        const firstContext = wrapper.result.current;
        expect(firstContext.chainId).to.equal(const_DefaultTestChainId);

        firstContext.setModalTheme?.('dark');

        expect((firstContext.connector as MockConnector).spySetModalTheme).to.be.calledOnce;
        expect((firstContext.connector as MockConnector).spySetModalTheme).to.be.calledWith('dark');
      });
    });
  });
});
