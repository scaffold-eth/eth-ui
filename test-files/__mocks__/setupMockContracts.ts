import { expect } from 'chai';
import { deployContract } from 'ethereum-waffle';
import { Signer } from 'ethers';
import { YourContract, YourContractJson } from 'test-files/__mocks__';

import { TTestHookResult } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { TContractFunctionInfo } from '~~/models';

export const setupMockYourContract = async (contractSigner: Signer): Promise<[YourContract, TContractFunctionInfo]> => {
  const yourContract = (await deployContract(contractSigner, YourContractJson)) as YourContract;
  const yourContractFunctionInfo: TContractFunctionInfo = {
    contractName: 'YourContract',
    functionName: 'purpose',
  };
  expect(yourContract).to.exist;
  expect(await yourContract.functions.purpose()).to.eql(['Building Unstoppable Apps']);
  return [yourContract, yourContractFunctionInfo];
};

export const waitForYourContractState = async (
  harness: TTestHookResult<unknown, [string] | undefined>,
  value: string = 'no purpose'
): Promise<void> => {
  await harness.waitFor(() => harness.result.current?.[0] === value, defaultBlockWaitOptions);
  // expect(harness.result.all.length).to.equal(3);
};
