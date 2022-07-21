import { useQuery } from 'react-query';

import { useBlockNumberContext, useEthersAppContext } from '~~/context';
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

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useTimestamp' } as const;

/**
 * #### Summary
 * Get the current timestamp from the latest block
 *
 * ##### ✏️ Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param pollTime
 * @returns
 */
export const useTimestamp = (
  options: TUpdateOptions = mergeDefaultUpdateOptions(),
  override: TOverride = mergeDefaultOverride()
): THookResult<number> => {
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersAppContext(override.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, override);

  const keys = [{ ...queryKey, ...providerKey(provider) }] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (_keys): Promise<number> => {
      const blockNumber = await provider?.getBlockNumber();
      if (blockNumber != null) {
        const block = await provider?.getBlock(blockNumber);
        if (block?.timestamp != null) {
          return block.timestamp;
        }
      }
      return 0;
    },
    {
      ...processQueryOptions<number>(options),
    }
  );

  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? 0, refetch, status];
};
