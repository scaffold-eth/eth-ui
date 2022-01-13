/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect, use } from 'chai';
import { Signer } from 'ethers';
import * as sinonChai from 'sinon-chai';
import { YourContract } from 'test-files/__mocks__/generated/contract-types';
import { setupMockYourContract } from 'test-files/__mocks__/setupMockContracts';
import sinon from 'ts-sinon';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { getHardhatSigner } from '~~/helpers/test-utils/wrapper';
import { wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper/hardhatTestHelpers';
import { useContractReaderUntyped } from '~~/hooks';
import { TContractFunctionInfo } from '~~/models';

use(sinonChai);

describe('useContractReaderUntyped', function () {
  describe('Given that a YourContract is deployed', () => {
    let yourContract: YourContract | undefined;
    let yourContractPurposeInfo: TContractFunctionInfo;
    let contractSigner: Signer;

    before(async () => {
      // setup a contract
      const harness = await wrapperTestSetupHelper();
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
        const harness = await hookTestWrapper(() =>
          useContractReaderUntyped<string>(yourContract!, yourContractPurposeInfo)
        );
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
        expect(harness.result.current).to.eql(firstPurpose);

        const secondPurpose = 'purpose 2';
        await yourContract?.setPurpose(secondPurpose);
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
        expect(harness.result.current).to.eql(secondPurpose);
      });
      it('When the hook is invoked after multiple setPurpose calls; then it returns the last result of the contract', async () => {
        const harness = await hookTestWrapper(() =>
          useContractReaderUntyped<string>(yourContract!, yourContractPurposeInfo)
        );
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

        await yourContract?.setPurpose('purpose 1');
        await yourContract?.setPurpose('purpose 2');
        await yourContract?.setPurpose('purpose 3');
        const finalPurpose = 'purpose final';
        await yourContract?.setPurpose(finalPurpose);
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

        expect(harness.result.current).to.eql(finalPurpose);
      });

      it('When the hook is invoked after setPurpose calls with a formatter; then it returns the formatted value', async () => {
        const formatter = sinon.stub();
        formatter.returnsArg(0);
        const harness = await hookTestWrapper(() =>
          useContractReaderUntyped<string>(yourContract!, yourContractPurposeInfo, formatter)
        );
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        formatter.resetHistory();
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

        expect(harness.result.current).to.eql(firstPurpose);
        expect(formatter).to.be.calledOnce;
        expect(formatter).to.be.calledOnceWith(firstPurpose);
      });

      it('When the hook is invoked after setPurpose call with an onChange callback; then the callback is invoked', async () => {
        const onChange = sinon.stub();
        const harness = await hookTestWrapper(() =>
          useContractReaderUntyped<string>(yourContract!, yourContractPurposeInfo, undefined, onChange)
        );
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        onChange.resetHistory();
        await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);

        expect(harness.result.current).to.eql(firstPurpose);
        expect(onChange).be.calledOnce;
      });
    });
  });
});
