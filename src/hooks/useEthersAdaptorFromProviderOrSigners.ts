import { useQuery } from 'react-query';

import { providerKey } from '~~/functions';
import { parseProviderOrSigner } from '~~/functions/parseProviderOrSigner';
import { defaultHookOptions, TEthersProviderOrSigner, THookOptions } from '~~/models';
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
  options: THookOptions = defaultHookOptions()
): [adaptor: TEthersAdaptor | undefined, update: () => void] => {
  const keys = [{ ...queryKey, ...providerKey(providerOrSigner) }, { providerOrSigner }] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys) => {
      const { providerOrSigner } = keys.queryKey[1];
      const result = await parseProviderOrSigner(providerOrSigner);
      return result;
    },
    {
      ...options.update.query,
    }
  );

  return [data, refetch];
};
