import { useQuery } from 'react-query';

import { useBlockNumberContext, useEthersContext } from '~~/context';
import { ethersOverride, providerKey } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { mergeDefaultHookOptions, THookOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey = { namespace: keyNamespace.signer, key: 'useGetEthersAdaptorFromProviderOrSigners' } as const;

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
  address: string,
  options: THookOptions = mergeDefaultHookOptions()
): [nonce: number, update: () => void] => {
  const ethersContext = useEthersContext(options.contextOverride.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, options);

  const keys = [{ ...queryKey, ...providerKey(provider) }, { address }] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys) => {
      const { address } = keys.queryKey[1];
      const nextNonce = await provider?.getTransactionCount(address);
      return nextNonce ?? 0;
    },
    {
      ...options.update.query,
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? 0, refetch];
};
