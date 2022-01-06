import { useQuery } from 'react-query';

import { useBlockNumberContext, useEthersContext } from '~~/context';
import {
  ethersOverride,
  mergeDefaultOverride,
  mergeDefaultUpdateOptions,
  providerKey,
  TRequiredKeys,
} from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { TOverride, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useTimestamp' } as const;

/**
 * #### Summary
 * Get the current timestamp from the latest block
 *
 * #### Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param pollTime
 * @returns
 */
export const useTimestamp = (
  override: TOverride = mergeDefaultOverride(),
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): [timestamp: number, update: () => void] => {
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext(override.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, override);

  const keys = [
    { ...queryKey, ...providerKey(provider) },
    { provider, blockNumber },
  ] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys): Promise<number> => {
      const { provider } = keys.queryKey[1];
      const block = await provider?.getBlock(blockNumber);
      if (block?.timestamp != null) {
        return block.timestamp;
      }
      return 0;
    },
    {
      ...options.query,
    }
  );

  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? 0, refetch];
};
