import { expect } from 'chai';
import { deployContract } from 'ethereum-waffle';
import { EventFilter, Signer } from 'ethers';
import { YourContract, YourContractJson } from 'test-files/__mocks__';

import { hookTestHarness } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { getHardhatSigner } from '~~/helpers/test-utils/harness';
import { currentTestBlockNumber, harnessTestSetupHelper } from '~~/helpers/test-utils/harness/hardhatTestHelpers';
import { useEventListener } from '~~/hooks';
describe('useEventListener', function () {
  describe('Given that a YourContract is deployed', () => {
    let yourContract: YourContract | undefined;
    let contractSigner: Signer;

    before(async () => {
      // setup a contract
      const harness = await harnessTestSetupHelper();
      contractSigner = await getHardhatSigner(harness.mockProvider, 1);
      yourContract = (await deployContract(contractSigner, YourContractJson)) as YourContract;
      expect(yourContract).to.exist;
    });

    let testStartBockNumber = 0;

    beforeEach(async () => {
      testStartBockNumber = await currentTestBlockNumber();
    });

    it('When the hook is called after a contract call, it returns the call event as the last item', async () => {
      const eventFilter: EventFilter = yourContract?.filters.SetPurpose as EventFilter;
      const harness = await hookTestHarness(() => useEventListener(yourContract, eventFilter, 0));
      const firstPurpose = 'new purpose 1';
      await yourContract?.setPurpose(firstPurpose);

      await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
      const index = harness.result.current.length - 1;

      expect(harness.result.current[index].args.purpose).to.equal(firstPurpose);
      expect(harness.result.current[index].args.sender).to.equal(await contractSigner.getAddress());

      // check other data of event and contract
      expect(harness.result.current[index].address).to.equal(await yourContract?.resolvedAddress);
      expect(harness.result.current[index].eventSignature).to.equal('SetPurpose(address,string)');
      expect(harness.result.current[index].event).to.equal('SetPurpose');
    });

    it('When the hook is called with a starting blockNumber after which multiple events occured, then it returns all the events after that block number in the right order', async () => {
      const eventFilter: EventFilter = yourContract?.filters.SetPurpose as EventFilter;
      const harness = await hookTestHarness(() => useEventListener(yourContract, eventFilter, testStartBockNumber + 1));
      await yourContract?.setPurpose('purpose 1');
      await yourContract?.setPurpose('purpose 2');
      await yourContract?.setPurpose('purpose 3');
      await yourContract?.setPurpose('purpose 4');

      await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

      // check if there is the right amount of events
      expect(harness.result.current.length).to.equal(4);

      // check the order
      expect(harness.result.current[0].args.purpose).to.equal('purpose 1');
      expect(harness.result.current[1].args.purpose).to.equal('purpose 2');
      expect(harness.result.current[2].args.purpose).to.equal('purpose 3');
      expect(harness.result.current[3].args.purpose).to.equal('purpose 4');
    });

    describe('Given that multiple events occured', () => {
      let beforeMultipleEventsBlockNumber = 0;
      before(async () => {
        beforeMultipleEventsBlockNumber = await currentTestBlockNumber();
        await yourContract?.setPurpose('purpose 1');
        await yourContract?.setPurpose('purpose 2');
        await yourContract?.setPurpose('purpose 3');
        await yourContract?.setPurpose('purpose 4');
      });

      it.only('When the hook is called with a starting blockNumber that includes these prior events, then it returns them in right order', async () => {
        console.log(testStartBockNumber);
        console.log(beforeMultipleEventsBlockNumber);
        const eventFilter: EventFilter = yourContract?.filters.SetPurpose as EventFilter;
        const harness = await hookTestHarness(() =>
          useEventListener(yourContract, eventFilter, beforeMultipleEventsBlockNumber + 1)
        );
        await harness.waitFor(() => harness.result.current.length !== 0, defaultBlockWaitOptions);

        // check if there is the right amount of events
        expect(harness.result.current.length).to.equal(4);

        // check the order
        expect(harness.result.current[0].args.purpose).to.equal('purpose 1');
        expect(harness.result.current[1].args.purpose).to.equal('purpose 2');
        expect(harness.result.current[2].args.purpose).to.equal('purpose 3');
        expect(harness.result.current[3].args.purpose).to.equal('purpose 4');
      });
    });
  });
});
