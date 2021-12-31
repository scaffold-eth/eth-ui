import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import {
  checkEthersOverride,
  connectToContractWithSigner,
  ethersAdaptorAsRequired,
  isValidEthersAdaptor,
} from '~~/functions';
import { defaultHookOptions, TTypedContract, TEthersAdaptor, TTypedContractConnectorList } from '~~/models';
import {
  TContractsContextActions,
  TContractAppContext,
  TActionConnectAllToContracts,
  sortContractsByChainId,
  TActionConnectToContract,
  defaultContractAppContext,
  TContractActions,
} from '~~/models/contractAppContextTypes';
export interface IContractsContextProps {
  ethersContextKey?: string | undefined;
}

export const contractsAppContextFactory = <
  GContractNames extends string,
  GAppContractConnectorList,
  GContractTypes extends TTypedContract<GContractNames, GAppContractConnectorList>
>(): {
  ContractsAppContext: FC<PropsWithChildren<IContractsContextProps>>;
  useContractsAppActions: () => TContractsContextActions<GContractNames, GAppContractConnectorList> | undefined;
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

  const ContractsActionsContext = createContext<
    TContractsContextActions<GContractNames, GAppContractConnectorList> | undefined
  >(undefined as TContractsContextActions<GContractNames, GAppContractConnectorList> | undefined);
  const ContractsStateContext = createContext<TContractAppContext<GContractNames> | undefined>(undefined);

  const useContractsAppActions = ():
    | TContractsContextActions<GContractNames, GAppContractConnectorList>
    | undefined => {
    return useContext(ContractsActionsContext) as TContractsContextActions<GContractNames, GAppContractConnectorList>;
  };

  /**
   * ****************************
   * Create useContractAppContext
   *
   * @internal
   */
  const useContractsState = (): TContractAppContext<GContractNames> | undefined => {
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
  const initalizeState = (appContractConnectorList: GAppContractConnectorList): TContractAppContext<GContractNames> => {
    const state = defaultContractAppContext<GContractNames>();
    state.contractConnectors = appContractConnectorList as unknown as TTypedContractConnectorList<GContractNames>;
    return state;
  };

  /**
   * Helper function for immutability of state
   * @param state
   * @returns
   * @internal
   */
  const cloneReducerState = (state: TContractAppContext<GContractNames>): TContractAppContext<GContractNames> => {
    const newState = defaultContractAppContext<GContractNames>();
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
    payload: TActionConnectAllToContracts<GAppContractConnectorList>['payload']
  ): Promise<TContractAppContext<GContractNames>> => {
    const state = initalizeState(payload.appContractConnectorList);
    if (!isValidEthersAdaptor(payload.ethersAdaptor)) return state;

    const { chainId, signer } = ethersAdaptorAsRequired(payload.ethersAdaptor);
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
    state: TContractAppContext<GContractNames>,
    payload: TActionConnectToContract<GContractNames>['payload']
  ): Promise<TContractAppContext<GContractNames>> => {
    if (!isValidEthersAdaptor(payload.ethersAdaptor)) return state;

    const newState = cloneReducerState(state);
    const { chainId, signer } = ethersAdaptorAsRequired(payload.ethersAdaptor);
    const contractConnector = newState.contractConnectors[payload.contractName];

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
    state: TContractAppContext<GContractNames>;
    actions: (action: TContractActions<GContractNames, GAppContractConnectorList>) => Promise<void>;
  } => {
    const isMounted = useIsMounted();
    const [state, setState] = useState(initalizeState({} as any));

    const asyncActions = useCallback(
      async (action: TContractActions<GContractNames, GAppContractConnectorList>): Promise<void> => {
        switch (action.type) {
          case 'CONNECT_TO_ALL_CONTRACT': {
            const result = await connectToAllContracts(action.payload);
            if (isMounted()) setState(result);
            break;
          }
          case 'CONNECT_TO_CONTRACT': {
            const result = await connectToContract(state, action.payload);
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
