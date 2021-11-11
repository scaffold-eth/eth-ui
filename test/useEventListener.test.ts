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

    it('When the hook is called after a contract call; then it returns the event as the last item', async () => {
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

      // check number of times the hook updated (1 event and 1 initial)
      expect(harness.result.all.length).lessThanOrEqual(2);
    });

    describe('Given that multiple events occured after the hook is initialized', () => {
      it('When the hook is initialized before the events, with a starting blockNumber before the events occured; then it returns all the events after that block number in the right order', async () => {
        const eventFilter: EventFilter = yourContract?.filters.SetPurpose as EventFilter;
        const harness = await hookTestHarness(() =>
          useEventListener(yourContract, eventFilter, testStartBockNumber + 1)
        );
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

        // check number of times the hook updated (4 events + initial)
        expect(harness.result.all.length).lessThanOrEqual(5);
      });
    });

    describe('Given that multiple events occured before the hook is initialized', () => {
      let beforeMultipleEventsBlockNumber = 0;
      before(async () => {
        beforeMultipleEventsBlockNumber = await currentTestBlockNumber();
        await yourContract?.setPurpose('purpose 1');
        await yourContract?.setPurpose('purpose 2');
        await yourContract?.setPurpose('purpose 3');
        await yourContract?.setPurpose('purpose 4');
      });

      it('When the hook is initialized after, with a starting blockNumber that includes these prior events; then it returns them in right order', async () => {
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

        // check number of times the hook updated (1 event + 1 initial)
        expect(harness.result.all.length).be.lessThanOrEqual(2);
      });
    });
  });
});
