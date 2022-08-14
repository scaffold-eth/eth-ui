import 'test/helpers/chai-imports';
import { expect } from 'chai';
import { Signer } from 'ethers';
import { setupMockYourContract } from 'test-files/__mocks__/setupMockContracts';
import { YourContract } from 'test-files/generated/contract-types';
import sinon from 'ts-sinon';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { waitForExpect } from '~~/helpers/test-utils/functions/mochaHelpers';
import { getTestSigners } from '~~/helpers/test-utils/wrapper';
import { wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper/hardhatTestHelpers';
import { useContractReaderUntyped } from '~~/hooks';
import { TContractFunctionInfo } from '~~/models';

const initialPurpose = 'no purpose';

describe('useContractReaderUntyped', function () {
  describe('Given that a YourContract is deployed', () => {
    let yourContract: YourContract | undefined;
    let yourContractPurposeInfo: TContractFunctionInfo;
    let contractSigner: Signer;

    before(async () => {
      // setup a contract
      const wrapper = await wrapperTestSetupHelper();
      contractSigner = (await getTestSigners(wrapper.mockProvider)).user1;
      [yourContract, yourContractPurposeInfo] = await setupMockYourContract(contractSigner);
    });

    beforeEach(async () => {
      await yourContract?.setPurpose(initialPurpose);
    });

    describe('Given the setPurpose is called and set with a new value', () => {
      it('When the hook is invoked after setPurpose calls; then it returns the result of the contract call', async () => {
        const wrapper = await hookTestWrapper(() =>
          useContractReaderUntyped<string>(yourContract!, yourContractPurposeInfo)
        );

        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        await waitForExpect(() => expect(wrapper.result.current).to.eql(firstPurpose), defaultBlockWaitOptions);

        const secondPurpose = 'purpose 2';
        await yourContract?.setPurpose(secondPurpose);
        await waitForExpect(() => expect(wrapper.result.current).to.eql(secondPurpose), defaultBlockWaitOptions);
      });

      it('When the hook is invoked after multiple setPurpose calls; then it returns the last result of the contract', async () => {
        const wrapper = await hookTestWrapper(() =>
          useContractReaderUntyped<string>(yourContract!, yourContractPurposeInfo)
        );

        await yourContract?.setPurpose('purpose 1');
        await yourContract?.setPurpose('purpose 2');
        const finalPurpose = 'purpose final';
        await yourContract?.setPurpose(finalPurpose);
        await waitForExpect(() => expect(wrapper.result.current).to.eql(finalPurpose), defaultBlockWaitOptions);
      });

      it('When the hook is invoked after setPurpose calls with a formatter; then it returns the formatted value', async () => {
        const formatter = sinon.stub();
        formatter.returnsArg(0);
        const wrapper = await hookTestWrapper(() =>
          useContractReaderUntyped<string>(yourContract!, yourContractPurposeInfo, formatter)
        );
        await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions);

        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        formatter.resetHistory();
        await waitForExpect(() => {
          expect(wrapper.result.current).to.eql(firstPurpose);
          expect(formatter).to.be.calledOnce;
          expect(formatter).to.be.calledOnceWith(firstPurpose);
        }, defaultBlockWaitOptions);
      });

      it('When the hook is invoked after setPurpose call with an onChange callback; then the callback is invoked', async () => {
        const onChange = sinon.stub();
        const wrapper = await hookTestWrapper(() =>
          useContractReaderUntyped<string>(yourContract!, yourContractPurposeInfo, undefined, onChange)
        );

        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        onChange.resetHistory();
        await waitForExpect(() => {
          expect(wrapper.result.current).to.eql(firstPurpose);
          expect(onChange).be.calledOnce;
        }, defaultBlockWaitOptions);
      });
    });
  });
});
