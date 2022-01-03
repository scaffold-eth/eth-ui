import { useQuery } from 'react-query';

import { useBlockNumberContext, useEthersContext } from '~~/context';
import { ethersOverride, providerKey } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { THookOptions, defaultHookOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey = { namespace: keyNamespace.signer, key: 'useTimestamp' } as const;

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
export const useTimestamp = (options: THookOptions = defaultHookOptions()): [timestamp: number, update: () => void] => {
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext(options.contextOverride.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, options);

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
      ...options.update.query,
    }
  );

  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? 0, refetch];
};
