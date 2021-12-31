import { BaseContract } from 'ethers';

import { TConnectorList } from '~~/models';

export type TContractsByName<GContractNames extends string> = {
  [contractName in GContractNames]: { [chainId: number]: BaseContract };
};
export type TContractsByChainId<GContractNames extends string> = {
  [chainId: number]: { [contractName in GContractNames]: BaseContract };
};

/**
 *
 */
export type TContractsAppContext<GContractNames extends string> = {
  contractConnectors: TConnectorList<GContractNames>;
  contractsByName: TContractsByName<GContractNames>;
  contractsByChainId: TContractsByChainId<GContractNames>;
};
/**
 * Creates a default state for the contracts context
 * @returns
 * @internal
 */
export const defaultContractsAppContext = <GContractNames extends string>(): TContractsAppContext<GContractNames> => {
  return {
    contractConnectors: {} as TConnectorList<GContractNames>,
    contractsByName: {} as TContractsByName<GContractNames>,
    contractsByChainId: {} as TContractsByChainId<GContractNames>,
  };
};
