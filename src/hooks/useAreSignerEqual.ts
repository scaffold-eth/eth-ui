import { useState, useEffect, useCallback } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useBlockNumberContext } from '~~/context';
import { signerHasNetwork } from '~~/functions';
import { TEthersSigner } from '~~/models';

/**
 * #### Summary
 * Are the signers equal and valid
 *
 * @category Hooks
 *
 * @param signer1
 * @returns
 */
export const useAreSignerEqual = (
  signer1: TEthersSigner | undefined,
  signer2: TEthersSigner | undefined
): [isEqual: boolean | undefined, update: () => void] => {
  const isMounted = useIsMounted();
  const [isEqual, setIsEqual] = useState<boolean>();
  const blockNumber = useBlockNumberContext();

  const update = useCallback(async (): Promise<void> => {
    if (signerHasNetwork(signer1)) {
      const chainId1 = await signer1?.getChainId();
      const chainId2 = await signer2?.getChainId();

      const address1 = await signer1?.getAddress();
      const address2 = await signer2?.getAddress();
      const isEqual =
        address1 === address2 && chainId1 === chainId2 && address1 !== undefined && chainId1 !== undefined;

      if (isMounted()) {
        setIsEqual(isEqual);
      }
    }
  }, [isMounted, signer1, signer2]);

  useEffect(() => {
    void update();
  }, [blockNumber, update]);

  return [isEqual, update];
};
