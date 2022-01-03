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
export const useSignerChainId = (
  signer: TEthersSigner | undefined
): [address: number | undefined, update: () => void] => {
  const isMounted = useIsMounted();
  const blockNumber = useBlockNumberContext();

  const [chainId, setChainId] = useState<number>();

  const update = useCallback(async (): Promise<void> => {
    if (signerHasNetwork(signer)) {
      const chainId = await signer?.getChainId();
      if (isMounted()) {
        setChainId(chainId);
      }
    }
  }, [isMounted, signer]);

  useEffect(() => {
    void update();
  }, [blockNumber, update]);

  return [chainId, update];
};
