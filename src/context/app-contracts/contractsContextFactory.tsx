import { merge } from 'merge-anything';
import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useQueryClient } from 'react-query';
import invariant from 'ts-invariant';

import { connectToContractWithAdaptor, useEthersContext } from '~~/context';
import { invalidateCache, isValidEthersAdaptor, sortContractsByChainId, sortContractsByName } from '~~/functions';
import { TTypedContract, TEthersAdaptor, TConnectorList } from '~~/models';
import { keyNamespace } from '~~/models/constants';
import { TAppContractsContext, defaultAppContractsContext, TContractsByName } from '~~/models/contractContextTypes';

export type TContractsContextProps = {
  ethersContextKey?: string | undefined;
};

/* *************** **************** ******************** */
/* *************** Actions & Dispatch ****************** */

type TActionConnectToContract<GContractNames extends string> = {
  type: 'CONNECT_TO_CONTRACT';
  payload: {
    contractName: GContractNames;
    ethersAdaptor: TEthersAdaptor;
  };
};
type TActionConnectAllToContracts = {
  type: 'CONNECT_TO_CONTRACTS_WITH_ADAPTOR';
  payload: {
    ethersAdaptor: TEthersAdaptor | undefined;
  };
};
type TActionAddContractConnectors<GAppConnectorList> = {
  type: 'ADD_CONTRACT_CONNECTORS';
  payload: {
    appContractConnectorList: GAppConnectorList;
  };
};
type TActionSetContractConnectors<GAppConnectorList> = {
  type: 'SET_CONTRACT_CONNECTORS';
  payload: {
    appContractConnectorList: GAppConnectorList;
  };
};
type TActions<GContractNames extends string, GAppConnectorList> =
  | TActionConnectToContract<GContractNames>
  | TActionConnectAllToContracts
  | TActionAddContractConnectors<GAppConnectorList>
  | TActionSetContractConnectors<GAppConnectorList>;

export type TContractsContextActions<GContractNames extends string, GAppConnectorList> = {
  connectToAllContractsAction: (
    appContractConnectorList: GAppConnectorList,
    ethersAdaptor: TEthersAdaptor | undefined
  ) => void;
  connectToContractAction: (contractName: GContractNames, ethersAdaptor: TEthersAdaptor) => void;
  setContractConnectors: (appContractConnectorList: GAppConnectorList) => void;
  addContractConnectors: (appContractConnectorList: GAppConnectorList) => void;
  dispatch: Dispatch<TActions<GContractNames, GAppConnectorList>>;
};

/* *************** **************** ****************** */
/* *************** Contract Factory ****************** */

/**
 *
 * @param loadAppContractConnectors
 * @returns
 */
export const contractsContextFactory = <
  GContractNames extends string,
  GAppConnectorList,
  GContractTypes extends TTypedContract<GContractNames, GAppConnectorList>
>(
  loadAppContractConnectors: () => GAppConnectorList | undefined
): {
  ContractsAppContext: FC<PropsWithChildren<TContractsContextProps>>;
  useAppContractsActions: () => TContractsContextActions<GContractNames, GAppConnectorList> | undefined;
  useAppContractsContext: <GContract extends GContractTypes>(
    contractName: GContractNames,
    chainId: number | undefined
  ) => GContract | undefined;
  useLoadAppContracts: () => void;
  useConnectAppContracts: (adaptor: TEthersAdaptor | undefined) => void;
} => {
  /* *************** ******** ************************************ */
  /* *************** Contract Helpers Functions ****************** */
  /**
   * Create context state
   * @param appContractConnectorList
   * @returns
   * @internal
   */
  const initalizeState = (appContractConnectorList: GAppConnectorList): TAppContractsContext<GContractNames> => {
    const state = defaultAppContractsContext<GContractNames>();
    state.contractConnectors = appContractConnectorList as unknown as TConnectorList<GContractNames>;
    return state;
  };

  /**
   * Helper function for immutability of state
   * @param state
   * @returns
   * @internal
   */
  const cloneContextState = (state: TAppContractsContext<GContractNames>): TAppContractsContext<GContractNames> => {
    const newState = defaultAppContractsContext<GContractNames>();
    newState.contractConnectors = { ...state.contractConnectors };
    newState.contractsByName = { ...state.contractsByName };
    newState.contractsByChainId = { ...state.contractsByChainId };

    return newState;
  };

  const removeInvalidContracts = (
    state: TAppContractsContext<GContractNames>,
    ethersAdaptor: TEthersAdaptor | undefined
  ): TAppContractsContext<GContractNames> => {
    if (ethersAdaptor?.chainId != null) {
      const newState = cloneContextState(state);
      const chainId = ethersAdaptor.chainId;
      delete newState.contractsByChainId[chainId];

      newState.contractsByName = sortContractsByName(newState.contractsByChainId);
      return newState;
    }
    return state;
  };

  /* *************** ******** ****************************************** */
  /* *************** Contract Action Helper Functions ****************** */
  /**
   * Internal function to connect to all contracts
   * @param payload
   * @returns
   * @internal
   */
  const connectToAllContracts = (
    state: TAppContractsContext<GContractNames>,
    ethersAdaptor: TEthersAdaptor | undefined
  ): TAppContractsContext<GContractNames> => {
    if (ethersAdaptor == null || !isValidEthersAdaptor(ethersAdaptor)) {
      invariant.log('connectToAllContracts: Invalid ethers adaptor');
      return removeInvalidContracts(state, ethersAdaptor);
    }
    const newState = cloneContextState(state);

    const { chainId, signer, provider } = ethersAdaptor;
    const providerOrSigner = signer ?? provider;
    for (const contractName in newState.contractConnectors) {
      const connector = newState.contractConnectors[contractName];
      if (chainId && connector.config[chainId] != null && providerOrSigner != null) {
        const contract = connectToContractWithAdaptor(connector, ethersAdaptor);
        const data = { [contractName]: { [chainId]: contract } } as TContractsByName<GContractNames>;
        newState.contractsByName = merge(newState.contractsByName, data) as TContractsByName<GContractNames>;
      }
    }
    newState.contractsByChainId = sortContractsByChainId(newState.contractsByName);
    return newState;
  };

  /**
   * Internal function to connect to a single contract
   * @param state
   * @param payload
   * @returns
   * @internal
   */
  const connectToContract = (
    state: TAppContractsContext<GContractNames>,
    contractName: GContractNames,
    ethersAdaptor: TEthersAdaptor | undefined
  ): TAppContractsContext<GContractNames> => {
    if (ethersAdaptor == null || !isValidEthersAdaptor(ethersAdaptor)) {
      invariant.log('connectToAllContracts: Invalid ethers adaptor');
      return removeInvalidContracts(state, ethersAdaptor);
    }

    const newState = cloneContextState(state);
    const { chainId } = ethersAdaptor;
    const contractConnector = newState.contractConnectors[contractName];

    if (chainId && contractConnector.config[chainId] != null) {
      const contract = connectToContractWithAdaptor(contractConnector, ethersAdaptor);
      newState.contractsByName[contractConnector.contractName] = {};
      newState.contractsByName[contractConnector.contractName][chainId] = contract;
      newState.contractsByChainId = sortContractsByChainId(newState.contractsByName);
    }
    return newState;
  };

  /**
   *
   * @param state
   * @param action
   * @returns
   */
  const reducer = (
    state: TAppContractsContext<GContractNames>,
    action: TActions<GContractNames, GAppConnectorList>
  ): TAppContractsContext<GContractNames> => {
    switch (action.type) {
      case 'CONNECT_TO_CONTRACT': {
        return connectToContract(state, action.payload.contractName, action.payload.ethersAdaptor);
      }
      case 'CONNECT_TO_CONTRACTS_WITH_ADAPTOR': {
        return connectToAllContracts(state, action.payload.ethersAdaptor);
      }
      case 'ADD_CONTRACT_CONNECTORS': {
        const newState = initalizeState(action.payload.appContractConnectorList);
        // @ts-ignore
        const newValue = merge(state, newState) as TAppContractsContext<GContractNames>;
        return newValue;
      }
      case 'SET_CONTRACT_CONNECTORS': {
        const newState = initalizeState(action.payload.appContractConnectorList);
        return newState;
      }
    }
    return state;
  };

  /* *************** ******** *************************** */
  /* *************** Contract Contexts ****************** */
  /**
   * @internal
   */
  const ContractsActionsContext = createContext<
    TContractsContextActions<GContractNames, GAppConnectorList> | undefined
  >(undefined);

  const useAppContractsActions = (): TContractsContextActions<GContractNames, GAppConnectorList> | undefined => {
    return useContext(ContractsActionsContext);
  };

  /**
   *
   * @internal
   */
  const ContractsStateContext = createContext<TAppContractsContext<GContractNames> | undefined>(undefined);
  const useContractsState = (): Readonly<TAppContractsContext<GContractNames>> | undefined => {
    return useContext(ContractsStateContext);
  };

  /* *************** ******** ************************ */
  /* *************** Contract Hooks ****************** */

  /**
   * Get Contracts for the given contract name
   * @param contractName
   * @param chainId
   * @returns
   */
  const useAppContractsContext = <GContract extends GContractTypes>(
    contractName: GContractNames,
    chainId: number | undefined
  ): GContract | undefined => {
    const contractsState = useContractsState();
    const ethersContext = useEthersContext();
    const contract = contractsState?.contractsByName?.[contractName]?.[chainId ?? -1]; // -1 is unknown chainId
    const contractConnector = contractsState?.contractConnectors?.[contractName];
    const chainIdRef = useRef(-1);

    // just making sure app is initalized before spamming console logs
    // connector abi initialized, ethers context is initalized
    if (
      contract == null &&
      ethersContext?.chainId != null &&
      contractConnector?.abi != null &&
      chainId === chainIdRef.current
    ) {
      console.warn(`⚠️ Contract ${contractName} not found on chain ${chainId}.`);
      console.warn(
        `🙋🏽‍♂️ 1. Did you setup the contract in the config ? 2. Did you call useLoadAppContracts with an adaptor that has the correct chainId ?`
      );
      chainIdRef.current = chainId;
    }
    return contract as GContract;
  };

  /**
   *
   * @param adaptor
   */
  const useLoadAppContracts = (): void => {
    const actions = useAppContractsActions();
    const queryClient = useQueryClient();

    const load = useCallback(() => {
      if (loadAppContractConnectors != null) {
        const connectors = loadAppContractConnectors();
        if (connectors != null && actions != null) {
          actions.dispatch({ type: 'SET_CONTRACT_CONNECTORS', payload: { appContractConnectorList: connectors } });
          invalidateCache(queryClient, keyNamespace.contracts);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      void load();
    }, [load]);
  };

  const useConnectAppContracts = (adaptor: TEthersAdaptor | undefined): void => {
    const actions = useAppContractsActions();
    const queryClient = useQueryClient();
    const validAdaptorState = isValidEthersAdaptor(adaptor);

    const connect = useCallback(() => {
      if (adaptor?.chainId != null && actions != null) {
        actions.dispatch({ type: 'CONNECT_TO_CONTRACTS_WITH_ADAPTOR', payload: { ethersAdaptor: adaptor } });
        invalidateCache(queryClient, keyNamespace.contracts);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adaptor?.provider, adaptor?.signer, adaptor?.chainId, adaptor?.account, validAdaptorState]);

    useEffect(() => {
      void connect();
    }, [connect]);
  };

  /* *************** ******** *************************** */
  /* *************** Context Component ****************** */
  /**
   * #### Summary
   *
   *
   * @category ContractContext
   *
   * @param props
   * @returns
   */
  const ContractsAppContext: FC<TContractsContextProps> = (props: PropsWithChildren<TContractsContextProps>) => {
    const [rState, dispatch] = useReducer(reducer, initalizeState({} as GAppConnectorList));

    const connectToContractAction = useCallback((contractName: GContractNames, ethersAdaptor: TEthersAdaptor): void => {
      dispatch({ type: 'CONNECT_TO_CONTRACT', payload: { contractName, ethersAdaptor } });
    }, []);

    const connectToAllContractsAction = useCallback((ethersAdaptor: TEthersAdaptor | undefined): void => {
      dispatch({ type: 'CONNECT_TO_CONTRACTS_WITH_ADAPTOR', payload: { ethersAdaptor } });
    }, []);

    const setContractConnectors = useCallback((appContractConnectorList: GAppConnectorList) => {
      dispatch({ type: 'SET_CONTRACT_CONNECTORS', payload: { appContractConnectorList } });
    }, []);

    const addContractConnectors = useCallback((appContractConnectorList: GAppConnectorList) => {
      dispatch({ type: 'ADD_CONTRACT_CONNECTORS', payload: { appContractConnectorList } });
    }, []);

    return (
      <ContractsActionsContext.Provider
        value={{
          dispatch,
          connectToAllContractsAction,
          connectToContractAction,
          setContractConnectors,
          addContractConnectors,
        }}
      >
        <ContractsStateContext.Provider value={rState}>{props.children}</ContractsStateContext.Provider>
      </ContractsActionsContext.Provider>
    );
  };

  return {
    ContractsAppContext: ContractsAppContext,
    useAppContractsActions,
    useAppContractsContext,
    useLoadAppContracts,
    useConnectAppContracts,
  };
};
