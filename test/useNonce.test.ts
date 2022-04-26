import { expect } from 'chai';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { expectValidWallets, fromEther } from '~~/helpers/test-utils/functions';
import { useNonce } from '~~/hooks';

import 'test/helpers/chai-imports';

describe('useNonce', function () {
  it('When an wallet performs an action; then it increments the nonce of the address', async () => {
    const harness = await hookTestWrapper((address: string) => useNonce(address ?? ''));
    const [wallet, secondWallet] = harness.mockProvider.getWallets();
    harness.rerender(wallet.address);

    await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);
    const [oldNonce] = harness.result.current;
    expect(oldNonce).be.greaterThanOrEqual(0);

    expectValidWallets(wallet, secondWallet);
    await wallet.sendTransaction({
      to: secondWallet.address,
      from: wallet.address,
      value: fromEther(0.1),
    });

    await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);
    const [newNonce] = harness.result.current;
    expect(newNonce).be.equal(oldNonce + 1);
  });
});
