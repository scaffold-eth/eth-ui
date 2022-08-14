import { constants } from 'ethers';
import { useQuery } from 'react-query';

import { providerKey, TRequiredKeys } from '~~/functions';
import { keyNamespace, TEthersProvider, THookResult } from '~~/models';

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useResolveEnsAddress' } as const;

/**
 * #### Summary
 * Gets the address from an ENS name
 *
 * @category Hooks
 *
 * @param mainnetProvider mainnet provider
 * @param ensName
 * @returns
 */
export const useResolveEnsAddress = (
  mainnetProvider: TEthersProvider | undefined,
  ensName: string | undefined
): THookResult<string | undefined> => {
  const keys = [{ ...queryKey, ...providerKey(mainnetProvider) }, { ensName }] as const;
  const { data, refetch, status } = useQuery(keys, async (keys): Promise<string | undefined> => {
    const { ensName } = keys.queryKey[1];
    if (mainnetProvider && ensName) {
      const resolved = await mainnetProvider.resolveName(ensName);
      return resolved ?? constants.AddressZero;
    }
    return constants.AddressZero;
  });

  return [data, refetch, status];
};
