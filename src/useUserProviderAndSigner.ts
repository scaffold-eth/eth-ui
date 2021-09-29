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
export const useUserProviderAndSigner = (
  ...providers: TEthersProvider[] | Provider[]
): TProviderAndSigner | undefined => {
  const [signer, setSigner] = useState<Signer>();
  const [provider, setProvider] = useState<TEthersProvider>();
  const [providerNetwork, setProviderNetwork] = useState<ethers.providers.Network>();
  const [address, setAddress] = useState<string>();

  const providerDeps: string = providers
    .map((m) => {
      const casted = m as TEthersProvider;
      return `${casted?.network?.name} :: ${casted?.network?.chainId}`;
    })
    .reduce((acc, value) => {
      if (!acc) return '';
      return acc + value ?? '';
    });

  useMemo(() => {
    const foundSigner = providers.some(async (provider) => {
      console.log('🦊 Using provider');
      const casted = provider as TEthersProvider;
      const result = await parseProviderOrSigner(casted);

      if (result.provider && result.providerNetwork && result.signer) {
        setSigner(result.signer);
        setProvider(result.provider as TEthersProvider);
        setProviderNetwork(result.providerNetwork);
        const address = await result.signer.getAddress();
        setAddress(address);
        return true;
      }
      return false;
    });

    if (!foundSigner && providers?.length > 1) {
      setProvider(providers[0] as TEthersProvider);
      setSigner(undefined);
      setProviderNetwork(undefined);
      setAddress(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerDeps]);

  return { signer, provider, providerNetwork, address };
};
