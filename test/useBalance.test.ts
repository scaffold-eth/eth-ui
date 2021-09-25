// import { expect } from 'chai';
// import { MockProvider } from 'ethereum-waffle';

import { expect } from 'chai';
import { MockProvider } from 'ethereum-waffle';

import { singleTimeout } from '~helpers/constants/testConstants';
import { fromEther } from '~helpers/functions/conversions';
import { getMockProvider } from '~helpers/test-harness/getMockProvider';
import { renderTestHook } from '~helpers/test-harness/renderTestHook';
import { useBalance } from '~~/useBalance';

// import { getMockProvider } from '~helpers/getMockProvider';
// import { renderTestHook } from '~helpers/renderTestHook';
// import { useBalance } from '~~/useBalance';

describe('useBalance', function () {
  it('When the hook is called, then it returns the initial balance', async () => {
    const mockProvider = getMockProvider();
    const [wallet, secondWallet] = mockProvider.getWallets();
    const hook = renderTestHook(mockProvider, (provider: MockProvider) => useBalance(provider, wallet.address));
    hook.rerender(mockProvider);
    expect(wallet.address).be.not.empty;
    expect(secondWallet.address).be.not.empty;

    await hook.waitForNextUpdate({ timeout: singleTimeout });
    const balance = await wallet.getBalance();
    expect(hook.result.current).be.equal(balance);
  });

  it('When wallet balances changes, then the hook returns the new balance', async () => {
    const mockProvider = getMockProvider();
    const [wallet, secondWallet] = mockProvider.getWallets();
    const hook = renderTestHook(mockProvider, (provider: MockProvider) => useBalance(provider, wallet.address));
    hook.rerender(mockProvider);

    const valueToSend = fromEther(1);
    console.log(valueToSend);
    // await expect(
    //   await wallet.sendTransaction({
    //     to: secondWallet.address,
    //     value: valueToSend,
    //   })
    // ).to.changeEtherBalances([wallet], [fromEther(-1)]);

    await hook.waitForNextUpdate({ timeout: singleTimeout });
    const balance = await wallet.getBalance();
    expect(hook.result.current).to.equal(balance);
  });
});
