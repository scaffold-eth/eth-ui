import { Network } from '@ethersproject/networks';
import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { mergeDefaultUpdateOptions, processQueryOptions, providerKey, TRequiredKeys } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { const_blockNumberIntervalMedium, TEthersProvider, THookResult, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey: TRequiredKeys = { namespace: keyNamespace.provider, key: 'useNetwork' } as const;

/**
 * #### Summary
 * Get the network from the provider
 *
 * @category Hooks
 *
 * @param provider
 * @returns
 */
export const useNetwork = (
  provider: TEthersProvider | undefined,
  options: TUpdateOptions = mergeDefaultUpdateOptions({ ...const_blockNumberIntervalMedium })
): THookResult<Network | undefined> => {
  type TAsyncResult = Network | undefined;
  const keys = [{ ...queryKey, ...providerKey(provider) }] as const;

  const { data, refetch, status } = useQuery(
    keys,
    async (_keys): Promise<TAsyncResult> => {
      // const { signer } = keys.queryKey[1];
      const network = await provider?.getNetwork();
      return network;
    },
    {
      ...processQueryOptions<TAsyncResult>(options),
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data, refetch, status];
};
