/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from 'chai';
import { deployContract } from 'ethereum-waffle';
import { Signer } from 'ethers';
import { YourContract, YourContractJson } from 'test-files/__mocks__';

import { hookTestHarness } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { getHardhatSigner } from '~~/helpers/test-utils/harness';
import { currentTestBlockNumber, harnessTestSetupHelper } from '~~/helpers/test-utils/harness/hardhatTestHelpers';
import { useContractReader } from '~~/hooks';
import { TContractFunctionInfo } from '~~/models';

describe('useContractReader', function () {
  describe('Given that a YourContract is deployed', () => {
    let yourContract: YourContract | undefined;
    let yourContractPurposeInfo: TContractFunctionInfo;
    let contractSigner: Signer;

    before(async () => {
      // setup a contract
      const harness = await harnessTestSetupHelper();
      contractSigner = await getHardhatSigner(harness.mockProvider, 1);
      yourContract = (await deployContract(contractSigner, YourContractJson)) as YourContract;
      yourContractPurposeInfo = {
        contractName: 'YourContract',
        functionName: 'purpose()',
      };
      expect(yourContract).to.exist;
    });

    let testStartBockNumber = 0;

    beforeEach(async () => {
      testStartBockNumber = await currentTestBlockNumber();
    });

    it('When the hook is called after a contract call; then it returns the result of the contract call', async () => {
      const harness = await hookTestHarness(() => useContractReader<string>(yourContract!, yourContractPurposeInfo));

      const firstPurpose = 'purpose 1';
      await yourContract?.setPurpose(firstPurpose);
      await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
      expect(harness.result.all.length).to.equal(3);
      expect(harness.result.current).to.eql([firstPurpose]);

      const secondPurpose = 'purpose 2';
      await yourContract?.setPurpose(secondPurpose);
      await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
      expect(harness.result.all.length).to.equal(5);
      expect(harness.result.current).to.eql([secondPurpose]);

      const thirdPurpose = 'purpose 3';
      await yourContract?.setPurpose(thirdPurpose);
      await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
      expect(harness.result.all.length).to.equal(7);
      expect(harness.result.current).to.eql([thirdPurpose]);
      console.log(harness.result.all);
    });

    it('When the hook is called after multiple contract call; then it returns the last result of the contract call', async () => {
      const harness = await hookTestHarness(() => useContractReader<string>(yourContract!, yourContractPurposeInfo));

      await yourContract?.setPurpose('purpose 1');
      await yourContract?.setPurpose('purpose 2');
      await yourContract?.setPurpose('purpose 3');
      await yourContract?.setPurpose('purpose 4');
      const finalPurpose = 'purpose 5';
      await yourContract?.setPurpose(finalPurpose);
      await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

      console.log(harness.result.all);
      expect(harness.result.all.length).to.be.lessThanOrEqual(10);
      expect(harness.result.current).to.eql([finalPurpose]);
    });
  });
});
