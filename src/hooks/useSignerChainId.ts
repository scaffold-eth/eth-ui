import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { mergeDefaultUpdateOptions, processQueryOptions, providerKey, TRequiredKeys } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { const_blockNumberIntervalMedium, TEthersSigner, THookResult, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useSignerChainId' } as const;

/**
 * #### Summary
 * Get the address from the signer
 *
 * @category Hooks
 *
 * @param signer
 * @returns
 */
export const useSignerChainId = (
  signer: TEthersSigner | undefined,
  options: TUpdateOptions = mergeDefaultUpdateOptions({ ...const_blockNumberIntervalMedium })
): THookResult<number | undefined> => {
  type TAsyncResult = number | undefined;
  const keys = [{ ...queryKey, ...providerKey(signer) }] as const;

  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<TAsyncResult> => {
      // const { signer } = keys.queryKey[1];
      const chainId = await signer?.getChainId();
      return chainId;
    },
    {
      ...processQueryOptions<TAsyncResult>(options),
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data, refetch, status];
};
