import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import {
  checkEthersOverride,
  connectToContractWithSigner,
  ethersAdaptorAsRequired,
  isValidEthersAdaptor,
} from '~~/functions';
import { defaultHookOptions, TTypedContract, TEthersAdaptor, TConnectorList } from '~~/models';
import {
  TContractsAppContext,
  defaultContractsAppContext,
  TContractsByName,
  TContractsByChainId,
} from '~~/models/contractAppContextTypes';
export interface IContractsContextProps {
  ethersContextKey?: string | undefined;
}

const sortContractsByChainId = <GContractNames extends string>(
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

export type TContractsContextActions<GContractNames extends string> = {
  connectToAllContractsAction: (
    appContractConnectorList: TConnectorList<GContractNames>,
    ethersAdaptor: TEthersAdaptor | undefined
  ) => Promise<void>;
  connectToContractAction: (contractName: GContractNames, ethersAdaptor: TEthersAdaptor) => Promise<void>;
};

export const contractsAppContextFactory = <
  GContractNames extends string,
  GAppConnectorList,
  GContractTypes extends TTypedContract<GContractNames, GAppConnectorList>
>(): {
  ContractsAppContext: FC<PropsWithChildren<IContractsContextProps>>;
  useContractsAppActions: () => TContractsContextActions<GContractNames> | undefined;
  useContractsAppContext: <GContract extends GContractTypes>(
    contractName: GContractNames,
    chainId: number
  ) => GContract;
} => {
  /**
   * ****************************
   * create useContractsAppActions
   * @internal
   */

  const ContractsActionsContext = createContext<TContractsContextActions<GContractNames> | undefined>(
    undefined as TContractsContextActions<GContractNames> | undefined
  );

  const useContractsAppActions = (): TContractsContextActions<GContractNames> | undefined => {
    return useContext(ContractsActionsContext);
  };

  /**
   * ****************************
   * Create useContractAppContext
   *
   * @internal
   */

  const ContractsStateContext = createContext<TContractsAppContext<GContractNames> | undefined>(undefined);

  const useContractsState = (): TContractsAppContext<GContractNames> | undefined => {
    return useContext(ContractsStateContext);
  };

  const useContractsAppContext = <GContract extends GContractTypes>(
    contractName: GContractNames,
    chainId: number
  ): GContract => {
    const contractsState = useContractsState();
    const contract = contractsState?.contractsByName[contractName][chainId];
    if (!contract) {
      throw new Error(`Contract ${contractName} not found on chain ${chainId}`);
    }
    return contract as GContract;
  };

  /**
   * Create context state
   * @param appContractConnectorList
   * @returns
   * @internal
   */
  const initalizeState = (appContractConnectorList: GAppConnectorList): TContractsAppContext<GContractNames> => {
    const state = defaultContractsAppContext<GContractNames>();
    state.contractConnectors = appContractConnectorList as unknown as TConnectorList<GContractNames>;
    return state;
  };

  /**
   * Helper function for immutability of state
   * @param state
   * @returns
   * @internal
   */
  const cloneContextState = (state: TContractsAppContext<GContractNames>): TContractsAppContext<GContractNames> => {
    const newState = defaultContractsAppContext<GContractNames>();
    newState.contractConnectors = { ...state.contractConnectors };
    newState.contractsByName = { ...state.contractsByName };
    newState.contractsByChainId = { ...state.contractsByChainId };

    return newState;
  };

  /**
   * Internal function to connect to all contracts
   * @param payload
   * @returns
   * @internal
   */
  const connectToAllContracts = async (
    appContractConnectorList: TConnectorList<GContractNames>,
    ethersAdaptor: TEthersAdaptor | undefined
  ): Promise<TContractsAppContext<GContractNames>> => {
    const state = initalizeState(appContractConnectorList as unknown as GAppConnectorList);
    if (!isValidEthersAdaptor(ethersAdaptor)) return state;

    const { chainId, signer } = ethersAdaptorAsRequired(ethersAdaptor);
    for (const contractName in state.contractConnectors) {
      const connector = state.contractConnectors[contractName];
      if (chainId && connector.config[chainId] != null) {
        const contract = await connectToContractWithSigner(connector, signer);
        state.contractsByName[contractName][chainId] = contract;
      }
    }
    state.contractsByChainId = sortContractsByChainId(state.contractsByName);
    return state;
  };

  /**
   * Internal function to connect to a single contract
   * @param state
   * @param payload
   * @returns
   * @internal
   */
  const connectToContract = async (
    state: TContractsAppContext<GContractNames>,
    contractName: GContractNames,
    ethersAdaptor: TEthersAdaptor
  ): Promise<TContractsAppContext<GContractNames>> => {
    if (!isValidEthersAdaptor(ethersAdaptor)) return state;

    const newState = cloneContextState(state);
    const { chainId, signer } = ethersAdaptorAsRequired(ethersAdaptor);
    const contractConnector = newState.contractConnectors[contractName];

    const contract = await connectToContractWithSigner(contractConnector, signer);
    newState.contractsByName[contractConnector.contractName] = {};
    newState.contractsByName[contractConnector.contractName][chainId] = contract;
    newState.contractsByChainId = sortContractsByChainId(newState.contractsByName);
    return newState;
  };
  /**
   * #### Summary
   *
   *
   * @category ContractContext
   *
   * @param props
   * @returns
   */
  const ContractsAppContext: FC<IContractsContextProps> = (props: PropsWithChildren<IContractsContextProps>) => {
    const ethersContext = useEthersContext(props.ethersContextKey);
    const ethersAdaptor: TEthersAdaptor | undefined = checkEthersOverride(ethersContext, {
      ...defaultHookOptions(),
      alternateEthersContextKey: props.ethersContextKey,
    });

    const isMounted = useIsMounted();
    const [state, setState] = useState(initalizeState({} as any));

    const connectToContractAction = useCallback(
      async (contractName: GContractNames, ethersAdaptor: TEthersAdaptor): Promise<void> => {
        const result = await connectToContract(state, contractName, ethersAdaptor);
        if (isMounted()) setState(result);
      },
      [isMounted, state]
    );

    const connectToAllContractsAction = useCallback(
      async (
        appContractConnectorList: TConnectorList<GContractNames>,
        ethersAdaptor: TEthersAdaptor | undefined
      ): Promise<void> => {
        const result = await connectToAllContracts(appContractConnectorList, ethersAdaptor);
        if (isMounted()) setState(result);
      },
      [isMounted]
    );

    return (
      <ContractsActionsContext.Provider value={{ connectToAllContractsAction, connectToContractAction }}>
        <ContractsStateContext.Provider value={state}>{props.children}</ContractsStateContext.Provider>
      </ContractsActionsContext.Provider>
    );
  };

  return {
    ContractsAppContext,
    useContractsAppActions,
    useContractsAppContext,
  };
};
