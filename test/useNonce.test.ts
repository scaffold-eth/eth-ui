import { expect } from 'chai';

import { hookTestHarness } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { fromEther } from '~~/helpers/test-utils/functions';
import { useNonce } from '~~/hooks';

describe('useNonce', function () {
  it('When an wallet performs an action; then it increments the nonce', async () => {
    const harness = await hookTestHarness((address: string) => useNonce(address ?? ''));
    const [wallet, secondWallet] = harness.mockProvider.getWallets();
    harness.rerender(wallet.address);

    const oldNonce = harness.result.current;
    expect(oldNonce).be.greaterThanOrEqual(0);

    await wallet.sendTransaction({
      to: secondWallet.address,
      value: fromEther(0.1),
    });

    await harness.waitForNextUpdate(defaultBlockWaitOptions);
    const newNonce = harness.result.current;
    expect(newNonce).be.equal(oldNonce + 1);

    const blockNumber = await harness.mockProvider.getBlockNumber();
    expect(blockNumber).to.exist;
    const nonce = (await harness.mockProvider.getBlock(blockNumber)).nonce;
  });
});
