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
  TContractsContextActions,
  TContractsAppContext,
  sortContractsByChainId,
  defaultContractsAppContext,
  TContractsActionTypes,
} from '~~/models/contractAppContextTypes';
export interface IContractsContextProps {
  ethersContextKey?: string | undefined;
}

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
   * internal hook for context to use actions and maniuplate contaract state
   * @returns
   * @internal
   */
  const useActions = (): {
    state: TContractsAppContext<GContractNames>;
    actions: (action: TContractsActionTypes<GContractNames>) => Promise<void>;
  } => {
    const isMounted = useIsMounted();
    const [state, setState] = useState(initalizeState({} as any));

    const asyncActions = useCallback(
      async (action: TContractsActionTypes<GContractNames>): Promise<void> => {
        switch (action.type) {
          case 'CONNECT_TO_ALL_CONTRACT': {
            const result = await connectToAllContracts(
              action.payload.appContractConnectorList,
              action.payload.ethersAdaptor
            );
            if (isMounted()) setState(result);
            break;
          }
          case 'CONNECT_TO_CONTRACT': {
            const result = await connectToContract(state, action.payload.contractName, action.payload.ethersAdaptor);
            if (isMounted()) setState(result);
            break;
          }
          default: {
            throw new Error('Unknown action type');
          }
        }
      },
      [state, isMounted]
    );

    return { state, actions: asyncActions };
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
    const { state, actions } = useActions();

    return (
      <ContractsActionsContext.Provider value={actions}>
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
