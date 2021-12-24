import { BaseContract } from 'ethers';
import React, { createContext, FC, PropsWithChildren, useContext, useReducer, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { checkEthersOverride } from '~~/functions';
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

export type TContractReducer<GContractNames extends string> = {
  contractConnectors: TTypechainContractConnectorList<GContractNames>;
  contractsByName: TContractsByName<GContractNames>;
  contractsByChainId: TContractsByChainId<GContractNames>;
};
const defaultContractReducer = <GContractNames extends string>(): TContractReducer<GContractNames> => {
  return {
    contractConnectors: {} as TTypechainContractConnectorList<GContractNames>,
    contractsByName: {} as TContractsByName<GContractNames>,
    contractsByChainId: {} as TContractsByChainId<GContractNames>,
  };
};

export const contractAppContextFactory = <
  GContractNames extends string,
  GTypedContracts,
  GContract extends TContractTypes<GContractNames, GTypedContracts>
>(): {
  ContractsContext: FC<PropsWithChildren<IContractsContextProps>>;
  ContractsDispatchContext: React.Context<TContractDispatch<GContractNames> | undefined>;
  ContractsStateContext: React.Context<TContractReducer<GContractNames> | undefined>;
  useContractsDispatchContext: () => TContractDispatch<GContractNames> | undefined;
  useGetContract: (contractName: GContractNames, chainId: number) => GContract;
} => {
  const ContractsDispatchContext = createContext<TContractDispatch<GContractNames> | undefined>(
    undefined as TContractDispatch<GContractNames> | undefined
  );
  const ContractsStateContext = createContext<TContractReducer<GContractNames> | undefined>(undefined);

  const useContractsDispatchContext = (): TContractDispatch<GContractNames> | undefined => {
    return useContext(ContractsDispatchContext) as TContractDispatch<GContractNames>;
  };
  const useContractsStateContext = (): TContractReducer<GContractNames> | undefined => {
    return useContext(ContractsStateContext);
  };

  const useGetContract = (contractName: GContractNames, chainId: number): GContract => {
    const contractsState = useContractsStateContext();
    const contract = contractsState?.contractsByName[contractName][chainId];
    if (!contract) {
      throw new Error(`Contract ${contractName} not found on chain ${chainId}`);
    }
    return contract as GContract;
  };

  const reducer = (state: TContractReducer<GContractNames>, _action: 'p' | 'r'): TContractReducer<GContractNames> => {
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
    const [state, dispatch] = useReducer(reducer, defaultContractReducer<GContractNames>());
    const [dispatchValue, setDispatchValue] = useState<TContractDispatch<GContractNames>>();

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
