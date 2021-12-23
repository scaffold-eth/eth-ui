import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { checkEthersOverride } from '~~/functions';
import { defaultHookOptions, TEthersAdaptor, TTypechainContractConnectorList } from '~~/models';

// import { AppContractDefinitions } from '~~/models/AppContractDefinitions';

export interface IContractsContextProps {
  ethersContextKey?: string | undefined;
}

export interface IAppContractsDefinitions<GContractNames extends string> {
  getmonkeys: GContractNames;
}

export type TContractDispatch<GContractNames extends string> = {
  setAppContractConnectors: (appContractConnectors: TTypechainContractConnectorList<GContractNames>) => void;
};

export type TContractState<GContractNames extends string> = {
  appContractDefinitions: IAppContractsDefinitions<GContractNames>;
};

export const contractAppContextFactory = <GContractNames extends string, GTypedContracts>(): {
  ContractsContext: FC<PropsWithChildren<IContractsContextProps>>;
  ContractsDispatchContext: React.Context<TContractDispatch<GContractNames> | undefined>;
  ContractsStateContext: React.Context<TContractState<GContractNames> | undefined>;
  useContractsDispatchContext: () => TContractDispatch<GContractNames> | undefined;
  useContractsStateContext: () => TContractState<GContractNames> | undefined;
} => {
  const ContractsDispatchContext = createContext<TContractDispatch<GContractNames> | undefined>(
    undefined as TContractDispatch<GContractNames> | undefined
  );
  const ContractsStateContext = createContext<TContractState<GContractNames> | undefined>(undefined);

  const useContractsDispatchContext = (): TContractDispatch<GContractNames> | undefined => {
    return useContext(ContractsDispatchContext) as TContractDispatch<GContractNames>;
  };
  const useContractsStateContext = (): TContractState<GContractNames> | undefined => {
    return useContext(ContractsStateContext);
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
    const [state, setState] = useState<TContractState<GContractNames>>();
    const [dispatchValue, setDispatchValue] = useState<TContractDispatch<GContractNames>>();

    const setAppContractConnectors = useCallback(
      async (appContractConnectors: TTypechainContractConnectorList<GContractNames>) => {
        const contractDefinitions: IAppContractsDefinitions<GContractNames> = { getmonkeys: 'DAI' as GContractNames };
        // await AppContractsDefinitions.connectToAllContractsReducer<GContractNames, GTypedContracts>(
        //   ethersAdaptor,
        //   appContractConnectors
        // );
        if (isMounted()) {
          setState({ appContractDefinitions: contractDefinitions });
        }
      },
      [ethersAdaptor, isMounted]
    );

    useEffect(() => {
      setDispatchValue({ setAppContractConnectors });
    }, [setAppContractConnectors]);

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
    useContractsStateContext,
  };
};
