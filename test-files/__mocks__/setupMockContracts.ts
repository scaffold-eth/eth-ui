import { expect } from 'chai';
import { deployContract } from 'ethereum-waffle';
import { Signer } from 'ethers';
import { mockYourContractJson } from 'test-files/__mocks__';
import { YourContract } from 'test-files/__mocks__/generated/contract-types';

import { TContractFunctionInfo } from '~~/models';

export const setupMockYourContract = async (contractSigner: Signer): Promise<[YourContract, TContractFunctionInfo]> => {
  const yourContract = (await deployContract(contractSigner, mockYourContractJson)) as YourContract;
  const yourContractFunctionInfo: TContractFunctionInfo = {
    contractName: 'YourContract',
    functionName: 'purpose',
  };
  expect(yourContract).to.exist;
  expect(await yourContract.purpose()).to.equal('Building Unstoppable Apps!!!');
  return [yourContract, yourContractFunctionInfo];
};
