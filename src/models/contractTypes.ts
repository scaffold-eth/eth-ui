import { Contract } from 'ethers';

/**
 * A type for deployed contract, used by useContractLoader
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
 * A type for external contracts, used by useContractLoader
 */
export type TExternalContracts = {
  [key: number]: {
    name?: string;
    chainId?: string;
    contracts?: Record<string, Contract>;
  };
};
