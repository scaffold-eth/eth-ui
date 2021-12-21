import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { checkEthersOverride } from '~~/functions';
import { defaultHookOptions, TEthersAdaptor } from '~~/models';
import { AppContractDefinitions } from '~~/models/AppContractDefinitions';
import { TTypechainContractConnectorList } from '~~/models/typechainContractTypes';

export interface IContractsContextProps {
  ethersContextKey?: string | undefined;
}

export type IContractDispatch<GContractNames extends string> = {
  setAppContractConnectors: (appContractConnectors: TTypechainContractConnectorList<GContractNames>) => void;
};

export type TContractContext<GContractNames extends string> = {
  ContractsContext: FC<PropsWithChildren<IContractsContextProps>>;
  ContractsDispatchContext: React.Context<IContractDispatch<GContractNames> | undefined>;
  ContractsStateContext: React.Context<AppContractDefinitions<GContractNames> | undefined>;
  useContractsDispatchContext: () => IContractDispatch<GContractNames> | undefined;
  useContractsStateContext: () => AppContractDefinitions<GContractNames> | undefined;
};

export const contractContextFactory = <GContractNames extends string>(): TContractContext<GContractNames> => {
  const ContractsDispatchContext = createContext<IContractDispatch<GContractNames> | undefined>(
    undefined as IContractDispatch<GContractNames> | undefined
  );
  const ContractsStateContext = createContext<AppContractDefinitions<GContractNames> | undefined>(undefined);
  const useContractsDispatchContext = (): IContractDispatch<GContractNames> | undefined => {
    return useContext(ContractsDispatchContext) as IContractDispatch<GContractNames>;
  };
  const useContractsStateContext = (): AppContractDefinitions<GContractNames> | undefined => {
    return useContext(ContractsStateContext) as AppContractDefinitions<GContractNames>;
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
  const ContractsContext: FC<IContractsContextProps> = <GContractNames extends string>(
    props: PropsWithChildren<IContractsContextProps>
  ) => {
    const ethersContext = useEthersContext(props.ethersContextKey);
    const ethersAdaptor: TEthersAdaptor | undefined = checkEthersOverride(ethersContext, {
      ...defaultHookOptions(),
      alternateEthersContextKey: props.ethersContextKey,
    });

    const isMounted = useIsMounted();
    const [state, setState] = useState<AppContractDefinitions<GContractNames>>();
    const [dispatchValue, setDispatchValue] = useState<IContractDispatch<GContractNames>>();

    const setAppContractConnectors = useCallback(
      async (appContractConnectors: TTypechainContractConnectorList<GContractNames>) => {
        const contractDefinitions = await AppContractDefinitions.connectToAllContractsReducer(
          ethersAdaptor,
          appContractConnectors
        );
        if (isMounted()) {
          setState(contractDefinitions);
        }
      },
      [ethersAdaptor, isMounted]
    );

    useEffect(() => {
      setDispatchValue({ setAppContractConnectors });
    }, [setAppContractConnectors]);

    return (
      <ContractsDispatchContext.Provider value={dispatchValue as any}>
        <ContractsStateContext.Provider value={state as AppContractDefinitions<string>}>
          {props.children}
        </ContractsStateContext.Provider>
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
