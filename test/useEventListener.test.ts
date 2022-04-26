import { expect } from 'chai';
import { deployContract } from 'ethereum-waffle';
import { EventFilter, Signer } from 'ethers';
import { mockYourContractJson } from 'test-files/__mocks__';
import { SetPurposeEvent, YourContract } from 'test-files/__mocks__/generated/contract-types/YourContract';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { getTestSigners } from '~~/helpers/test-utils/wrapper';
import { currentTestBlockNumber, wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper/hardhatTestHelpers';
import { useEventListener } from '~~/hooks';

import 'test/helpers/chai-imports';
describe('useEventListener', function () {
  describe('Given that a YourContract is deployed', () => {
    let yourContract: YourContract | undefined;
    let contractSigner: Signer;

    before(async () => {
      // setup a contract
      const wrapper = await wrapperTestSetupHelper();
      contractSigner = (await getTestSigners(wrapper.mockProvider)).user1;
      yourContract = (await deployContract(contractSigner, mockYourContractJson)) as YourContract;
      expect(yourContract).to.exist;
    });

    let testStartBockNumber = 0;

    beforeEach(async () => {
      testStartBockNumber = await currentTestBlockNumber();
    });

    it('When the hook is called after a contract call; then it returns the event as the last item', async () => {
      const eventFilter: EventFilter = yourContract!.filters.SetPurpose();
      const wrapper = await hookTestWrapper(() => useEventListener(yourContract, eventFilter, 0));

      const firstPurpose = 'new purpose 1';
      await yourContract?.setPurpose(firstPurpose);

      await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
      const [result] = wrapper.result.current;
      const index = result.length - 1;
      console.log(result[0].args);

      expect(result[index].args.purpose).to.equal(firstPurpose);
      expect(result[index].args.sender).to.equal(await contractSigner.getAddress());
      // check other data of event and contract
      expect(result[index].address).to.equal(await yourContract?.resolvedAddress);
      expect(result[index].eventSignature).to.equal('SetPurpose(address,string)');
      expect(result[index].event).to.equal('SetPurpose');
    });

    describe('Given that multiple events occured before the hook is initialized', () => {
      let beforeMultipleEventsBlockNumber = 0;
      before(async () => {
        beforeMultipleEventsBlockNumber = await currentTestBlockNumber();
        await yourContract!.setPurpose('purpose 1');
        await yourContract!.setPurpose('purpose 2');
        await yourContract!.setPurpose('purpose 3');
        await yourContract!.setPurpose('purpose 4');
      });

      it('When the hook is initialized after, with a starting blockNumber that includes these prior events; then it returns them in right order', async () => {
        const eventFilter: EventFilter = yourContract!.filters.SetPurpose() as EventFilter;
        const wrapper = await hookTestWrapper(() =>
          useEventListener(yourContract, eventFilter, beforeMultipleEventsBlockNumber + 1)
        );

        await wrapper.waitFor(() => wrapper.result.current[0].length !== 0, defaultBlockWaitOptions);
        const [result] = wrapper.result.current;
        // check if there is the right amount of events
        expect(result.length).to.equal(4);
        // check the order
        expect(result[0].args.purpose).to.equal('purpose 1');
        expect(result[1].args.purpose).to.equal('purpose 2');
        expect(result[2].args.purpose).to.equal('purpose 3');
        expect(result[3].args.purpose).to.equal('purpose 4');
      });
    });

    describe('Given that multiple events occured after the hook is initialized', () => {
      it('When the hook is initialized before the events, with a starting blockNumber before the events occured; then it returns all the events after that block number in the right order', async () => {
        const eventFilter: EventFilter = yourContract!.filters.SetPurpose();
        const wrapper = await hookTestWrapper(() =>
          useEventListener<SetPurposeEvent>(yourContract, eventFilter, testStartBockNumber + 1)
        );
        await yourContract!.setPurpose('purpose 1');
        await yourContract!.setPurpose('purpose 2');
        await yourContract!.setPurpose('purpose 3');
        await yourContract!.setPurpose('purpose 4');

        await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
        const [result] = wrapper.result.current;

        // check if there is the right amount of events
        expect(result.length).to.equal(4);
        console.log(result[0].args);
        console.log(result[1].args);
        console.log(result[2].args);
        console.log(result[3].args);

        // check the order
        expect(result[0].args[1]).to.equal('purpose 1');
        // expect(result[0].args.purpose).to.equal('purpose 1'); // unknown why this fails but not for the rest
        expect(result[1].args.purpose).to.equal('purpose 2');
        expect(result[2].args.purpose).to.equal('purpose 3');
        expect(result[3].args.purpose).to.equal('purpose 4');
      });
    });
  });
});
