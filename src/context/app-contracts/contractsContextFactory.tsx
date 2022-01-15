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

import { useEthersContext } from '~~/context';
import { invalidateCache, isValidEthersAdaptor } from '~~/functions';
import { TEthersAdaptor } from '~~/models';
import { keyNamespace } from '~~/models/constants';
import {
  TAppContractsContext,
  TBaseContractExtended,
  TConnectorList,
  TContractConnector,
  TContractsByChainId,
  TContractsByName,
  TTypedContract,
} from '~~/models/contractContextTypes';

export type TContractsContextProps = {
  ethersContextKey?: string | undefined;
};

/* *************** **************** ******************** */
/* *************** Actions & Dispatch ****************** */
/* *************** **************** ******************** */

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

/* *************** ********************* ****************** */
/* *************** 🏭 Contract Factory 🏭 ****************** */
/* *************** ********************* ****************** */

/**
 *
 * @param loadAppContractConnectors
 * @returns
 */
export const contractsContextFactory = <
  GContractNames extends string,
  GAppConnectorList extends TConnectorList<GContractNames, TBaseContractExtended<GContractNames>>,
  GContractsTypes extends ReturnType<GAppConnectorList[Extract<GContractNames, string>]['connect']>
>(
  loadAppContractConnectors: () => GAppConnectorList | undefined
): {
  ContractsAppContext: FC<PropsWithChildren<TContractsContextProps>>;
  useAppContractsActions: () => TContractsContextActions<GContractNames, GAppConnectorList> | undefined;
  useAppContractsContext: <GName extends GContractNames>(
    contractName: GName,
    chainId: number | undefined
  ) => TTypedContract<GName, GAppConnectorList> | undefined;
  useLoadAppContracts: () => void;
  useConnectAppContracts: (adaptor: TEthersAdaptor | undefined) => void;
} => {
  type GAppContractsContext = TAppContractsContext<GContractNames, GContractsTypes>;

  /* *************** ******** *************************** */
  /* *************** Helpers Functions ****************** */
  /* *************** ******** *************************** */
  const defaultAppContractsContext = (): GAppContractsContext => {
    return {
      contractConnectors: {},
      contractsByName: {},
      contractsByChainId: {},
    } as GAppContractsContext;
  };

  /**
   * Create context state
   * @param appContractConnectorList
   * @returns
   * @internal
   */
  const initalizeState = (appContractConnectorList: GAppConnectorList): GAppContractsContext => {
    const state = defaultAppContractsContext();
    state.contractConnectors = appContractConnectorList as unknown as GAppContractsContext['contractConnectors'];
    return state;
  };

  /**
   * Helper function for immutability of state
   * @param state
   * @returns
   * @internal
   */
  const cloneContextState = (state: GAppContractsContext): GAppContractsContext => {
    const newState = defaultAppContractsContext();
    newState.contractConnectors = { ...state.contractConnectors };
    newState.contractsByName = { ...state.contractsByName };
    newState.contractsByChainId = { ...state.contractsByChainId };

    return newState;
  };

  const sortContractsByChainId = (
    contractsByName: TContractsByName<GContractNames, GContractsTypes>
  ): TContractsByChainId<GContractNames, GContractsTypes> => {
    let contractsByChainId: TContractsByChainId<GContractNames, GContractsTypes> = {};

    const names: GContractNames[] = Object.keys(contractsByName) as GContractNames[];
    names.forEach((name) => {
      const chainIds = Object.keys(contractsByName[name]).map(Number);
      chainIds.forEach((chainId) => {
        const data = {
          [chainId]: { [name]: contractsByName[name][chainId] },
        } as TContractsByName<GContractNames, GContractsTypes>;
        const temp = merge(contractsByChainId, data);
        contractsByChainId = temp as TContractsByChainId<GContractNames, GContractsTypes>;
      });
    });
    return contractsByChainId;
  };

  const sortContractsByName = (
    contractsByChainId: TContractsByChainId<GContractNames, GContractsTypes>
  ): TContractsByName<GContractNames, GContractsTypes> => {
    let contractsByName: TContractsByName<GContractNames, GContractsTypes> = {} as TContractsByName<
      GContractNames,
      GContractsTypes
    >;

    const chainIds = Object.keys(contractsByChainId).map(Number);
    chainIds.forEach((chainId) => {
      const names = Object.keys(contractsByChainId[chainId]) as GContractNames[];
      names.forEach((name) => {
        const data = {
          [name]: { [chainId]: contractsByChainId[chainId][name] },
        };
        const temp = merge(contractsByName, data);
        contractsByName = temp as TContractsByName<GContractNames, GContractsTypes>;
      });
    });

    return contractsByName;
  };

  const removeInvalidContracts = (
    state: GAppContractsContext,
    ethersAdaptor: TEthersAdaptor | undefined
  ): GAppContractsContext => {
    if (ethersAdaptor?.chainId != null) {
      const newState = cloneContextState(state);
      const chainId = ethersAdaptor.chainId;
      delete newState.contractsByChainId[chainId];

      newState.contractsByName = sortContractsByName(newState.contractsByChainId);
      return newState;
    }
    return state;
  };

  /* *************** ******** ************************** */
  /* *************** Action Functions ****************** */
  /* *************** ******** ************************** */

  const connectToContractWithAdaptor = (
    connector: TContractConnector<GContractNames, GContractsTypes>,
    adaptor: TEthersAdaptor
  ): GContractsTypes | undefined => {
    if (adaptor == null || !isValidEthersAdaptor(adaptor)) {
      console.warn('No valid ethers adaptor provided.  Skipping contract connection');
      return undefined;
    }

    const { signer, provider } = adaptor;
    const signerOrProvider = signer ?? provider;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const chainId = adaptor.chainId!;
    const contractAddress = connector?.config?.[chainId]?.address;
    if (contractAddress != null && signerOrProvider != null) {
      const contract = connector.connect(connector.config[chainId].address, signerOrProvider);
      if (contract != null) {
        return contract;
      }
    }

    // error handling
    if (connector.config[chainId] != null) {
      console.warn('ContractConnector requires signer with the same chainId to connect contract');
    }
    console.log(
      `Couldn't connect to contract ${connector?.contractName}:   signer chainId: ${chainId}, config: ${JSON.stringify(
        connector?.config
      )}.`
    );
    console.log('🙅🏽‍♂️ Please make sure the correct network is connected and the contract is deployed.');
    return undefined;
  };

  /**
   * Internal function to connect to all contracts
   * @param payload
   * @returns
   * @internal
   */
  const connectToAllContracts = (
    state: GAppContractsContext,
    ethersAdaptor: TEthersAdaptor | undefined
  ): GAppContractsContext => {
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
        const data = { [contractName]: { [chainId]: contract } } as TContractsByName<GContractNames, GContractsTypes>;
        newState.contractsByName = merge(newState.contractsByName, data) as TContractsByName<
          GContractNames,
          GContractsTypes
        >;
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
    state: GAppContractsContext,
    contractName: GContractNames,
    ethersAdaptor: TEthersAdaptor | undefined
  ): GAppContractsContext => {
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
      const temp = newState.contractsByName[contractConnector.contractName];
      temp[chainId] = contract;
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
    state: GAppContractsContext,
    action: TActions<GContractNames, GAppConnectorList>
  ): GAppContractsContext => {
    switch (action.type) {
      case 'CONNECT_TO_CONTRACT': {
        return connectToContract(state, action.payload.contractName, action.payload.ethersAdaptor);
      }
      case 'CONNECT_TO_CONTRACTS_WITH_ADAPTOR': {
        return connectToAllContracts(state, action.payload.ethersAdaptor);
      }
      case 'ADD_CONTRACT_CONNECTORS': {
        const newState = initalizeState(action.payload.appContractConnectorList);
        // @ts-expect-error
        const newValue = merge(state, newState) as GAppContractsContext;
        return newValue;
      }
      case 'SET_CONTRACT_CONNECTORS': {
        const newState = initalizeState(action.payload.appContractConnectorList);
        return newState;
      }
    }
    return state;
  };

  /* *************** ******** ****************** */
  /* *************** Contexts ****************** */
  /* *************** ******** ****************** */
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
  const ContractsStateContext = createContext<GAppContractsContext | undefined>(undefined);
  const useContractsState = (): Readonly<GAppContractsContext> | undefined => {
    return useContext(ContractsStateContext);
  };

  /* *************** ******** *************** */
  /* *************** Hooks ****************** */
  /* *************** ******** *************** */

  /**
   * Get Contracts for the given contract name
   * @param contractName
   * @param chainId
   * @returns
   */
  const useAppContractsContext = <GName extends GContractNames>(
    contractName: GName,
    chainId: number | undefined
  ): TTypedContract<GName, GAppConnectorList> | undefined => {
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

    if (contract?.contractName) {
      return contract as TTypedContract<GName, GAppConnectorList>;
    }
    return undefined;
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
  /* *************** ******** *************************** */

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
        }}>
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
