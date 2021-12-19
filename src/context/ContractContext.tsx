import { BaseContract, ethers } from 'ethers';
import { createContext, FC, useCallback, useContext, useEffect, useReducer } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { checkEthersOverride, isValidEthersAdaptor } from '~~/functions';
import { connectToContractWithSigner } from '~~/functions/createTypechainContractConnector';
import { defaultHookOptions, TEthersAdaptor } from '~~/models';
import { AppContractList } from '~~/models/AppContractList';
import { TAppContractConnectorList, TTypechainContractConnector } from '~~/models/typechainContractTypes';
/** *
 * @internal
 */
interface IState {
  appContractConnectors: TAppContractConnectorList;
  appContractList: AppContractList;
}

const initalState = (): IState => {
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
  payload: { connectors: TAppContractConnectorList; contractList: AppContractList };
};

/**
 * @internal
 */
type TUpdateContractConnectorPayload = {
  action: 'updateConnector';
  payload: {
    contractName: string;
    connector: TTypechainContractConnector<BaseContract, ethers.utils.Interface>;
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
const reducer = (state: IState, action: TPayloadAction): IState => {
  const newState: IState = {
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

type IDispatch = {
  setAppContractConnectorList: (appContractConnectorList: TAppContractConnectorList) => void;
  setConnectorForContract: (
    contractName: string,
    connector: TTypechainContractConnector<BaseContract, ethers.utils.Interface>
  ) => void;
};

const DispatchContext = createContext<IDispatch | undefined>(undefined);
const StateContext = createContext<IState | undefined>(undefined);

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
export const useContractContext = (): IDispatch | undefined => {
  return useContext(DispatchContext);
};

interface IProps {
  ethersContextKey?: string | undefined;
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
    async (appContractConnectors: TAppContractConnectorList) => {
      const contractList = await AppContractList.connectToAppContracts(ethersAdaptor, appContractConnectors);
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
    async (contractName: string, connector: TTypechainContractConnector<BaseContract, ethers.utils.Interface>) => {
      let contract: BaseContract | undefined = undefined;
      if (ethersContext.signer) {
        contract = await connectToContractWithSigner(connector, ethersContext.signer);
      }
      dispatch({ action: 'updateConnector', payload: { contractName, connector, contract } });
    },
    [ethersContext.signer]
  );

  useEffect(() => {
    if (isValidEthersAdaptor(ethersAdaptor)) {
      void AppContractList.connectToAppContracts(ethersAdaptor, state.appContractConnectors).then((appContracts) => {
        if (isMounted()) dispatch({ action: 'loadContracts', payload: appContracts });
      });
    }
  }, [ethersAdaptor, isMounted, state.appContractConnectors]);

  return (
    <DispatchContext.Provider
      value={{
        setConnectorForContract: updateConnectorForContract,
        setAppContractConnectorList: setAppContractConnectors,
      }}>
      <StateContext.Provider value={initalState()}>{props.children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
