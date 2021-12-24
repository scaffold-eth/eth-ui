import { BaseContract } from 'ethers';
import React, { createContext, FC, PropsWithChildren, useContext, useReducer, useState } from 'react';
import warning from 'tiny-warning';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import {
  checkEthersOverride,
  connectToContractWithSigner,
  ethersAdaptorAsRequired,
  isValidEthersAdaptor,
} from '~~/functions';
import { defaultHookOptions, TContractTypes, TEthersAdaptor, TTypechainContractConnectorList } from '~~/models';

// import { AppContractDefinitions } from '~~/models/AppContractDefinitions';

export interface IContractsContextProps {
  ethersContextKey?: string | undefined;
}

export type TContractDispatch<GContractNames extends string> = {
  setAppContractConnectors: (appContractConnectors: TTypechainContractConnectorList<GContractNames>) => void;
};

export type TContractsByName<GContractNames extends string> = {
  [contractName in GContractNames]: { [chainId: number]: BaseContract };
};
export type TContractsByChainId<GContractNames extends string> = {
  [chainId: number]: { [contractName in GContractNames]: BaseContract };
};

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

export type TContractReducerState<GContractNames extends string> = {
  contractConnectors: TTypechainContractConnectorList<GContractNames>;
  contractsByName: TContractsByName<GContractNames>;
  contractsByChainId: TContractsByChainId<GContractNames>;
};

const defaultContractReducer = <GContractNames extends string>(): TContractReducerState<GContractNames> => {
  return {
    contractConnectors: {} as TTypechainContractConnectorList<GContractNames>,
    contractsByName: {} as TContractsByName<GContractNames>,
    contractsByChainId: {} as TContractsByChainId<GContractNames>,
  };
};

export const contractAppContextFactory = <
  GContractNames extends string,
  GAppContractConnectorList,
  GContractTypes extends TContractTypes<GContractNames, GAppContractConnectorList>
>(): // appContractConnectorsList: GAppContractConnectorList
{
  ContractsContext: FC<PropsWithChildren<IContractsContextProps>>;
  ContractsDispatchContext: React.Context<TContractDispatch<GContractNames> | undefined>;
  ContractsStateContext: React.Context<TContractReducerState<GContractNames> | undefined>;
  useContractsDispatchContext: () => TContractDispatch<GContractNames> | undefined;
  useGetContract: <GContract extends GContractTypes>(contractName: GContractNames, chainId: number) => GContract;
} => {
  const ContractsDispatchContext = createContext<TContractDispatch<GContractNames> | undefined>(
    undefined as TContractDispatch<GContractNames> | undefined
  );
  const ContractsStateContext = createContext<TContractReducerState<GContractNames> | undefined>(undefined);

  const useContractsDispatchContext = (): TContractDispatch<GContractNames> | undefined => {
    return useContext(ContractsDispatchContext) as TContractDispatch<GContractNames>;
  };
  const useContractsStateContext = (): TContractReducerState<GContractNames> | undefined => {
    return useContext(ContractsStateContext);
  };

  const useGetContract = <GContract extends GContractTypes>(
    contractName: GContractNames,
    chainId: number
  ): GContract => {
    const contractsState = useContractsStateContext();
    const contract = contractsState?.contractsByName[contractName][chainId];
    if (!contract) {
      throw new Error(`Contract ${contractName} not found on chain ${chainId}`);
    }
    return contract as GContract;
  };

  const initalizeReducer = (
    appContractConnectorList: GAppContractConnectorList
  ): TContractReducerState<GContractNames> => {
    const state = defaultContractReducer<GContractNames>();
    state.contractConnectors = appContractConnectorList as unknown as TTypechainContractConnectorList<GContractNames>;
    return state;
  };

  const connectToAllContracts = async (
    appContractConnectorList: GAppContractConnectorList,
    ethersAdaptor: TEthersAdaptor | undefined
  ): Promise<TContractReducerState<GContractNames>> => {
    const state = initalizeReducer(appContractConnectorList);
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

  const connectToContract = async (
    state: TContractReducerState<GContractNames>,
    contractName: GContractNames,
    ethersAdaptor: TEthersAdaptor
  ): Promise<void> => {
    if (!isValidEthersAdaptor(ethersAdaptor)) return;
    const { chainId, signer } = ethersAdaptorAsRequired(ethersAdaptor);
    const contractConnector = state.contractConnectors[contractName];

    const contract = await connectToContractWithSigner(contractConnector, signer);
    state.contractsByName[contractConnector.contractName] = {};
    state.contractsByName[contractConnector.contractName][chainId] = contract;
    state.contractsByChainId = sortContractsByChainId(state.contractsByName);
  };

  const getContractFromReducer = async (
    state: TContractReducerState<GContractNames>,
    ethersAdaptor: TEthersAdaptor,
    contractName: GContractNames
  ): Promise<BaseContract | undefined> => {
    if (!isValidEthersAdaptor(ethersAdaptor)) return;
    const { chainId } = ethersAdaptorAsRequired(ethersAdaptor);

    if (state.contractsByName[contractName][chainId] != null) {
      return state.contractsByName[contractName][chainId];
    } else if (state.contractConnectors[contractName].config[chainId] != null) {
      await connectToContract(state, contractName, ethersAdaptor);
      return state.contractsByName[contractName][chainId];
    } else {
      warning(false, `There is no instance of Contract ${contractName} for chain ${chainId}`);
    }
    return undefined;
  };

  const cloneReducerState = (state: TContractReducerState<GContractNames>): TContractReducerState<GContractNames> => {
    const newState = defaultContractReducer<GContractNames>();
    newState.contractConnectors = { ...state.contractConnectors };
    newState.contractsByName = { ...state.contractsByName };
    newState.contractsByChainId = { ...state.contractsByChainId };

    return newState;
  };

  const reducer = (
    state: TContractReducerState<GContractNames>,
    _action: 'p' | 'r'
  ): TContractReducerState<GContractNames> => {
    return state;
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
  const ContractsContext: FC<IContractsContextProps> = (props: PropsWithChildren<IContractsContextProps>) => {
    const ethersContext = useEthersContext(props.ethersContextKey);
    const ethersAdaptor: TEthersAdaptor | undefined = checkEthersOverride(ethersContext, {
      ...defaultHookOptions(),
      alternateEthersContextKey: props.ethersContextKey,
    });

    const isMounted = useIsMounted();
    const [state, dispatch] = useReducer(reducer, {} as any, initalizeReducer);
    const [dispatchValue, setDispatchValue] = useState<TContractDispatch<GContractNames>>();

    dispatch('p');

    return (
      <ContractsDispatchContext.Provider value={dispatchValue}>
        <ContractsStateContext.Provider value={state}>{props.children}</ContractsStateContext.Provider>
      </ContractsDispatchContext.Provider>
    );
  };

  return {
    ContractsContext,
    ContractsDispatchContext,
    ContractsStateContext,
    useContractsDispatchContext,
    useGetContract,
  };
};
