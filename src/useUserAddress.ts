import { useState, useEffect } from 'react';

import { parseProviderOrSigner } from '~~/functions';
import { TProviderAndSigner, TEthersProviderOrSigner } from '~~/models';

/**
 * Get the address from the current signer or provider
 * @param providerOrSigner (TEthersProviderOrSigner)
 * @returns (string) :: address
 */
export const useUserAddress = (providerOrSigner: TEthersProviderOrSigner | undefined): string => {
  const [userAddress, setUserAddress] = useState<string>('');

  useEffect(() => {
    const getUserAddress = async (providerOrSigner: TEthersProviderOrSigner): Promise<void> => {
      const result: TProviderAndSigner = await parseProviderOrSigner(providerOrSigner);
      if (result.signer) {
        const address = await result.signer?.getAddress();
        setUserAddress(address);
      }
    };

    if (providerOrSigner) void getUserAddress(providerOrSigner);
  }, [providerOrSigner]);

  return userAddress;
};
