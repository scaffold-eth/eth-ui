import { Signer } from 'ethers';
import { useEffect, useState } from 'react';

import { asyncSome } from '~~/functions/asyncSome';
import { parseProviderOrSigner } from '~~/functions/parseProviderOrSigner';
import { TEthersProvider } from '~~/models';
import { TEthersUser } from '~~/models/contextTypes';

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
): TEthersUser | undefined => {
  const [signer, setSigner] = useState<Signer>();
  const [provider, setProvider] = useState<TEthersProvider>();
  const [chainId, setChainId] = useState<number>();
  const [account, setAccount] = useState<string>();

  const allProviders = [currentProvider, ...moreProviders].filter((f) => f != null) as TEthersProvider[];
  const providerDeps: string = allProviders
    .map((m) => {
      return `${m?.network?.name}_${m?.network?.chainId}_${m?.connection.url}`;
    })
    .reduce((acc, value) => {
      if (!acc) return value ?? '';
      return acc + value ?? '';
    }, '');

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const foundSigner = await asyncSome(allProviders, async (provider) => {
        const result = await parseProviderOrSigner(provider);
        if (result) {
          setSigner(result.signer);
          setProvider(result.provider);
          setAccount(result.account);
          setChainId(result.chainId);
          const address = await result.signer.getAddress();
          setAccount(address);
          return true;
        }
        return false;
      });

      if (!foundSigner && currentProvider != null) {
        setProvider(currentProvider);
        setSigner(undefined);
        setAccount(undefined);
        setChainId(undefined);
        setAccount(undefined);
      }
    };

    void loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerDeps]);

  if (signer != null && provider != null && chainId != null && account != null) {
    const result: TEthersUser = {
      signer,
      provider,
      chainId,
      account,
    };
    return result;
  }

  return undefined;
};
