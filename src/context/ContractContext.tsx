import { BaseContract, ethers } from 'ethers';
import { createContext, FC, useCallback, useContext, useEffect, useReducer } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { createContractInstance, TAppContractConnectors, TAppContractInstances, TContractConnector } from '~~/models';
import { IEthersContext } from '~~/models/contextTypes';

type TContext = {
  setAppContractConnectors: (appContractConnectors: TAppContractConnectors) => void;
  updateContractConnector: (
    contractName: string,
    connector: TContractConnector<BaseContract, ethers.utils.Interface>
  ) => void;
};

const Context = createContext<TContext | undefined>(undefined);

/** *
 * @internal
 */
interface State {
  appContractConnectors: TAppContractConnectors;
  appContractInstances: TAppContractInstances;
}

const initalState = (): State => {
  return {
    appContractConnectors: {},
    appContractInstances: {},
  };
};

/**
 *
 * @internal
 *
 */
type TSetAppContractConnectorsPayload = {
  type: 'setAppConnectors';
  value: TAppContractConnectors;
};

/**
 *
 * @internal
 *
 */
type TUpdateContractConnectorPayload = {
  type: 'updateConnector';
  value: { contractName: string; connector: TContractConnector<BaseContract, ethers.utils.Interface> };
};

/**
 *
 * @internal
 *
 */
type TLoadContractsPayload = {
  type: 'loadContracts';
  value: TAppContractInstances;
};

/**
 *
 * @internal
 *
 */
type TPayload = TUpdateContractConnectorPayload | TSetAppContractConnectorsPayload | TLoadContractsPayload;

/**
 *
 * @internal
 *
 * @param state
 * @param payload
 * @returns
 */
const reducer = (state: State, payload: TPayload): State => {
  const newState: State = {
    appContractConnectors: state.appContractConnectors,
    appContractInstances: state.appContractInstances,
  };
  switch (payload.type) {
    case 'loadContracts':
      newState.appContractInstances = payload.value;
      break;
    case 'setAppConnectors':
      newState.appContractConnectors = payload.value;
      newState.appContractInstances = {};
      break;
    case 'updateConnector':
      newState.appContractConnectors = state.appContractConnectors;
      newState.appContractInstances = state.appContractInstances;
      newState.appContractConnectors[payload.value.contractName] = payload.value.connector;
      break;
  }

  return newState;
};

/**
 * #### Summary
 * ... TBD
 * A hook that gets you ...
 *
 * #### Use
 *
 *
 * #### Notesarrives
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category EthersContext
 *
 * @returns current block number
 */
export const useContractContext = (): TContext | undefined => {
  return useContext(Context);
};

interface IProps {
  contractConnectors?: TAppContractConnectors;
}

const loadContracts = async (
  ethersContext: IEthersContext,
  contractConnectors: TAppContractConnectors
): Promise<TAppContractInstances> => {
  const chainId = ethersContext?.chainId;
  const account = ethersContext?.account;
  const signer = ethersContext?.signer;
  if (chainId == null || signer == null || account == null || chainId == null) {
    return {};
  }
  const result: TAppContractInstances = {};

  for (const contractName in contractConnectors) {
    const connector = contractConnectors[contractName];
    result[contractName][chainId] = await createContractInstance(connector, signer);
  }
  return result;
};

/**
 * #### Summary
 * A context that works with {@link useBlockNumberContext} to give access to the current provider's block number in any place in your app
 *
 * @category EthersContext
 *
 * @param props
 * @returns
 */
export const ContractsContext: FC<IProps> = (props) => {
  const ethersContext = useEthersContext();

  const isMounted = useIsMounted();
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initalState());

  const setAppContractConnectors = useCallback(
    (appContractConnectors: TAppContractConnectors) => {
      dispatch({ type: 'setAppConnectors', value: appContractConnectors });
    },
    [dispatch]
  );

  const updateContractConnector = useCallback(
    (contractName: string, connector: TContractConnector<BaseContract, ethers.utils.Interface>) => {
      dispatch({ type: 'updateConnector', value: { contractName, connector } });
    },
    [dispatch]
  );

  useEffect(() => {
    if (ethersContext.chainId && ethersContext.ethersProvider && ethersContext.signer) {
      void loadContracts(ethersContext, state.appContractConnectors).then((contractInstances) => {
        if (isMounted()) dispatch({ type: 'loadContracts', value: contractInstances });
      });
    }
  }, [
    ethersContext,
    ethersContext.chainId,
    ethersContext.ethersProvider,
    ethersContext.signer,
    isMounted,
    state.appContractConnectors,
  ]);

  return (
    <Context.Provider value={{ updateContractConnector, setAppContractConnectors }}>{props.children} </Context.Provider>
  );
};
