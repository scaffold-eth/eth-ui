import { expect } from 'chai';
import { Signer } from 'ethers';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { useSignerAddress } from '~~/hooks';

describe('useUserAddress', function () {
  it('When an signer is provider; the hook returns the correct address', async () => {
    const wrapper = await hookTestWrapper((signer: Signer) => useSignerAddress(signer));
    const [wallet, secondWallet] = wrapper.mockProvider.getWallets();

    wrapper.rerender(wallet);
    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
    const [result1, updateResult1] = wrapper.result.current;
    expect(wallet.address).be.equal(result1);
    expect(result1).to.be.properAddress;

    wrapper.rerender(secondWallet);
    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
    const [result2, updateResult2] = wrapper.result.current;
    expect(secondWallet.address).be.equal(result2);
    expect(result2).to.be.properAddress;
  });
});
