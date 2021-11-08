import { Provider } from '@ethersproject/providers';
import { BaseContract, Signer } from 'ethers';

/**
 * In progress...
 */
export interface IContractFactoryBridge {
  connect: (address: string, signerOrProvider: Signer | Provider) => BaseContract;
  // attach: (address: string) => BaseContract;
}

/**
 * #### Summary
 * describes the sctructure of a contract in hardhat_contracts.json
 */
export type THardhatContractJson = {
  address: string;
  abi: any[];
};

/**
 * #### Summary
 * Contracts deployed by hardhat
 * - {chainIds: { networkNames: {contracts} }}, contains an record of contracts
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
export type TDeployedContractsJson = {
  [chainId: string]: {
    [networkName: string]: {
      name: string;
      chainId: string;
      contracts: { [contractName: string]: THardhatContractJson };
    };
  };
};

/**
 * #### Summary
 * Contract factories for contracts deployed by hardhat
 * - contractName: ethers.ContractFactory
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
export type TDeployedContractHelper = {
  factoryBridge: { [contractName: string]: IContractFactoryBridge };
  contractList: {
    [chainId: number]: { [contractName: string]: BaseContract };
  };
};

/**
 * #### Summary
 * A type for external contracts
 * - {chainId: {contracts}}, contains an record of contracts
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
export type TExternalContracts = {
  [chainId: number]: {
    name?: string;
    chainId?: string;
    contracts?: { [contractName: string]: THardhatContractJson };
  };
};

/**
 * #### Summary
 * Contract function information:
 * - contractName
 * - functionname
 * - functionArgs: functionArguments, an array
 *
 * @category Models
 */
export type TContractFunctionInfo = {
  contractName: string;
  functionName: string;
  functionArgs?: any[];
};

/**
 * #### Summary
 * Configuration for useContractLoader
 *
 * @category Models
 */
export type TContractConfig = {
  /**
   * your local hardhat network name
   */
  hardhatNetworkName?: string;
  /**
   * the address:contractName key value pair
   */
  customAddresses?: Record<string, string>;
  /**
   * Hardhat deployed contracts
   * untyped and should be @deprecated
   */
  deployedContractsJson?: TDeployedContractsJson;
  /**
   * ⚠ in progress... not used currently
   * Harhard deployed contract with TypeChain typings
   * Contracts are created via contract factories
   */
  deployedContractHelper?: TDeployedContractHelper;
  /**
   * External contracts (such as DAI)
   */
  externalContracts?: TExternalContracts;
};
