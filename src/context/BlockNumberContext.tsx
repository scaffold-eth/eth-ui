import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { useDebounce } from 'use-debounce';

import { useEthersContext } from '~~/context';
import { TEthersProvider } from '~~/models';

const Context = createContext<number | undefined>(undefined);

interface State {
  [chainId: number]: number | undefined;
}

interface Payload {
  chainId: number;
  blockNumber: number;
}

export const reducer = (state: State = {}, payload: Payload): State => {
  const current = state[payload.chainId];
  if (!current || payload.blockNumber > current) {
    return {
      ...state,
      [payload.chainId]: payload.blockNumber,
    };
  }
  return state;
};

export const useBlockNumberContext = (): number | undefined => {
  return useContext(Context);
};

interface IProps {
  providerKey?: string;
  ethersProvider?: TEthersProvider;
  chainId?: number;
}

export const BlockNumberContext: FC<IProps> = (props) => {
  const context = useEthersContext(props.providerKey);
  const chainId = props.chainId ?? context.chainId;
  const ethersProvider = props.ethersProvider ?? context.ethersProvider;

  const [state, dispatch] = useReducer(reducer, {});
  const [blockNumber] = useDebounce(chainId ? state[chainId] : undefined, 250, { trailing: true });

  useEffect(() => {
    if (chainId && ethersProvider) {
      const update = (blockNumber: number): void => {
        dispatch({ chainId, blockNumber });
      };
      ethersProvider.on('block', update);
      return (): void => {
        ethersProvider.on('block', update);
      };
    }
  }, [chainId, ethersProvider]);

  return <Context.Provider value={blockNumber}>{props.children} </Context.Provider>;
};
