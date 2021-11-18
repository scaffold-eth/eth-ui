import { ethers, Signer } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import { asyncSome } from '~~/functions/asyncSome';
import { parseProviderOrSigner } from '~~/functions/parseProviderOrSigner';
import { TEthersUser as TEthersUser, TEthersProvider } from '~~/models';

/**
 * #### Summary
 * Gets the user {@link TEthersUser} from from the current provider or array of fallback providers
 *
 * #### Notes
 * - 🤚🏽 Consider using the context provider {@link ethersProvider}
 *
 * @category Hooks
 *
 * @param currentProvider
 * @param moreProviders
 * @returns
 */
export const useGetUserFromProviders = (
  currentProvider: TEthersProvider | undefined,
  ...moreProviders: TEthersProvider[]
): TEthersUser => {
  const [signer, setSigner] = useState<Signer>();
  const [provider, setProvider] = useState<TEthersProvider>();
  const [providerNetwork, setProviderNetwork] = useState<ethers.providers.Network>();
  const [address, setAddress] = useState<string>();

  const allProviders = [currentProvider, ...moreProviders].filter((f) => f != null) as TEthersProvider[];
  const providerDeps: string = allProviders
    .map((m) => {
      return `${m?.network?.name}_${m?.network?.chainId}_${m?.connection.url}`;
    })
    .reduce((acc, value) => {
      if (!acc) return value ?? '';
      return acc + value ?? '';
    }, '');

  const callFunc = useCallback(
    async (): Promise<void> => {
      const foundSigner = await asyncSome(allProviders, async (provider) => {
        const result = await parseProviderOrSigner(provider);
        if (result.provider && result.providerNetwork && result.signer) {
          setSigner(result.signer);
          setProvider(result.provider);
          setProviderNetwork(result.providerNetwork);
          const address = await result.signer.getAddress();
          setAddress(address);
          return true;
        }
        return false;
      });

      if (!foundSigner && currentProvider != null) {
        setProvider(currentProvider);
        setSigner(undefined);
        setProviderNetwork(undefined);
        setAddress(undefined);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [providerDeps]
  );

  useEffect(() => {
    void callFunc();
  }, [callFunc]);

  return { signer, provider, providerNetwork, address };
};
