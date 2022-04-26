import 'test/helpers/chai-imports';
import { expect } from 'chai';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { expectValidWallets, fromEther } from '~~/helpers/test-utils/functions';
import { waitForExpect } from '~~/helpers/test-utils/functions/mochaHelpers';
import { useNonce } from '~~/hooks';

describe('useNonce', function () {
  it('When an wallet performs an action; then it increments the nonce of the address', async () => {
    const wrapper = await hookTestWrapper((address: string) => useNonce(address ?? ''));
    const [wallet, secondWallet] = wrapper.mockProvider.getWallets();
    wrapper.rerender(wallet.address);

    let [oldNonce] = wrapper.result.current;
    await waitForExpect(() => {
      [oldNonce] = wrapper.result.current;
      expect(oldNonce).be.greaterThanOrEqual(0);
    }, defaultBlockWaitOptions);

    expectValidWallets(wallet, secondWallet);
    await wallet.sendTransaction({
      to: secondWallet.address,
      from: wallet.address,
      value: fromEther(0.1),
    });

    await waitForExpect(() => {
      const [newNonce] = wrapper.result.current;
      expect(newNonce).be.equal(oldNonce + 1);
    }, defaultBlockWaitOptions);
  });
});
