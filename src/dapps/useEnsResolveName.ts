import { constants } from 'ethers';
import { useState, useEffect } from 'react';

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
export const useEnsResolveName = (mainnetProvider: TEthersProvider, ensName: string): string => {
  const [address, setAddress] = useState<string>(constants.AddressZero);

  useEffect(() => {
    if (mainnetProvider) {
      void mainnetProvider.resolveName(ensName).then((resolvedAddress: string) => setAddress(resolvedAddress));
    }
  }, [mainnetProvider, ensName]);

  return address;
};
