import { utils, constants } from 'ethers';
import { useQuery } from 'react-query';

import { providerKey, TRequiredKeys } from '~~/functions';
import { keyNamespace, TEthersProvider } from '~~/models';

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useResolveEnsName' } as const;

/**
 * @internal
 *
 * @param provider
 * @param address
 * @returns
 */
const lookupAddress = async (provider: TEthersProvider, address: string): Promise<string> => {
  if (utils.isAddress(address)) {
    try {
      // Accuracy of reverse resolution is not enforced.
      // We then manually ensure that the reported ens name resolves to address
      const reportedName = await provider.lookupAddress(address);
      const resolvedAddress = await provider.resolveName(reportedName ?? constants.AddressZero);
      if (address && utils.getAddress(address) === utils.getAddress(resolvedAddress ?? '')) {
        return reportedName ?? '';
      } else {
        return utils.getAddress(address);
      }
    } catch (e) {
      return utils.getAddress(address);
    }
  }
  return '';
};

/**
 * #### Summary
 * Gets ENS name for given address
 *
 * @category Hooks
 *
 * @param mainnetProvider mainnet provider
 * @param address
 * @returns
 */
export const useResolveEnsName = (
  mainnetProvider: TEthersProvider | undefined,
  address: string
): [ensName: string | undefined, update: () => void] => {
  const keys = [{ ...queryKey, ...providerKey(mainnetProvider) }, { address }] as const;
  const { data, refetch } = useQuery(keys, async (keys): Promise<string | undefined> => {
    const { address } = keys.queryKey[1];

    const storedData: any = window.localStorage.getItem('ethhooks_ensCache_' + address);
    const cache = JSON.parse(storedData ?? '{}') as Record<string, any>;
    if (cache && cache?.name && cache?.timestamp > Date.now() && typeof cache?.name === 'string') {
      return cache?.name;
    } else if (mainnetProvider) {
      const ensName = await lookupAddress(mainnetProvider, address);
      if (ensName) {
        try {
          window.localStorage.setItem(
            'ensCache_' + address,
            JSON.stringify({
              timestamp: Date.now() + 360000,
              name: ensName,
            })
          );
        } catch {
          /* do nothing */
        }
        return ensName;
      }
    }
  });

  return [data, refetch];
};
