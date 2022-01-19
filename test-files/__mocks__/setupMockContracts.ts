import { expect } from 'chai';
import { deployContract } from 'ethereum-waffle';
import { Signer } from 'ethers';
import { mockYourContractJson, mockBasicERC20ContractJson } from 'test-files/__mocks__';
import { YourContract, BasicERC20Contract } from 'test-files/__mocks__/generated/contract-types';

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

export const setupMockBasicERC20Contract = async (
  contractSigner: Signer,
  initialNumberOfTokens?: number
): Promise<BasicERC20Contract> => {
  const initialTotalSupply = initialNumberOfTokens || 1000;
  const basicERC20Contract = (await deployContract(contractSigner, mockBasicERC20ContractJson, [
    initialTotalSupply,
  ])) as BasicERC20Contract;
  expect(basicERC20Contract).to.exist;
  expect(await basicERC20Contract.totalSupply()).to.equal(initialTotalSupply);
  return basicERC20Contract;
};
