import { Signer } from 'ethers';
import { useState, useEffect } from 'react';

import { useMounted } from '~~/helpers/hooks/useMounted';

/**
 * Get the address from the current signer or provider
 * @param providerOrSigner (TEthersProviderOrSigner)
 * @returns (string) :: address
 */
export const useUserAddress = (signer: Signer): string | undefined => {
  const isMounted = useMounted();
  const [userAddress, setUserAddress] = useState<string>();

  useEffect(() => {
    const getUserAddress = async (): Promise<void> => {
      if (signer) {
        const address = await signer?.getAddress();
        if (isMounted()) setUserAddress(address);
      }
    };
    void getUserAddress();
  }, [isMounted, signer]);

  return userAddress;
};
