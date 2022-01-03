import { useState, useCallback, useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useBlockNumberContext } from '~~/context';
import { signerHasNetwork } from '~~/functions';
import { TEthersSigner } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey = { namespace: keyNamespace.signer, key: 'useSignerAddress' } as const;

/**
 * #### Summary
 * Get the address from the signer
 *
 * @category Hooks
 *
 * @param signer
 * @returns
 */
export const useSignerAddress = (
  signer: TEthersSigner | undefined
): [address: string | undefined, update: () => void] => {
  const isMounted = useIsMounted();
  const blockNumber = useBlockNumberContext();

  const [address, setAddress] = useState<string>();

  const update = useCallback(async (): Promise<void> => {
    if (signerHasNetwork(signer)) {
      const address = await signer?.getAddress();
      if (isMounted()) {
        setAddress(address);
      }
    }
  }, [isMounted, signer]);

  useEffect(() => {
    void update();
  }, [blockNumber, update]);

  return [address, update];
};
