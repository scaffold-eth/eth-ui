import { useQuery } from 'react-query';

import { isAdaptorEqual, mergeDefaultUpdateOptions, parseProviderOrSigner, providerKey } from '~~/functions';
import { TEthersProviderOrSigner, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';
import { TEthersAdaptor } from '~~/models/ethersAppContextTypes';

const queryKey = { namespace: keyNamespace.network, key: 'useGetEthersAdaptorFromProviderOrSigners' } as const;

/**
 * #### Summary
 * Gets the user {@link TEthersUser} for a signer or wallet
 *
 * @category Hooks
 *
 * @param providerOrSigner input signer
 * @returns
 */
export const useEthersAdaptorFromProviderOrSigners = (
  providerOrSigner: TEthersProviderOrSigner | undefined,
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): [adaptor: TEthersAdaptor | undefined, update: () => void] => {
  const keys = [{ ...queryKey, ...providerKey(providerOrSigner) }] as const;
  const { data, refetch } = useQuery(
    keys,
    async (_keys): Promise<TEthersAdaptor | undefined> => {
      const result = await parseProviderOrSigner(providerOrSigner);
      return result;
    },
    {
      isDataEqual: (oldData, newData) => isAdaptorEqual(oldData, newData),
      ...options.query,
    }
  );

  return [data, refetch];
};
