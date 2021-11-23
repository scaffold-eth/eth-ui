import { BaseContract, ethers } from 'ethers';
import { createContext, FC, useCallback, useContext, useEffect, useReducer } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { checkEthersOverride, validEthersAdaptor } from '~~/functions';
import {
  createContractInstance,
  TAppContractConnectors,
  TContractConnector,
  defaultHookOptions,
  TEthersAdaptor,
} from '~~/models';
import { AppContractList } from '~~/models/AppContractList';
/** *
 * @internal
 */
interface State {
  appContractConnectors: TAppContractConnectors;
  appContractList: AppContractList;
}

const initalState = (): State => {
  return {
    appContractConnectors: {},
    appContractList: new AppContractList(),
  };
};

/**
 * @internal
 */
type TSetAppContractConnectorsPayload = {
  action: 'setAppConnectors';
  payload: { connectors: TAppContractConnectors; contractList: AppContractList };
};

/**
 * @internal
 */
type TUpdateContractConnectorPayload = {
  action: 'updateConnector';
  payload: {
    contractName: string;
    connector: TContractConnector<BaseContract, ethers.utils.Interface>;
    contract: BaseContract | undefined;
  };
};

/**
 * @internal
 */
type TLoadContractsPayload = {
  action: 'loadContracts';
  payload: AppContractList;
};

/**
 *
 * @internal
 *
 */
type TPayloadAction = TUpdateContractConnectorPayload | TSetAppContractConnectorsPayload | TLoadContractsPayload;

/**
 *
 * @internal
 *
 * @param state
 * @param action
 * @returns
 */
const reducer = (state: State, action: TPayloadAction): State => {
  const newState: State = {
    appContractConnectors: state.appContractConnectors,
    appContractList: state.appContractList,
  };
  switch (action.action) {
    case 'loadContracts':
      newState.appContractList = action.payload;
      break;
    case 'setAppConnectors':
      newState.appContractConnectors = action.payload.connectors;
      newState.appContractList = action.payload.contractList;
      break;
    case 'updateConnector':
      newState.appContractConnectors = state.appContractConnectors;
      newState.appContractList = state.appContractList;
      newState.appContractConnectors[action.payload.contractName] = action.payload.connector;
  }

  return newState;
};

type IContractsContext = {
  setAppContractConnectors: (appContractConnectors: TAppContractConnectors) => void;
  updateConnectorForContract: (
    contractName: string,
    connector: TContractConnector<BaseContract, ethers.utils.Interface>
  ) => void;
  appContractInstances: AppContractList;
};

const Context = createContext<IContractsContext | undefined>(undefined);

/**
 * #### Summary
 * ... TBD
 * A hook that gets you ...
 *
 * #### Use
 *
 *
 * #### Notes
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category EthersContext
 *
 * @returns current block number
 */
export const useContractContext = (): IContractsContext | undefined => {
  return useContext(Context);
};

interface IProps {
  ethersContextKey?: string | undefined;
  contractConnectors?: TAppContractConnectors;
}

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
  const ethersContext = useEthersContext(props.ethersContextKey);
  const ethersAdaptor: TEthersAdaptor | undefined = checkEthersOverride(ethersContext, {
    ...defaultHookOptions(),
    alternateEthersContextKey: props.ethersContextKey,
  });

  const isMounted = useIsMounted();
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initalState());

  const setAppContractConnectors = useCallback(
    async (appContractConnectors: TAppContractConnectors) => {
      const contractList = await AppContractList.connectContracts(ethersAdaptor, appContractConnectors);
      if (isMounted()) {
        dispatch({
          action: 'setAppConnectors',
          payload: { connectors: appContractConnectors, contractList: contractList },
        });
      }
    },
    [ethersAdaptor, isMounted]
  );

  const updateConnectorForContract = useCallback(
    async (contractName: string, connector: TContractConnector<BaseContract, ethers.utils.Interface>) => {
      let contract: BaseContract | undefined = undefined;
      if (ethersContext.signer) {
        contract = await createContractInstance(connector, ethersContext.signer);
      }
      dispatch({ action: 'updateConnector', payload: { contractName, connector, contract } });
    },
    [ethersContext.signer]
  );

  useEffect(() => {
    if (validEthersAdaptor(ethersAdaptor)) {
      void AppContractList.connectContracts(ethersAdaptor, state.appContractConnectors).then((appContracts) => {
        if (isMounted()) dispatch({ action: 'loadContracts', payload: appContracts });
      });
    }
  }, [ethersAdaptor, isMounted, state.appContractConnectors]);

  return (
    <Context.Provider
      value={{
        updateConnectorForContract,
        setAppContractConnectors,
        appContractInstances: state.appContractList,
      }}>
      {props.children}{' '}
    </Context.Provider>
  );
};
