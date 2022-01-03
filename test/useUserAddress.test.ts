import { expect } from 'chai';
import { Signer } from 'ethers';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { useSignerAddress } from '~~/hooks';

describe('useUserAddress', function () {
  it('When an signer is provider; the hook returns the correct address', async () => {
    const harness = await hookTestWrapper((signer: Signer) => useSignerAddress(signer));
    const [wallet, secondWallet] = harness.mockProvider.getWallets();

    harness.rerender(wallet);
    await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
    expect(wallet.address).be.equal(harness.result.current);
    expect(harness.result.current).to.be.properAddress;

    harness.rerender(secondWallet);
    await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
    expect(secondWallet.address).be.equal(harness.result.current);
    expect(harness.result.current).to.be.properAddress;
  });
});
