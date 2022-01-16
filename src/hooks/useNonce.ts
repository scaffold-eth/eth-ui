import { useQuery } from 'react-query';

import { useBlockNumberContext, useEthersContext } from '~~/context';
import {
  ethersOverride,
  mergeDefaultOverride,
  mergeDefaultUpdateOptions,
  processQueryOptions,
  providerKey,
  TRequiredKeys,
} from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { THookResult, TOverride, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey: TRequiredKeys = {
  namespace: keyNamespace.signer,
  key: 'useNonce',
} as const;

/**
 * #### Summary
 * Get the current nonce for the address provided
 *
 * #### Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param address
 * @returns
 */
export const useNonce = (
  address: string | undefined,
  override: TOverride = mergeDefaultOverride(),
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<number> => {
  const ethersContext = useEthersContext(override.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, override);

  const keys = [{ ...queryKey, ...providerKey(provider) }, { address }] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<number | undefined> => {
      const { address } = keys.queryKey[1];
      if (address) {
        const nextNonce = await provider?.getTransactionCount(address);
        return nextNonce ?? 0;
      }
      return undefined;
    },
    {
      ...processQueryOptions<number | undefined>(options),
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? 0, refetch, status];
};
