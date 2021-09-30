import { ethers, Signer, Wallet } from 'ethers';
import { useEffect, useState } from 'react';

import { parseProviderOrSigner } from '~~/functions/parseProviderOrSigner';
import { TEthersUser, TEthersProvider } from '~~/models';

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
export const useGetUserFromSigners = (currentSigner: Signer | Wallet | undefined): TEthersUser => {
  const [signer, setSigner] = useState<Signer>();
  const [provider, setProvider] = useState<TEthersProvider>();
  const [providerNetwork, setProviderNetwork] = useState<ethers.providers.Network>();
  const [address, setAddress] = useState<string>();
  useEffect(() => {
    const getData = async (): Promise<void> => {
      const result = await parseProviderOrSigner(currentSigner);
      if (result.provider && result.providerNetwork && result.signer) {
        setSigner(result.signer);
        setProvider(result.provider);
        setProviderNetwork(result.providerNetwork);
        const address = await result.signer.getAddress();
        setAddress(address);
      } else {
        setProvider(undefined);
        setSigner(currentSigner);
        setProviderNetwork(undefined);
        setAddress(undefined);
      }
    };

    void getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSigner]);

  return { signer, provider, providerNetwork, address };
};
