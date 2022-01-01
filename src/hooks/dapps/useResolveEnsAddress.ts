import { constants } from 'ethers';
import { useState, useEffect, useCallback } from 'react';

import { TEthersProvider } from '~~/models';

/**
 * #### Summary
 * Gets the address from an ENS name
 *
 * @category Hooks
 *
 * @param mainnetProvider mainnet provider
 * @param ensName
 * @returns
 */
export const useResolveEnsAddress = (
  mainnetProvider: TEthersProvider,
  ensName: string
): [address: string, update: () => void] => {
  const [address, setAddress] = useState<string>(constants.AddressZero);

  const update = useCallback(() => {
    if (mainnetProvider) {
      void mainnetProvider.resolveName(ensName).then((resolvedAddress: string) => setAddress(resolvedAddress));
    }
  }, [ensName, mainnetProvider]);

  useEffect(() => {
    update();
  }, [mainnetProvider, ensName, update]);

  return [address, update];
};
