import { useCallback, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useOnRepetition } from '~~/hooks';
import { TEthersProvider } from '~~/models';

/**
 * #### Summary
 * Get the current block number of the network. ✋🏽 @deprecated
 *
 * #### Notes
 * - ✋🏽 For app wide block number access use {@link BlockNumberContext} instead
 * - ⚠ Deprecated
 * - uses the current ethersProvider from context
 *
 * @category Hooks
 *
 * @param provider
 * @param pollTime if > 0 uses polling, else it uses onBlock event
 * @returns block number
 */
export const useBlockNumber = (provider: TEthersProvider, pollTime: number = 0): number => {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const isMounted = useIsMounted();

  const getBlockNumber = useCallback(async (): Promise<void> => {
    const nextBlockNumber = await provider?.getBlockNumber();
    if (isMounted() && provider != null) {
      setBlockNumber((value) => {
        if (value !== nextBlockNumber) {
          return nextBlockNumber ?? 0;
        }
        return value;
      });
    }
  }, [provider, isMounted]);

  useOnRepetition(getBlockNumber, { provider: provider, pollTime });

  return blockNumber;
};
