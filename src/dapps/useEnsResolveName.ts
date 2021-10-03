import { constants } from 'ethers';
import { useState, useEffect } from 'react';

import { TEthersProvider } from '~~/models';

/**
 * Gets the address from an ENS name and provider
 * @param provider (TEthersProvider)
 * @param ensName (string)
 * @returns (string) :: address
 */
export const useEnsResolveName = (provider: TEthersProvider, ensName: string): string => {
  const [address, setAddress] = useState<string>(constants.AddressZero);

  useEffect(() => {
    if (provider) {
      void provider.resolveName(ensName).then((resolvedAddress: string) => setAddress(resolvedAddress));
    }
  }, [provider, ensName]);

  return address;
};
