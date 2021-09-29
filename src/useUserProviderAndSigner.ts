import { Provider } from '@ethersproject/providers';
import { ethers, Signer } from 'ethers';
import { useMemo, useState } from 'react';

import { parseProviderOrSigner } from '~~/functions/parseProviderOrSigner';
import { TProviderAndSigner, TEthersProvider } from '~~/models';

/**
 *  Gets user provider/signer from injected provider or local provider
 *  Use your injected provider from 🦊 Metamask 
 *  If you don't have it then instantly generate a 🔥 burner wallet from a local provider
 *
  ~ Features ~
  - Specify the injected provider from Metamask
  - Specify the local provider
  - Usage examples:
    const tx = Transactor(userSigner, gasPrice)
 * @param provider (TEthersProviderOrSigner) :: injected provider/signer from metamask etc..
 * @param localProvider (TEthersProvider) local provider to generate a burner wallet from
 * @returns (TProviderAndSigner) 
 */
export const useUserProviderAndSigner = (providers: TEthersProvider[]): TProviderAndSigner | undefined => {
  const [signer, setSigner] = useState<Signer>();
  const [provider, setProvider] = useState<Provider>();
  const [providerNetwork, setProviderNetwork] = useState<ethers.providers.Network>();

  const providerDeps: string = providers
    .map((m) => {
      return `${m?.network?.name} :: ${m?.network?.chainId}`;
    })
    .reduce((acc, value) => {
      if (!acc) return '';
      return acc + value ?? '';
    });

  useMemo(() => {
    providers.some(async (provider) => {
      console.log('🦊 Using provider');
      const result = await parseProviderOrSigner(provider);

      if (result.provider && result.providerNetwork && result.signer) {
        setSigner(result.signer);
        setProvider(result.provider);
        setProviderNetwork(result.providerNetwork);
        return true;
      }
      return false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerDeps]);

  return { signer, provider, providerNetwork };
};
