import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import {
  checkEthersOverride,
  connectToContractWithSigner,
  ethersAdaptorAsRequired,
  isValidEthersAdaptor,
  sortContractsByChainId,
} from '~~/functions';
import { defaultHookOptions, TTypedContract, TEthersAdaptor, TConnectorList } from '~~/models';
import { TAppContractsContext, defaultAppContractsContext } from '~~/models/contractAppContextTypes';

export type TContractsContextProps = {
  ethersContextKey?: string | undefined;
};

export type TContractsContextActions<GContractNames extends string, GAppConnectorList> = {
  connectToAllContractsAction: (
    appContractConnectorList: GAppConnectorList,
    ethersAdaptor: TEthersAdaptor | undefined
  ) => Promise<void>;
  connectToContractAction: (contractName: GContractNames, ethersAdaptor: TEthersAdaptor) => Promise<void>;
};

export const contractsContextFactory = <
  GContractNames extends string,
  GAppConnectorList,
  GContractTypes extends TTypedContract<GContractNames, GAppConnectorList>
>(
  loadAppContractConnectors: () => Promise<GAppConnectorList | undefined>
): {
  AppContractsContext: FC<PropsWithChildren<TContractsContextProps>>;
  useAppContractsActions: () => TContractsContextActions<GContractNames, GAppConnectorList> | undefined;
  useAppContractsContext: <GContract extends GContractTypes>(
    contractName: GContractNames,
    chainId: number
  ) => GContract;
  useLoadAppContracts: () => void;
} => {
  /**
   * ****************************
   * create useContractsAppActions
   * @internal
   */

  const ContractsActionsContext = createContext<
    TContractsContextActions<GContractNames, GAppConnectorList> | undefined
  >(undefined as TContractsContextActions<GContractNames, GAppConnectorList> | undefined);

  const useAppContractsActions = (): TContractsContextActions<GContractNames, GAppConnectorList> | undefined => {
    return useContext(ContractsActionsContext);
  };

  /**
   * ****************************
   * Create useContractAppContext
   *
   * @internal
   */

  const ContractsStateContext = createContext<TAppContractsContext<GContractNames> | undefined>(undefined);

  const useContractsState = (): TAppContractsContext<GContractNames> | undefined => {
    return useContext(ContractsStateContext);
  };

  const useAppContractsContext = <GContract extends GContractTypes>(
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

  /**
   * Internal function to connect to all contracts
   * @param payload
   * @returns
   * @internal
   */
  const connectToAllContracts = async (
    appContractConnectorList: TConnectorList<GContractNames>,
    ethersAdaptor: TEthersAdaptor | undefined
  ): Promise<TAppContractsContext<GContractNames>> => {
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
    state: TAppContractsContext<GContractNames>,
    contractName: GContractNames,
    ethersAdaptor: TEthersAdaptor
  ): Promise<TAppContractsContext<GContractNames>> => {
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

  const useLoadAppContracts = (): void => {
    const ethersProvider = useEthersContext();

    const load = useCallback(async () => {
      if (loadAppContractConnectors != null) {
        const connectors = await loadAppContractConnectors();
        void connectToAllContracts(connectors as unknown as TConnectorList<GContractNames>, ethersProvider);
      }
    }, [ethersProvider]);

    useEffect(() => {
      void load();
    }, [load]);
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
  const AppContractsContext: FC<TContractsContextProps> = (props: PropsWithChildren<TContractsContextProps>) => {
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
      async (appContractConnectorList: GAppConnectorList, ethersAdaptor: TEthersAdaptor | undefined): Promise<void> => {
        const result = await connectToAllContracts(
          appContractConnectorList as unknown as TConnectorList<GContractNames>,
          ethersAdaptor
        );
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
    AppContractsContext,
    useAppContractsActions,
    useAppContractsContext,
    useLoadAppContracts,
  };
};
