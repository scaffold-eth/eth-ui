/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect, use } from 'chai';
import { Signer } from 'ethers';
import * as sinonChai from 'sinon-chai';
import { YourContract } from 'test-files/__mocks__/generated/contract-types';
import { setupMockYourContract } from 'test-files/__mocks__/setupMockContracts';
import sinon from 'ts-sinon';

import * as hookHelpers from '~~/functions/hookHelpers';
import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock, mineBlockUntil } from '~~/helpers/test-utils/eth';
import { shouldFailWithMessage } from '~~/helpers/test-utils/functions';
import { mochaWaitFor } from '~~/helpers/test-utils/functions/mochaHelpers';
import { getHardhatSigner } from '~~/helpers/test-utils/wrapper';
import { currentTestBlockNumber, wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper/hardhatTestHelpers';
import { useContractReader, useContractReaderUntyped } from '~~/hooks';
import { TContractFunctionInfo } from '~~/models';

use(sinonChai);

const initialPurpose = 'no purpose';

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

    beforeEach(async () => {
      await yourContract?.setPurpose(initialPurpose);
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
        const wrapper = await hookTestWrapper(() =>
          useContractReaderUntyped<string>(yourContract!, yourContractPurposeInfo)
        );
        await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions);

        await yourContract?.setPurpose('purpose 1');
        await yourContract?.setPurpose('purpose 2');
        await yourContract?.setPurpose('purpose 3');
        const finalPurpose = 'purpose final';
        await yourContract?.setPurpose(finalPurpose);
        await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions);

        expect(wrapper.result.current).to.eql(finalPurpose);
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
        await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions);

        expect(wrapper.result.current).to.eql(firstPurpose);
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

describe('useContractReader', function () {
  describe('Given that a YourContract is deployed', () => {
    let yourContract: YourContract | undefined;
    let contractSigner: Signer;
    let sandbox: sinon.SinonSandbox;

    before(async () => {
      // setup a contract
      const wrapper = await wrapperTestSetupHelper();
      contractSigner = await getHardhatSigner(wrapper.mockProvider, 1);
      [yourContract] = await setupMockYourContract(contractSigner);
    });

    let testStartBockNumber = 0;
    beforeEach(async () => {
      testStartBockNumber = await currentTestBlockNumber();
      await yourContract?.setPurpose(initialPurpose);
    });

    afterEach(() => {
      sandbox?.restore();
    });

    describe('Given the setPurpose is called and set with a new value', () => {
      it('When the hook is invoked after setPurpose calls; then it returns the result of the contract call', async () => {
        const wrapper = await hookTestWrapper(() => useContractReader(yourContract, yourContract?.purpose));
        await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
        expect(wrapper.result.current[0]).to.eql(firstPurpose);

        const secondPurpose = 'purpose 2';
        await yourContract?.setPurpose(secondPurpose);
        await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);
        expect(wrapper.result.current[0]).to.eql(secondPurpose);
      });

      it('When the hook is invoked after multiple setPurpose calls; then it returns the last result of the contract', async () => {
        const wrapper = await hookTestWrapper(() => useContractReader(yourContract, yourContract?.purpose));
        await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

        await yourContract?.setPurpose('purpose 1');
        await yourContract?.setPurpose('purpose 2');
        await yourContract?.setPurpose('purpose 3');
        const finalPurpose = 'purpose final';
        await yourContract?.setPurpose(finalPurpose);
        await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

        expect(wrapper.result.current[0]).to.eql(finalPurpose);
      });

      it('When given options of block number interval to update; then the hook only updates once an interval over multiple intervals', async () => {
        // Given
        const blockIntervalToUpdate = 5;

        const updateOptions = { blockNumberInterval: blockIntervalToUpdate };
        const wrapper = await hookTestWrapper(() =>
          useContractReader(yourContract, yourContract?.purpose, [], undefined, updateOptions)
        );

        /** ****************
         * setup interval 1
         */

        // -- mine blocks up to block until a sepcific block interval remainder
        await mineBlockUntil(wrapper.mockProvider, blockIntervalToUpdate, (currentBlockNumber): boolean => {
          return currentBlockNumber % blockIntervalToUpdate === 2;
        });
        // -- set your contract for interval 1
        const interval1Purpose = 'interval 1 purpose';
        await yourContract?.setPurpose(interval1Purpose);
        await mochaWaitFor(async () => {
          return (await yourContract?.purpose()) === interval1Purpose;
        }, defaultBlockWaitOptions.timeout);

        // check interval 1
        const interval1Start = wrapper.mockProvider.blockNumber;
        // -- mine blocks up to block when update should occur
        const [interval1Success, interval1UpdateBlockNumber] = await mineBlockUntil(
          wrapper.mockProvider,
          blockIntervalToUpdate,
          async (currentBlockNumber): Promise<boolean> => {
            if (currentBlockNumber === blockIntervalToUpdate + interval1Start) {
              await wrapper.waitForNextUpdate(defaultBlockWaitOptions);
            }
            return wrapper.result.current[0] === interval1Purpose;
          }
        );

        // then
        expect(interval1Success, 'interval 1 purpose not found').to.be.true;
        expect(interval1UpdateBlockNumber).to.be.greaterThan(interval1Start + blockIntervalToUpdate);

        /** ****************
         * setup interval 2
         */

        // -- mine blocks up to block until a sepcific block interval remainder
        await mineBlockUntil(wrapper.mockProvider, blockIntervalToUpdate, (currentBlockNumber): boolean => {
          return currentBlockNumber % blockIntervalToUpdate === 2;
        });
        // -- set your contract for interval 2
        const interval2Purpose = 'interval 2 purpose';
        await yourContract?.setPurpose(interval2Purpose);
        await mochaWaitFor(async () => {
          return (await yourContract?.purpose()) === interval2Purpose;
        }, defaultBlockWaitOptions.timeout);

        // check interval 1
        const interval2Start = wrapper.mockProvider.blockNumber;
        // -- mine blocks up to block when update should occur
        const [interval2Success, interval2UpdateBlockNumber] = await mineBlockUntil(
          wrapper.mockProvider,
          blockIntervalToUpdate,
          async (currentBlockNumber): Promise<boolean> => {
            if (currentBlockNumber === blockIntervalToUpdate + interval2Start) {
              await wrapper.waitForNextUpdate(defaultBlockWaitOptions);
            }
            return wrapper.result.current[0] === interval2Purpose;
          }
        );

        expect(interval2Success, 'interval 2 purpose not found').to.be.true;
        expect(interval2UpdateBlockNumber).to.be.greaterThan(interval2Start + blockIntervalToUpdate);
      });

      it('When given option for refetchInterval; then ensures result is not returned before refetchInterval', async () => {
        // Given
        // -- turn off checkUpdateOptions to allow for lower refetchInterval time
        sandbox = sinon.createSandbox();
        sandbox.stub(hookHelpers, 'checkUpdateOptions').returns();
        const purposeUpdate = 'higher purpose';

        const updateOptions = {
          refetchInterval: 2_000, // Note this is below 10_000 limit just for testing
          blockNumberInterval: undefined,
        };
        const harness = await hookTestWrapper(() =>
          useContractReader(yourContract, yourContract?.purpose, [], undefined, updateOptions)
        );

        await yourContract?.setPurpose(purposeUpdate);

        // -- ensure mining block doesn't trigger update
        await mineBlock(harness.mockProvider);

        // -- ensure doesn't update before refetchInterval time
        try {
          await harness.waitForValueToChange(() => harness.result.current[0], {
            timeout: updateOptions.refetchInterval - 100,
            interval: 200,
          });
          expect.fail();
        } catch (e: any) {
          expect(e.message).contain('Timed out');
          expect(harness.result.current[0]).be.equal(initialPurpose);
        }

        // When
        await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);

        // Then
        expect(harness.result.current[0]).be.equal(purposeUpdate);
      });
    });

    describe('Given update options that are not allowed', () => {
      it('When given option for refetchInterval and blockNumberInterval; then throws error', async () => {
        const updateOptions = {
          refetchInterval: 11_000,
          blockNumberInterval: 5,
        };
        const harness = await hookTestWrapper(() =>
          useContractReader(yourContract, yourContract?.purpose, [], undefined, updateOptions)
        );

        await shouldFailWithMessage(
          async () => await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions),
          'You cannot use both refetchInterval (polling) and blockNumberInterval at the same time'
        );
      });

      it('When given option for refetchInterval < 10000; then throws error', async () => {
        const updateOptions = {
          refetchInterval: 2_000,
          blockNumberInterval: undefined,
        };
        const wrapper = await hookTestWrapper(() =>
          useContractReader(yourContract, yourContract?.purpose, [], undefined, updateOptions)
        );

        await shouldFailWithMessage(
          async () => await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions),
          'Invalid refetchInterval (polling), must be at least 10000ms or undefined (disabled)'
        );
      });

      it('When given option for blockNumberInterval <= 0; then throws error', async () => {
        const updateOptions = {
          blockNumberInterval: 0,
        };
        const harness = await hookTestWrapper(() =>
          useContractReader(yourContract, yourContract?.purpose, [], undefined, updateOptions)
        );

        await shouldFailWithMessage(
          async () => await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions),
          'Invalid blockNumberInterval, must be greater than 0'
        );
      });
    });
  });
});
