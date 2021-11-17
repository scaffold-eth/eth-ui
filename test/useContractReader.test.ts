/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect, use } from 'chai';
import { Signer } from 'ethers';
import * as sinonChai from 'sinon-chai';
import { YourContract } from 'test-files/__mocks__';
import { setupMockYourContract, waitForYourContractState } from 'test-files/__mocks__/setupMockContracts';
import sinon from 'ts-sinon';

import { hookTestHarness } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { getHardhatSigner } from '~~/helpers/test-utils/harness';
import { harnessTestSetupHelper } from '~~/helpers/test-utils/harness/hardhatTestHelpers';
import { useContractReader } from '~~/hooks';
import { TContractFunctionInfo } from '~~/models';

use(sinonChai);

describe('useContractReader', function () {
  describe('Given that a YourContract is deployed', () => {
    let yourContract: YourContract | undefined;
    let yourContractPurposeInfo: TContractFunctionInfo;
    let contractSigner: Signer;

    before(async () => {
      // setup a contract
      const harness = await harnessTestSetupHelper();
      contractSigner = await getHardhatSigner(harness.mockProvider, 1);
      [yourContract, yourContractPurposeInfo] = await setupMockYourContract(contractSigner);
    });

    // let testStartBockNumber = 0;
    beforeEach(async () => {
      // testStartBockNumber = await currentTestBlockNumber();
      await yourContract?.setPurpose('no purpose');
    });

    describe('Given the setPurpose is called and set with a new value', () => {
      it('When the hook is invoked after setPurpose calls; then it returns the result of the contract call', async () => {
        const harness = await hookTestHarness(() =>
          useContractReader<[string]>(yourContract!, yourContractPurposeInfo)
        );
        await waitForYourContractState(harness);

        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
        expect(harness.result.current).to.eql([firstPurpose]);

        const secondPurpose = 'purpose 2';
        await yourContract?.setPurpose(secondPurpose);
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
        expect(harness.result.current).to.eql([secondPurpose]);

        const thirdPurpose = 'purpose 3';
        await yourContract?.setPurpose(thirdPurpose);
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
        expect(harness.result.current).to.eql([thirdPurpose]);

        // hook renders should be less than 3 x 2 + initial value + purpose
        // expect(harness.result.all.length).be.lessThanOrEqual(9);
      });
      it('When the hook is invoked after multiple setPurpose calls; then it returns the last result of the contract', async () => {
        const harness = await hookTestHarness(() =>
          useContractReader<[string]>(yourContract!, yourContractPurposeInfo)
        );
        await waitForYourContractState(harness);

        await yourContract?.setPurpose('purpose 1');
        await yourContract?.setPurpose('purpose 2');
        await yourContract?.setPurpose('purpose 3');
        await yourContract?.setPurpose('purpose 4');
        const finalPurpose = 'purpose 5';
        await yourContract?.setPurpose(finalPurpose);
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

        expect(harness.result.current).to.eql([finalPurpose]);

        // the number of times the hook results are refreshed should be less than 2 per change (2*3) + 1 final value + 2 undefined
        // expect(harness.result.all.length).to.be.lessThanOrEqual(11);
      });

      it('When the hook is invoked after setPurpose calls with a formatter; then it returns the formatted value', async () => {
        const formatter = sinon.stub();
        formatter.returnsArg(0);
        const harness = await hookTestHarness(() =>
          useContractReader<[string]>(yourContract!, yourContractPurposeInfo, formatter)
        );
        await waitForYourContractState(harness);

        formatter.resetHistory();
        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

        expect(harness.result.current).to.eql([firstPurpose]);
        expect(formatter).to.be.calledOnce;
        expect(formatter).to.be.calledOnceWith([firstPurpose]);

        // the number of times the hook results are refreshed should be less than 2 per change (2 * 1) + 1 final value + 2 undefined
        // expect(harness.result.all.length).to.be.lessThanOrEqual(5);
      });

      it('When the hook is invoked after setPurpose call with an onChange callback; then the callback is invoked', async () => {
        const onChange = sinon.stub();
        const harness = await hookTestHarness(() =>
          useContractReader<[string]>(yourContract!, yourContractPurposeInfo, undefined, onChange)
        );
        await waitForYourContractState(harness);

        onChange.resetHistory();
        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

        expect(harness.result.current).to.eql([firstPurpose]);
        expect(onChange).be.calledOnce;

        // the number of times the hook results are refreshed should be less than 2 per change (2*1) + 1 final value + 2 undefined
        // expect(harness.result.all.length).to.be.lessThanOrEqual(5);
      });
    });
  });
});
