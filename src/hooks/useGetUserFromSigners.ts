import { ethers, Signer, Wallet } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import { parseProviderOrSigner } from '~~/functions/parseProviderOrSigner';
import { TEthersUser, TEthersProvider } from '~~/models';

/**
 * #### Summary
 * Gets the user {@link TEthersUser} for a signer or wallet
 *
 * @category Hooks
 *
 * @param signer
 * @returns
 */
export const useGetUserFromSigners = (signer: Signer | Wallet | undefined): TEthersUser => {
  const [resolvedSigner, setResolvedSigner] = useState<Signer>();
  const [provider, setProvider] = useState<TEthersProvider>();
  const [providerNetwork, setProviderNetwork] = useState<ethers.providers.Network>();
  const [address, setAddress] = useState<string>();

  const callFunc = useCallback(async (): Promise<void> => {
    const result = await parseProviderOrSigner(signer);
    if (result.provider && result.providerNetwork && result.signer) {
      setResolvedSigner(result.signer);
      setProvider(result.provider);
      setProviderNetwork(result.providerNetwork);
      const address = await result.signer.getAddress();
      setAddress(address);
    } else {
      setProvider(undefined);
      setResolvedSigner(signer);
      setProviderNetwork(undefined);
      setAddress(undefined);
    }
  }, [signer]);

  useEffect(() => {
    void callFunc();
  }, [callFunc]);

  return { signer: resolvedSigner, provider, providerNetwork, address };
};
