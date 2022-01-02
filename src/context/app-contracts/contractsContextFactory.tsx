import { merge } from 'merge-anything';
import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { connectToContractWithSignerOrProvider, isValidEthersAdaptor, sortContractsByChainId } from '~~/functions';
import { TTypedContract, TEthersAdaptor, TConnectorList } from '~~/models';
import { TAppContractsContext, defaultAppContractsContext, TContractsByName } from '~~/models/contractContextTypes';

export type TContractsContextProps = {
  ethersContextKey?: string | undefined;
};

export type TContractsContextActions<GContractNames extends string, GAppConnectorList> = {
  connectToAllContractsAction: (
    appContractConnectorList: GAppConnectorList,
    ethersAdaptor: TEthersAdaptor | undefined
  ) => void;
  connectToContractAction: (contractName: GContractNames, ethersAdaptor: TEthersAdaptor) => void;
  setContractConnectors: (appContractConnectorList: GAppConnectorList) => void;
  addContractConnectors: (appContractConnectorList: GAppConnectorList) => void;
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
  loadAppContractConnectors: () => Promise<GAppConnectorList | undefined>
): {
  ContractsAppContext: FC<PropsWithChildren<TContractsContextProps>>;
  useAppContractsActions: () => TContractsContextActions<GContractNames, GAppConnectorList> | undefined;
  useAppContractsContext: <GContract extends GContractTypes>(
    contractName: GContractNames,
    chainId: number
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
    const newState = cloneContextState(state);
    if (ethersAdaptor == null || !isValidEthersAdaptor(ethersAdaptor)) return newState;

    const { chainId, signer, provider } = ethersAdaptor;
    const providerOrSigner = signer ?? provider;
    for (const contractName in newState.contractConnectors) {
      const connector = newState.contractConnectors[contractName];
      if (chainId && connector.chainId === chainId && providerOrSigner != null) {
        const contract = connectToContractWithSignerOrProvider(connector, providerOrSigner, chainId);
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
    if (ethersAdaptor == null || !isValidEthersAdaptor(ethersAdaptor)) return state;

    const newState = cloneContextState(state);
    const { chainId, signer, provider } = ethersAdaptor;
    const providerOrSigner = signer ?? provider;
    const contractConnector = newState.contractConnectors[contractName];

    if (chainId && contractConnector.chainId === chainId && providerOrSigner != null) {
      const contract = connectToContractWithSignerOrProvider(contractConnector, providerOrSigner, chainId);
      newState.contractsByName[contractConnector.contractName] = {};
      newState.contractsByName[contractConnector.contractName][chainId] = contract;
      newState.contractsByChainId = sortContractsByChainId(newState.contractsByName);
    }
    return newState;
  };

  /* *************** ******** *************************** */
  /* *************** Contract Contexts ****************** */
  /**
   * @internal
   */
  const ContractsActionsContext = createContext<
    TContractsContextActions<GContractNames, GAppConnectorList> | undefined
  >(undefined as TContractsContextActions<GContractNames, GAppConnectorList> | undefined);

  const useAppContractsActions = (): TContractsContextActions<GContractNames, GAppConnectorList> | undefined => {
    return useContext(ContractsActionsContext);
  };

  /**
   *
   * @internal
   */
  const ContractsStateContext = createContext<TAppContractsContext<GContractNames> | undefined>(undefined);
  const useContractsState = (): TAppContractsContext<GContractNames> | undefined => {
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
    chainId: number
  ): GContract | undefined => {
    const contractsState = useContractsState();
    const contract = contractsState?.contractsByName?.[contractName]?.[chainId];
    if (!contract) {
      console.warn(
        `⚠️ Contract ${contractName} not found on chain ${chainId}.  1. Did you setup the contract in the config? 2. Did you call useLoadAppContracts with an adaptor that has the correct chainId?`
      );
    }
    return contract as GContract;
  };

  /**
   *
   * @param adaptor
   */
  const useLoadAppContracts = (): void => {
    const actions = useAppContractsActions();

    const load = useCallback(async () => {
      if (loadAppContractConnectors != null) {
        const connectors = await loadAppContractConnectors();
        if (connectors != null) {
          actions?.addContractConnectors(connectors);
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
    const state = useContractsState();

    const connect = useCallback(() => {
      if (adaptor?.chainId != null) {
        actions?.connectToAllContractsAction(state?.contractConnectors as unknown as GAppConnectorList, adaptor);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adaptor?.provider, adaptor?.signer, adaptor?.chainId]);

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
    // const ethersContext = useEthersContext(props.ethersContextKey);
    // const ethersAdaptor: TEthersAdaptor | undefined = checkEthersOverride(ethersContext, {
    //   ...defaultHookOptions(),
    //   alternateEthersContextKey: props.ethersContextKey,
    // });

    const isMounted = useIsMounted();
    const [state, setState] = useState(initalizeState({} as GAppConnectorList));

    const connectToContractAction = useCallback(
      (contractName: GContractNames, ethersAdaptor: TEthersAdaptor): void => {
        const result = connectToContract(state, contractName, ethersAdaptor);
        if (isMounted()) setState(result);
      },
      [isMounted, state]
    );

    const connectToAllContractsAction = useCallback(
      (ethersAdaptor: TEthersAdaptor | undefined): void => {
        const result = connectToAllContracts(state, ethersAdaptor);
        if (isMounted()) setState(result);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isMounted]
    );

    const setContractConnectors = useCallback((appContractConnectorList: GAppConnectorList) => {
      setState(initalizeState(appContractConnectorList));
    }, []);

    const addContractConnectors = useCallback((appContractConnectorList: GAppConnectorList) => {
      setState((value) => {
        const newConnectors = initalizeState(appContractConnectorList);
        // @ts-ignore
        const newValue = merge(value, newConnectors) as TAppContractsContext<GContractNames>;
        return newValue;
      });
    }, []);

    return (
      <ContractsActionsContext.Provider
        value={{ connectToAllContractsAction, connectToContractAction, setContractConnectors, addContractConnectors }}>
        <ContractsStateContext.Provider value={state}>{props.children}</ContractsStateContext.Provider>
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
