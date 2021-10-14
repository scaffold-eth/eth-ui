import { Signer } from 'ethers';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useIsMounted } from 'usehooks-ts';

/**
 * Get the address from the current signer or provider
 * @param providerOrSigner (TEthersProviderOrSigner)
 * @returns (string) :: address
 */
export const useUserAddress = (signer: Signer | undefined): string | undefined => {
  const isMounted = useIsMounted();
  const [userAddress, setUserAddress] = useState<string>();
  const [result] = useDebounce(userAddress, 200, { trailing: true });

  useEffect(() => {
    const getUserAddress = async (): Promise<void> => {
      if (signer) {
        const address = await signer?.getAddress();
        if (isMounted()) setUserAddress(address);
      }
    };
    void getUserAddress();
  }, [isMounted, signer]);

  return result;
};
