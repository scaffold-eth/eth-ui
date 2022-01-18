import { expect } from 'chai';
import { Signer } from 'ethers';
import sinon from 'ts-sinon';

import { useTokenBalance } from '~~/hooks/erc';
import { getHardhatSigner, hookTestWrapper, wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper';
import { BasicERC20Contract } from '../test-files/__mocks__/generated/contract-types';
import { setupMockBasicERC20Contract } from '../test-files/__mocks__/setupMockContracts';
import { expectValidWallets } from '~~/helpers/test-utils/functions';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';
import * as hookHelpers from '~~/functions/hookHelpers';

describe('useTokenBalance', function () {
  describe('Given ERC20 address is deployed', function () {
    let contractSigner: Signer;
    let basicERC20Contract: BasicERC20Contract;
    let sandbox: sinon.SinonSandbox;

    beforeEach(async () => {
      const harness = await wrapperTestSetupHelper();
      contractSigner = await getHardhatSigner(harness.mockProvider, 1);
      basicERC20Contract = await setupMockBasicERC20Contract(contractSigner);
    });

    afterEach(() => {
      sandbox?.restore();
    });

    it(`When the hook is called; then returns address's balance of given ERC20 token`, async () => {
      // Given
      const harness = await hookTestWrapper((address: string) => useTokenBalance(basicERC20Contract, address));
      const [wallet] = harness.mockProvider.getWallets();
      expectValidWallets(wallet);

      // When
      harness.rerender(wallet.address);
      await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);

      // Then
      const [result] = harness.result.current;
      expect(result).be.equal(0);
    });

    it('When wallet balances changes; then the hook returns the new balance', async () => {
      // Given
      const amountOfTokensTransferringToWallet = 200;
      const harness = await hookTestWrapper((address: string) => useTokenBalance(basicERC20Contract, address));
      const [wallet, walletOfERC20TokenSigner] = harness.mockProvider.getWallets();
      expectValidWallets(wallet, walletOfERC20TokenSigner);
      await basicERC20Contract.transfer(wallet.address, amountOfTokensTransferringToWallet, {
        from: walletOfERC20TokenSigner.address,
      });
      const walletsBalanceAfterTransfer = await basicERC20Contract.balanceOf(wallet.address);

      // When
      harness.rerender(wallet.address);
      await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);

      // Then
      const [result] = harness.result.current;
      expect(result).be.equal(walletsBalanceAfterTransfer).be.equal(amountOfTokensTransferringToWallet);
    });

    it('When given options of block number interval to update; then the hook does not update until that amount of blocks has passed', async () => {
      // Given
      const initialAmountOfTokensInWallet = 0;
      const amountOfTokensTransferringToWallet = 150;
      const blockIntervalToUpdate = 7;
      const harness = await hookTestWrapper((address: string) =>
        useTokenBalance(basicERC20Contract, address, { blockNumberInterval: blockIntervalToUpdate })
      );
      const [wallet, walletOfERC20TokenSigner] = harness.mockProvider.getWallets();
      expectValidWallets(wallet, walletOfERC20TokenSigner);
      // -- start with 0 from useTokenBalance
      harness.rerender(wallet.address);
      await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);
      expect(harness.result.current[0]).be.equal(initialAmountOfTokensInWallet); // Just ensures test is set up correctly
      await basicERC20Contract.transfer(wallet.address, amountOfTokensTransferringToWallet, {
        from: walletOfERC20TokenSigner.address,
      });
      const walletsBalanceAfterTransfer = await basicERC20Contract.balanceOf(wallet.address);
      // -- mine blocks up to block when update should occur
      let currentBlockNumber = await harness.mockProvider.getBlockNumber();
      while (currentBlockNumber % blockIntervalToUpdate !== 0) {
        await mineBlock(harness.mockProvider);
        currentBlockNumber = await harness.mockProvider.getBlockNumber();
        harness.rerender(wallet.address);
        await harness.waitForNextUpdate(defaultBlockWaitOptions);

        // -- ensures no update before correct block
        expect(harness.result.current[0]).be.equal(initialAmountOfTokensInWallet);
      }

      // -- mine final block
      await mineBlock(harness.mockProvider);

      // When
      harness.rerender(wallet.address);
      await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);

      // Then
      const [result] = harness.result.current;
      expect(result).be.equal(walletsBalanceAfterTransfer).be.equal(amountOfTokensTransferringToWallet);
    });

    it('When given option for polling; then passes refetchInterval to useQuery', async () => {
      // Given
      // -- turn off checkUpdateOptions to allow for lower refetchInterval time
      sandbox = sinon.createSandbox();
      sandbox.stub(hookHelpers, 'checkUpdateOptions').returns();

      const initialAmountOfTokensInWallet = 0;
      const amountOfTokensTransferringToWallet = 160;
      const updateOptions = {
        refetchInterval: 2_000, // Note this is below 10_000 limit just for testing
        blockNumberInterval: undefined,
      };
      const harness = await hookTestWrapper((address: string) =>
        useTokenBalance(basicERC20Contract, address, updateOptions)
      );
      const [wallet, walletOfERC20TokenSigner] = harness.mockProvider.getWallets();
      expectValidWallets(wallet, walletOfERC20TokenSigner);
      await basicERC20Contract.transfer(wallet.address, amountOfTokensTransferringToWallet, {
        from: walletOfERC20TokenSigner.address,
      });
      const walletsBalanceAfterTransfer = await basicERC20Contract.balanceOf(wallet.address);
      // -- ensure mining block doesn't trigger update
      await mineBlock(harness.mockProvider);
      // -- ensure doesn't update before refetchInterval time
      try {
        await harness.waitForValueToChange(() => harness.result.current[0], {
          timeout: updateOptions.refetchInterval,
          interval: 200,
        });
        expect.fail();
      } catch (e: any) {
        expect(e.message).contain('Timed out');
        expect(harness.result.current[0]).be.equal(initialAmountOfTokensInWallet);
      }

      // When
      harness.rerender(wallet.address);
      await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);

      // Then
      const [result] = harness.result.current;
      expect(result).be.equal(walletsBalanceAfterTransfer).be.equal(amountOfTokensTransferringToWallet);
    });

    it('When given option for refetchInterval and blockNumberInterval; then throws error', async () => {
      // Given
      const updateOptions = {
        refetchInterval: 11_000,
        blockNumberInterval: 5,
      };
      try {
        // When
        const harness = await hookTestWrapper((address: string) =>
          useTokenBalance(basicERC20Contract, address, updateOptions)
        );
        // -- required to ensure invariant is hit
        await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);
      } catch (e: any) {
        // Then
        expect(e.message).be.equal(
          'You cannot use both refetchInterval (polling) and blockNumberInterval at the same time'
        );
        return;
      }

      expect.fail(); // Fails if hits this point
    });

    it('When given option for refetchInterval < 10000; then throws error', async () => {
      // Given
      const updateOptions = {
        refetchInterval: 2_000,
        blockNumberInterval: undefined,
      };
      try {
        // When
        const harness = await hookTestWrapper((address: string) =>
          useTokenBalance(basicERC20Contract, address, updateOptions)
        );
        // -- required to ensure invariant is hit
        await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);
      } catch (e: any) {
        // Then
        expect(e.message).be.equal(
          'Invalid refetchInterval (polling), must be at least 10000ms or undefined (disabled)'
        );
        return;
      }

      expect.fail(); // Fails if hits this point
    });

    it('When given option for blockNumberInterval <= 0; then throws error', async () => {
      // Given
      const updateOptions = {
        blockNumberInterval: 0,
      };
      try {
        // When
        const harness = await hookTestWrapper((address: string) =>
          useTokenBalance(basicERC20Contract, address, updateOptions)
        );
        // -- required to ensure invariant is hit
        await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);
      } catch (e: any) {
        // Then
        expect(e.message).be.equal('Invalid blockNumberInterval, must be greater than 0');
        return;
      }

      expect.fail(); // Fails if hits this point
    });
  });
});
