import { expect } from 'chai';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants/testConstants';
import { fromEther } from '~~/helpers/test-utils/functions/conversions';
import { useBalance } from '~~/hooks';

describe('useBalance', function () {
  it('When the hook is called; then it returns the initial balance', async () => {
    const harness = await hookTestWrapper((address: string | undefined) => useBalance(address));
    const [wallet, secondWallet] = harness.mockProvider.getWallets();
    harness.rerender(wallet.address);

    expect(wallet.address).to.be.properAddress;
    expect(secondWallet.address).to.be.properAddress;

    await harness.waitForNextUpdate(defaultBlockWaitOptions);
    const balance = await wallet.getBalance();
    expect(harness.result.current).be.equal(balance);
  });

  it('When wallet balances changes; then the hook returns the new balance', async () => {
    const harness = await hookTestWrapper((address: string | undefined) => useBalance(address));
    const [wallet, secondWallet] = harness.mockProvider.getWallets();
    harness.rerender(wallet.address);

    const oldBalance = await wallet.getBalance();
    const valueToSend = fromEther(1);
    // await expect(
    await wallet.sendTransaction({
      to: secondWallet.address,
      value: valueToSend,
    });
    // commented out since the waffle chai matcher doesn't work with london hardform.  Merged PR to waffle, but they didn't release it

    // ).to.changeEtherBalances([wallet], [fromEther(-1)]);

    await harness.waitForNextUpdate(defaultBlockWaitOptions);
    const newBalance = await wallet.getBalance();
    expect(harness.result.current).to.equal(newBalance);
    expect(harness.result.current).not.to.equal(oldBalance);
  });
});
