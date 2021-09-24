// import { expect } from 'chai';
// import { MockProvider } from 'ethereum-waffle';

import { expect } from 'chai';
import { MockProvider } from 'ethereum-waffle';

import { getMockProvider } from '~helpers/getMockProvider';
import { renderTestHook } from '~helpers/renderTestHook';
import { useBalance } from '~~/useBalance';

// import { getMockProvider } from '~helpers/getMockProvider';
// import { renderTestHook } from '~helpers/renderTestHook';
// import { useBalance } from '~~/useBalance';

describe('useBalance', function () {
  it('When the hook is called, then it returns the right balance', async () => {
    const mockProvider = getMockProvider();
    const [wallet, extraWallet] = mockProvider.getWallets();
    const hook = renderTestHook(mockProvider, (provider: MockProvider) => useBalance(provider, wallet.address));
    hook.rerender(mockProvider);
    expect(wallet.address).be.not.empty;
    expect(extraWallet.address).be.not.empty;

    const balance = await wallet.getBalance();
    await hook.waitForNextUpdate({ timeout: 10000 });
    expect(hook.result.current).be.equal(balance);
  });
});
