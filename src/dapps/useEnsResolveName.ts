import { constants } from 'ethers';
import { useState, useEffect } from 'react';

import { TEthersProvider } from '~~/models';

/**
 * Gets the address from an ENS name and provider
 * @param mainnetProvider (TEthersProvider)
 * @param ensName (string)
 * @returns (string) :: address
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
