import { expect } from 'chai';
import { BigNumber, Signer } from 'ethers';

import { useTokenBalance } from '~~/hooks/erc';
import { getHardhatSigner, hookTestWrapper, wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper';
import { BasicERC20Contract } from '../test-files/__mocks__/generated/contract-types';
import { setupMockBasicERC20Contract } from '../test-files/__mocks__/setupMockContracts';
import { expectValidWallets } from '~~/helpers/test-utils/functions';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';

describe('useTokenBalance', function () {
  describe('Given ERC20 address is deployed', function () {
    let contractSigner: Signer;
    let basicERC20Contract: BasicERC20Contract;

    beforeEach(async () => {
      const harness = await wrapperTestSetupHelper();
      contractSigner = await getHardhatSigner(harness.mockProvider, 1);
      basicERC20Contract = await setupMockBasicERC20Contract(contractSigner);
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
      const amountOfTokensInWallet = 200;
      const harness = await hookTestWrapper((address: string) => useTokenBalance(basicERC20Contract, address));
      const [wallet, walletOfERC20TokenSigner] = harness.mockProvider.getWallets();
      await basicERC20Contract.transfer(wallet.address, amountOfTokensInWallet, {
        from: walletOfERC20TokenSigner.address,
      });
      const walletsBalance = await basicERC20Contract.balanceOf(wallet.address);

      expectValidWallets(wallet, walletOfERC20TokenSigner);

      // When
      harness.rerender(wallet.address);
      await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);

      // Then
      const [result] = harness.result.current;
      expect(result).be.equal(walletsBalance).be.equal(amountOfTokensInWallet);
    });
  });
});
