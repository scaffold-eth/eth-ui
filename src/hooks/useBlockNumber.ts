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
 * @returns block number
 */
export const useBlockNumber = (
  provider: TEthersProvider | undefined,
  callback?: ((blockNumber?: number) => void) | ((blockNumber?: number) => Promise<void>)
): [blockNumber: number, update: () => void] => {
  const isMounted = useIsMounted();

  const [blockNumber, setBlockNumber] = useState<number>(0);

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
      const listener = (blockNumberLocal: number): void => {
        if (isMounted()) {
          void setBlockNumber(blockNumberLocal);
        }

        if (callback != null) {
          try {
            void callback(blockNumberLocal);
          } catch (e) {
            console.warn('useBlockNumber callback failed', e);
          }
        }
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
  }, [provider, isMounted, update]);

  return [blockNumber, update];
};
