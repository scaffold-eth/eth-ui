import { merge } from 'merge-anything';
import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import {
  asEthersAdaptor,
  checkEthersOverride,
  connectToContractWithSigner,
  ethersAdaptorAsRequired,
  isValidEthersAdaptor,
  sortContractsByChainId,
} from '~~/functions';
import { defaultHookOptions, TTypedContract, TEthersAdaptor, TConnectorList } from '~~/models';
import { TAppContractsContext, defaultAppContractsContext, TContractsByName } from '~~/models/contractAppContextTypes';

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
} => {
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

  /* *************** Contract Action Helper Functions ****************** */

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
        const data = { [contractName]: { [chainId]: contract } } as TContractsByName<GContractNames>;
        state.contractsByName = merge(state.contractsByName, data) as TContractsByName<GContractNames>;
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

  /* *************** Contract Context Action ****************** */

  /**
   * @internal
   */
  const ContractsActionsContext = createContext<
    TContractsContextActions<GContractNames, GAppConnectorList> | undefined
  >(undefined as TContractsContextActions<GContractNames, GAppConnectorList> | undefined);

  const useAppContractsActions = (): TContractsContextActions<GContractNames, GAppConnectorList> | undefined => {
    return useContext(ContractsActionsContext);
  };

  /* *************** Contract Context State ****************** */

  /**
   *
   * @internal
   */
  const ContractsStateContext = createContext<TAppContractsContext<GContractNames> | undefined>(undefined);
  const useContractsState = (): TAppContractsContext<GContractNames> | undefined => {
    return useContext(ContractsStateContext);
  };

  /* *************** Hook:  Get Contract ****************** */

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
      console.log(`Contract ${contractName} not found on chain ${chainId}`);
    }
    return contract as GContract;
  };

  /* *************** Hook: Load Contracts ****************** */

  const useLoadAppContracts = (): void => {
    const ethersProvider = useEthersContext();
    const actions = useAppContractsActions();
    const adaptor = asEthersAdaptor(ethersProvider);

    const load = useCallback(async () => {
      if (loadAppContractConnectors != null && adaptor.signer != null && adaptor.chainId != null) {
        const connectors = await loadAppContractConnectors();
        if (connectors != null) {
          await actions?.connectToAllContractsAction(connectors, adaptor);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actions?.connectToAllContractsAction, adaptor.signer, adaptor.chainId]);

    useEffect(() => {
      void load();
    }, [load]);
  };

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
    const ethersContext = useEthersContext(props.ethersContextKey);
    const ethersAdaptor: TEthersAdaptor | undefined = checkEthersOverride(ethersContext, {
      ...defaultHookOptions(),
      alternateEthersContextKey: props.ethersContextKey,
    });

    const isMounted = useIsMounted();
    const [state, setState] = useState(initalizeState({} as GAppConnectorList));

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
    ContractsAppContext: ContractsAppContext,
    useAppContractsActions,
    useAppContractsContext,
    useLoadAppContracts,
  };
};
