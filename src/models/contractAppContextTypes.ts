import { BaseContract } from 'ethers';

import { TEthersAdaptor, TConnectorList } from '~~/models';

export type TContractsByName<GContractNames extends string> = {
  [contractName in GContractNames]: { [chainId: number]: BaseContract };
};
export type TContractsByChainId<GContractNames extends string> = {
  [chainId: number]: { [contractName in GContractNames]: BaseContract };
};

export const sortContractsByChainId = <GContractNames extends string>(
  contractsByName: TContractsByName<GContractNames>
): TContractsByChainId<GContractNames> => {
  const contractsByChainId: TContractsByChainId<GContractNames> = {};

  Object.keys(contractsByName).forEach((name: string) => {
    const contractName = name as GContractNames;
    Object.keys(contractsByName[contractName])
      .map(Number)
      .forEach((chainId: number) => {
        contractsByChainId[chainId][contractName] = contractsByName[contractName][chainId];
      });
  });

  return contractsByChainId;
};

export type TActionConnectToContract<GContractNames> = {
  type: 'CONNECT_TO_CONTRACT';
  payload: {
    contractName: GContractNames;
    ethersAdaptor: TEthersAdaptor;
  };
};

export type TActionConnectAllToContracts<GAppContractConnectorList> = {
  type: 'CONNECT_TO_ALL_CONTRACT';
  payload: {
    appContractConnectorList: GAppContractConnectorList;
    ethersAdaptor: TEthersAdaptor | undefined;
  };
};

export type TContractsActionTypes<GContractNames, GAppContractConnectorList> =
  | TActionConnectAllToContracts<GAppContractConnectorList>
  | TActionConnectToContract<GContractNames>;

export type TContractsContextActions<GContractNames, GAppContractConnectorList> = (
  action: TContractsActionTypes<GContractNames, GAppContractConnectorList>
) => Promise<void>;

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
