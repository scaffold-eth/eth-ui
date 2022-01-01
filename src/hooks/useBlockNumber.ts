import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { TEthersProvider } from '~~/models';

/**
 * #### Summary
 * Get the current block number of the network. ✋🏽 @deprecated
 *
 * #### Notes
 * - ✋🏽 For app wide block number access use {@link useBlockNumberContext} instead.  See {@link BlockNumberContext} for more details, you get this as part of {@link EthersAppContext}
 * - uses the current provided block number
 *
 * @category Hooks
 *
 * @param provider
 * @param pollTime if > 0 uses polling, else it uses onBlock event
 * @returns block number
 */
export const useBlockNumber = (provider: TEthersProvider): [blockNumber: number, update: () => void] => {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const isMounted = useIsMounted();

  const update = useCallback(async (): Promise<void> => {
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

  useEffect(() => {
    if (provider) {
      const listener = (blockNumber: number): void => {
        void setBlockNumber(blockNumber);
      };
      provider?.addListener?.('block', listener);

      if (blockNumber == null) {
        void update();
      }

      return (): void => {
        provider?.removeListener?.('block', listener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, isMounted]);

  return [blockNumber, update];
};
