import { useState, useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { signerHasNetwork } from '~~/functions';
import { TEthersSigner } from '~~/models';

/**
 * #### Summary
 * Get the address from the signer
 *
 * @category Hooks
 *
 * @param signer
 * @returns
 */
export const useUserAddress = (signer: TEthersSigner | undefined): string | undefined => {
  const isMounted = useIsMounted();
  const [userAddress, setUserAddress] = useState<string>();

  useEffect(() => {
    const getUserAddress = async (): Promise<void> => {
      if (signerHasNetwork(signer)) {
        const address = await signer?.getAddress();
        if (isMounted()) {
          setUserAddress(address);
        }
      }
    };
    void getUserAddress();
  }, [isMounted, signer]);

  return userAddress;
};
