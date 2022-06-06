import { FC, useContext, useEffect, useReducer } from 'react';
import { useIsMounted } from 'test-usehooks-ts';

import { BlockNumberReactContext } from './BlockNumberReactContext';

import { useEthersAppContext } from '~~/context';
import { ethersOverride } from '~~/functions';
import { defaultOverride, TOverride } from '~~/models';

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
 * ##### ❔Use
 * Make sure to wrap your main app with the {@link EthersAppContext}.
 * - See [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/components/routes/App.tsx#L38)
 *
 *
 * ##### ✏️ Notes
 * - this extensively used by eth-hooks to trigger hooks when a new block arrives
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category EthersAppContext
 *
 * @returns current block number
 */
export const useBlockNumberContext = (): number => {
  const blockNumber = useContext(BlockNumberReactContext);
  // if (blockNumber == null) {
  //  console.log('blockNumber context is null');
  // }
  // invariant(blockNumber != null, 'useBlockNumberContext needs to be used under BlockNumberContext');
  return blockNumber ?? 0;
};

/**
 * #### Summary
 * props include {@link TOverride}
 */
interface IBlockNumberContextProps {
  children?: React.ReactNode;
  override?: TOverride;
}

/**
 * #### Summary
 * A context that works with {@link useBlockNumberContext} to give access to the current provider's block number in any place in your app
 *
 * @category EthersAppContext
 *
 * @param props
 * @returns
 */
export const BlockNumberContext: FC<IBlockNumberContextProps> = (props) => {
  const ethersContext = useEthersAppContext(props.override?.alternateContextKey);
  const { chainId, provider } = ethersOverride(ethersContext, props.override ?? defaultOverride());

  const isMounted = useIsMounted();
  const [state, dispatch] = useReducer(reducer, {});
  undefined;
  const blockNumber: number | undefined = chainId && state?.[chainId] ? state?.[chainId] : 0;

  useEffect(() => {
    if (chainId && provider) {
      const update = (blockNumber: number): void => {
        if (isMounted()) dispatch({ chainId, blockNumber });
      };
      provider?.addListener?.('block', update);

      // if the current value is undefined, do an initial fetch
      if (state?.[chainId] == null) {
        provider
          ?.getBlockNumber()
          .then((val) => {
            if (isMounted()) dispatch({ chainId, blockNumber: val });
          })
          .catch(() => {
            /* ignore */
          });
      }

      return (): void => {
        provider?.removeListener?.('block', update);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, provider, isMounted]);

  return <BlockNumberReactContext.Provider value={blockNumber}>{props.children} </BlockNumberReactContext.Provider>;
};
