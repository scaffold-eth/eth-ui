import { Contract } from 'ethers';

/**
 * #### Summary
 * Contracts deployed by hardhat
 * - {chainIds: { networkNames: {contracts} }}, contains an record of contracts
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
export type TDeployedContracts = {
  [key: string]: {
    [key: string]: {
      name: string;
      chainId: string;
      contracts: Record<string, Contract>;
    };
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
  [key: number]: {
    name?: string;
    chainId?: string;
    contracts?: Record<string, Contract>;
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
