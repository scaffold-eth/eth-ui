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

  const update = useCallback(async () => {
    if (mainnetProvider) {
      const resolved = await mainnetProvider.resolveName(ensName);
      setAddress(resolved ?? constants.AddressZero);
    }
  }, [ensName, mainnetProvider]);

  useEffect(() => {
    void update();
  }, [mainnetProvider, ensName, update]);

  return [address, update];
};
