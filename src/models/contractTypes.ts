import { Contract } from 'ethers';

/**
 * Contracts deployed by hardhat
 * - {chainIds: { networkNames: {contracts} }}, contains an record of contracts
 * - Used by {@link useContractLoader}
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
 * A type for external contracts
 * - {chainId: {contracts}}, contains an record of contracts
 * - Used by {@link useContractLoader}
 */
export type TExternalContracts = {
  [key: number]: {
    name?: string;
    chainId?: string;
    contracts?: Record<string, Contract>;
  };
};

/**
 * Contract function information
 */
export type TContractFunctionInfo = {
  contractName: string;
  functionName: string;
  functionArgs?: any[];
};
