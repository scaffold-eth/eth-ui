import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { useDebounce } from 'use-debounce';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { TEthersProvider } from '~~/models';

const Context = createContext<number | undefined>(undefined);

/** *
 * @internal
 */
interface State {
  [chainId: number]: number | undefined;
}

/**
 *
 * @internal
 *
 */
interface Payload {
  chainId: number;
  blockNumber: number;
}

/**
 *
 * @internal
 *
 * @param state
 * @param payload
 * @returns
 */
const reducer = (state: State = {}, payload: Payload): State => {
  const current = state[payload.chainId];
  if (!current || payload.blockNumber > current) {
    return {
      ...state,
      [payload.chainId]: payload.blockNumber,
    };
  }
  return state;
};

/**
 * #### Summary
 * A hook that gets you the current blocknumber via react context
 * - can be shared by your whole app.
 *
 * #### Use
 * Make sure to wrap your main app with the {@link EthersAppContext}.
 * - See [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/0225179a2a8bb7b3a255d6eff4802b47d72809dd/packages/vite-app-ts/src/components/routes/App.tsx#L38)
 *
 *
 * #### Notes
 * - this extensively used by eth-hooks to trigger hooks when a new block arrives
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category EthersContext
 *
 * @returns current block number
 */
export const useBlockNumberContext = (): number | undefined => {
  return useContext(Context);
};

interface IProps {
  providerKey?: string;
  ethersProvider?: TEthersProvider;
  chainId?: number;
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
export const BlockNumberContext: FC<IProps> = (props) => {
  const ethersContext = useEthersContext(props.providerKey);
  const chainId = props.chainId ?? ethersContext.chainId;
  const ethersProvider = props.ethersProvider ?? ethersContext.ethersProvider;

  const isMounted = useIsMounted();
  const [state, dispatch] = useReducer(reducer, {});
  const [blockNumber] = useDebounce(chainId ? state[chainId] : undefined, 100, { trailing: true });

  useEffect(() => {
    if (chainId && ethersProvider) {
      const update = (blockNumber: number): void => {
        // console.log('BlockNumberContext: updated block ', blockNumber, ' for chainId ', chainId);
        if (isMounted()) dispatch({ chainId, blockNumber });
      };
      ethersProvider.addListener?.('block', update);

      // if the current value is undefined, do an initial fetch
      if (state?.[chainId] == null) {
        ethersProvider?.getBlockNumber().then((val) => {
          if (isMounted()) dispatch({ chainId, blockNumber: val });
        });
      }

      return (): void => {
        ethersProvider.removeListener?.('block', update);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, ethersProvider, isMounted]);

  return <Context.Provider value={blockNumber}>{props.children} </Context.Provider>;
};
