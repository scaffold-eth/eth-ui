import { useEffect } from 'react';
import { invariant } from 'ts-invariant';

import { useEthersAppContext } from '~~/context';
import { useEthersAppStore } from '~~/context/EthersAppStore';
import { useBlockNumber } from '~~/hooks';
import { TOverride } from '~~/models';

/**
 * #### Summary
 * A hook that gets you the current blocknumber and saves it to the store
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
export const useBlockNumberContext = (chainId?: number, override?: TOverride): number => {
  const ethersContext = useEthersAppContext(override?.alternateContextKey);
  const blockNumberState = useEthersAppStore((state) => state.blockNumberState);
  const setBlockNumber = useEthersAppStore((state) => state.setBlockNumber);
  let result: number | undefined = undefined;

  [result] = useBlockNumber(ethersContext.provider);

  useEffect(() => {
    if (ethersContext.chainId && result != null && result !== blockNumberState[ethersContext.chainId]) {
      setBlockNumber(result, ethersContext.chainId);
    }
  }, [blockNumberState, ethersContext.chainId, result, setBlockNumber]);

  if (chainId && chainId !== ethersContext.chainId) {
    if (blockNumberState[chainId] == null)
      invariant.log(
        'blockNumberState[chainId] in the store is null, make sure to have a provider for this chain',
        chainId
      );
    result = blockNumberState[chainId] ?? 0;
  }

  return result;
};
