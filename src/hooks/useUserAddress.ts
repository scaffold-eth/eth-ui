import { useState, useEffect, useCallback } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useBlockNumberContext } from '~~/context';
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
  const blockNumber = useBlockNumberContext();

  const callFunc = useCallback(async (): Promise<void> => {
    if (signerHasNetwork(signer)) {
      const address = await signer?.getAddress();
      if (isMounted()) {
        setUserAddress(address);
      }
    }
  }, [isMounted, signer]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);

  return userAddress;
};
