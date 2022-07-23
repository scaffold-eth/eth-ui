import { expect } from 'chai';
import { Signer } from 'ethers';
import sinon from 'ts-sinon';

import { BasicERC20Contract } from '../test-files/__mocks__/generated/contract-types';
import { setupMockBasicERC20Contract } from '../test-files/__mocks__/setupMockContracts';

import * as hookHelpers from '~~/functions/hookHelpers';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';
import { expectValidWallets, shouldFailWithMessage } from '~~/helpers/test-utils/functions';
import { waitForExpect } from '~~/helpers/test-utils/functions/mochaHelpers';
import { getTestSigners, hookTestWrapper, wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper';
import { useTokenBalance } from '~~/hooks/erc';

import 'test/helpers/chai-imports';

describe('useTokenBalance', function () {
  describe('Given ERC20 address is deployed', function () {
    let contractSigner: Signer;
    let basicERC20Contract: BasicERC20Contract;
    let sandbox: sinon.SinonSandbox;

    beforeEach(async () => {
      const wrapper = await wrapperTestSetupHelper();
      contractSigner = (await getTestSigners(wrapper.mockProvider)).user1;
      basicERC20Contract = await setupMockBasicERC20Contract(contractSigner);
    });

    afterEach(() => {
      sandbox?.restore();
    });

    it(`When the hook is called; then returns address's balance of given ERC20 token`, async () => {
      // ::Given::
      const wrapper = await hookTestWrapper((address: string) => useTokenBalance(basicERC20Contract, address));
      const [wallet] = wrapper.mockProvider.getWallets();
      expectValidWallets(wallet);

      // ::When::
      wrapper.rerender(wallet.address);
      await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

      // ::Then::
      const [result] = wrapper.result.current;
      expect(result).be.equal(0);
    });

    it('When wallet balances changes; then the hook returns the new balance', async () => {
      // ::Given::
      const amountOfTokensTransferringToWallet = 200;
      const wrapper = await hookTestWrapper((address: string) => useTokenBalance(basicERC20Contract, address));
      const [wallet, walletOfERC20TokenSigner] = wrapper.mockProvider.getWallets();
      expectValidWallets(wallet, walletOfERC20TokenSigner);
      await basicERC20Contract.transfer(wallet.address, amountOfTokensTransferringToWallet, {
        from: walletOfERC20TokenSigner.address,
      });
      const walletsBalanceAfterTransfer = await basicERC20Contract.balanceOf(wallet.address);

      // ::When::
      wrapper.rerender(wallet.address);
      await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

      // ::Then::
      const [result] = wrapper.result.current;
      expect(result).be.equal(walletsBalanceAfterTransfer).be.equal(amountOfTokensTransferringToWallet);
    });

    it('When given options of block number interval to update; then the hook does not update until that amount of blocks has passed', async () => {
      // ::Given::
      const initialAmountOfTokensInWallet = 0;
      const amountOfTokensTransferringToWallet = 150;
      const blockIntervalToUpdate = 4;
      const wrapper = await hookTestWrapper((address: string) =>
        useTokenBalance(basicERC20Contract, address, { blockNumberInterval: blockIntervalToUpdate })
      );
      const [wallet, walletOfERC20TokenSigner] = wrapper.mockProvider.getWallets();
      expectValidWallets(wallet, walletOfERC20TokenSigner);
      // start with 0 from useTokenBalance
      wrapper.rerender(wallet.address);
      await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
      expect(wrapper.result.current[0]).be.equal(initialAmountOfTokensInWallet); // Just ensures test is set up correctly
      await basicERC20Contract.transfer(wallet.address, amountOfTokensTransferringToWallet, {
        from: walletOfERC20TokenSigner.address,
      });
      const walletsBalanceAfterTransfer = await basicERC20Contract.balanceOf(wallet.address);
      // mine blocks up to block when update should occur
      let currentBlockNumber = await wrapper.mockProvider.getBlockNumber();
      while (currentBlockNumber % blockIntervalToUpdate !== blockIntervalToUpdate - 1) {
        await mineBlock(wrapper.mockProvider);
        currentBlockNumber = await wrapper.mockProvider.getBlockNumber();
        wrapper.rerender(wallet.address);
        await wrapper.waitForNextUpdate(defaultBlockWaitOptions);

        console.log(wrapper.result.current, currentBlockNumber, blockIntervalToUpdate);
        expect(wrapper.result.current[0]).be.equal(initialAmountOfTokensInWallet);
      }

      // mine final block
      await mineBlock(wrapper.mockProvider);

      // ::When::
      wrapper.rerender(wallet.address);
      // ::Then::
      await waitForExpect(() => {
        const [result] = wrapper.result.current;
        expect(result).be.equal(walletsBalanceAfterTransfer).be.equal(amountOfTokensTransferringToWallet);
      }, defaultBlockWaitOptions);
    });

    it.skip('When given option for refetchInterval; then ensures result is not returned before refetchInterval', async () => {
      // ::Given::
      // turn off checkUpdateOptions to allow for lower refetchInterval time
      sandbox = sinon.createSandbox();
      sandbox.stub(hookHelpers, 'checkUpdateOptions').returns();

      const initialAmountOfTokensInWallet = 0;
      const amountOfTokensTransferringToWallet = 160;
      const updateOptions = {
        refetchInterval: 2_000, // Note this is below 10_000 limit just for testing
        blockNumberInterval: undefined,
      };
      const wrapper = await hookTestWrapper((address: string) =>
        useTokenBalance(basicERC20Contract, address, updateOptions)
      );
      const [wallet, walletOfERC20TokenSigner] = wrapper.mockProvider.getWallets();
      expectValidWallets(wallet, walletOfERC20TokenSigner);
      await basicERC20Contract.transfer(wallet.address, amountOfTokensTransferringToWallet, {
        from: walletOfERC20TokenSigner.address,
      });
      const walletsBalanceAfterTransfer = await basicERC20Contract.balanceOf(wallet.address);
      // ensure mining block doesn't trigger update
      await mineBlock(wrapper.mockProvider);
      // ensure doesn't update before refetchInterval time
      try {
        await wrapper.waitForValueToChange(() => wrapper.result.current[0], {
          timeout: updateOptions.refetchInterval - 100,
          interval: 200,
        });
        expect.fail();
      } catch (e: any) {
        expect(e.message).contain('Timed out');
        expect(wrapper.result.current[0]).be.equal(initialAmountOfTokensInWallet);
      }

      // ::When::
      wrapper.rerender(wallet.address);
      await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

      // ::Then::
      const [result] = wrapper.result.current;
      expect(result).be.equal(walletsBalanceAfterTransfer).be.equal(amountOfTokensTransferringToWallet);
    });

    it('When given option for refetchInterval and blockNumberInterval; then throws error', async () => {
      // ::Given::
      const updateOptions = {
        refetchInterval: 11_000,
        blockNumberInterval: 5,
      };
      const wrapper = await hookTestWrapper((address: string) =>
        useTokenBalance(basicERC20Contract, address, updateOptions)
      );

      await shouldFailWithMessage(
        async () => await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions),
        'You cannot use both refetchInterval (polling) and blockNumberInterval at the same time'
      );
    });

    it('When given option for refetchInterval < 10000; then throws error', async () => {
      // ::Given::
      const updateOptions = {
        refetchInterval: 2_000,
        blockNumberInterval: undefined,
      };
      const wrapper = await hookTestWrapper((address: string) =>
        useTokenBalance(basicERC20Contract, address, updateOptions)
      );

      await shouldFailWithMessage(
        async () => await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions),
        'Invalid refetchInterval (polling), must be at least 10000ms or undefined (disabled)'
      );
    });

    it('When given option for blockNumberInterval <= 0; then throws error', async () => {
      // ::Given::
      const updateOptions = {
        blockNumberInterval: 0,
      };
      const wrapper = await hookTestWrapper((address: string) =>
        useTokenBalance(basicERC20Contract, address, updateOptions)
      );

      await shouldFailWithMessage(
        async () => await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions),
        'Invalid blockNumberInterval, must be greater than 0'
      );
    });
  });
});
