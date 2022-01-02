import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { checkEthersOverride } from '~~/functions';
import { defaultHookOptions, THookOptions } from '~~/models';

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
export const useBlockNumberContext = (): number => {
  const blockNumber = useContext(Context);
  // if (blockNumber == null) {
  //   console.log('blockNumber context is null');
  // }
  // invariant(blockNumber != null, 'useBlockNumberContext needs to be used under BlockNumberContext');
  return blockNumber ?? 0;
};

interface IProps {
  options?: THookOptions;
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
export const BlockNumberContext: FC<IProps> = (props = { options: defaultHookOptions() }) => {
  const options = props.options ?? defaultHookOptions();
  const ethersContext = useEthersContext(options.alternateContextOverride);
  const { chainId, provider } = checkEthersOverride(ethersContext, options);

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

  return <Context.Provider value={blockNumber}>{props.children} </Context.Provider>;
};
