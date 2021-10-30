import { expect } from 'chai';
import { deployContract } from 'ethereum-waffle';
import { EventFilter, Signer } from 'ethers';
import { YourContract, YourContractJson } from 'test-files/__mocks__';

import { useBlockNumberContext } from '~~/context';
import { hookTestHarness } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { getHardhatSigner } from '~~/helpers/test-utils/harness';
import { useEventListener } from '~~/hooks';
const useBeforeTestHook = (): number | undefined => {
  return useBlockNumberContext();
};

describe('useEventListener', function () {
  let yourContract: YourContract | undefined;
  let contractSigner: Signer;

  before(async () => {
    // setup a contract
    const harness = await hookTestHarness(() => useBeforeTestHook());
    contractSigner = await getHardhatSigner(harness.mockProvider, 1);
    yourContract = (await deployContract(contractSigner, YourContractJson)) as YourContract;
    expect(yourContract).to.exist;
  });

  it('When the hook is called, then it returns current events', async () => {
    const eventFilter: EventFilter = yourContract?.filters.SetPurpose as EventFilter;
    const harness = await hookTestHarness(() => useEventListener(yourContract, eventFilter, 0));
    const firstPurpose = 'new purpose 1';
    await yourContract?.setPurpose(firstPurpose);

    await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
    expect(harness.result.current[0].args.purpose).to.equal(firstPurpose);

    const signer = await getHardhatSigner(harness.mockProvider, 0);
    expect(harness.result.current[0].args.sender).to.equal(await contractSigner.getAddress());
  });
});
