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
export const useUserProviderAndSigner = (...providers: TEthersProvider[]): TProviderAndSigner | undefined => {
  const [signer, setSigner] = useState<Signer>();
  const [provider, setProvider] = useState<TEthersProvider>();
  const [providerNetwork, setProviderNetwork] = useState<ethers.providers.Network>();
  const [address, setAddress] = useState<string>();

  const providerDeps: string = providers
    .map((m) => {
      return `${m?.network?.name}_${m?.network?.chainId}`;
    })
    .reduce((acc, value) => {
      if (!acc) return value ?? '';
      return acc + value ?? '';
    }, '');

  useMemo(() => {
    const foundSigner = providers.some(async (provider) => {
      console.log('🦊 Using provider');
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

    if (!foundSigner && providers?.length > 1) {
      setProvider(providers[0]);
      setSigner(undefined);
      setProviderNetwork(undefined);
      setAddress(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerDeps]);

  return { signer, provider, providerNetwork, address };
};
