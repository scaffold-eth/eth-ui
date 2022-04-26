import { expect } from 'chai';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { expectValidWallets, fromEther } from '~~/helpers/test-utils/functions';
import { useNonce } from '~~/hooks';

import 'test/helpers/chai-imports';

describe('useNonce', function () {
  it('When an wallet performs an action; then it increments the nonce of the address', async () => {
    const wrapper = await hookTestWrapper((address: string) => useNonce(address ?? ''));
    const [wallet, secondWallet] = wrapper.mockProvider.getWallets();
    wrapper.rerender(wallet.address);

    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
    const [oldNonce] = wrapper.result.current;
    expect(oldNonce).be.greaterThanOrEqual(0);

    expectValidWallets(wallet, secondWallet);
    await wallet.sendTransaction({
      to: secondWallet.address,
      from: wallet.address,
      value: fromEther(0.1),
    });

    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
    const [newNonce] = wrapper.result.current;
    expect(newNonce).be.equal(oldNonce + 1);
  });
});
