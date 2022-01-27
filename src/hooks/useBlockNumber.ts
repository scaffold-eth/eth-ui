import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { mergeDefaultUpdateOptions, processQueryOptions, providerKey, TRequiredKeys } from '~~/functions';
import { keyNamespace, TEthersProvider, THookResult, TUpdateOptions } from '~~/models';

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useBlockNumber' };

/**
 * #### Summary
 * Get the current block number of the network. ✋🏽 @deprecated
 *
 * ##### ✏️ Notes
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
  callback?: ((blockNumber?: number) => void) | ((blockNumber?: number) => Promise<void>),
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<number> => {
  type TAsyncResult = number | undefined;
  const keys = [
    {
      ...queryKey,
      ...providerKey(provider),
    },
  ] as const;

  const { data, refetch, status } = useQuery(
    keys,
    async (_keys): Promise<TAsyncResult> => {
      if (provider) {
        const nextBlockNumber = await provider?.getBlockNumber();
        return nextBlockNumber;
      }

      return undefined;
    },
    {
      ...processQueryOptions<TAsyncResult>(options),
    }
  );

  useEffect(() => {
    if (provider) {
      const listener = (blockNumberLocal: number): void => {
        void refetch();

        if (callback != null) {
          try {
            void callback(blockNumberLocal);
          } catch (e) {
            console.warn('useBlockNumber callback failed', e);
          }
        }
      };
      provider?.addListener?.('block', listener);

      if (data == null) {
        void refetch();
      }

      return (): void => {
        provider?.removeListener?.('block', listener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, provider, refetch]);

  return [data ?? 0, refetch, status];
};
