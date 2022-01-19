import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { mergeDefaultUpdateOptions, processQueryOptions, providerKey } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { keyNamespace, TEthersSigner, THookResult, TUpdateOptions } from '~~/models';

const queryKey = { namespace: keyNamespace.signer, key: 'useSignerAddress' } as const;

/**
 * #### Summary
 * Get the address from the signer
 *
 * @category Hooks
 *
 * @param signer
 * @returns
 */
export const useSignerAddress = (
  signer: TEthersSigner | undefined,
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<string | undefined> => {
  const keys = [{ ...queryKey, ...providerKey(signer) }] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<string | undefined> => {
      if (signer) {
        const result = await signer.getAddress();
        return result;
      }
      return undefined;
    },
    {
      ...processQueryOptions<string | undefined>(options),
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data, refetch, status];
};
