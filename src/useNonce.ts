import { useCallback, useState } from 'react';

import { useEthersContext } from '~~/context';
import { useMounted } from '~~/helpers/hooks/useMounted';
import { TEthersProvider } from '~~/models';
import { useOnRepetition } from '~~/useOnRepetition';

/**
 * Get the current nonce of the address provided
 * @param provider (TEthersProvider)
 * @param address (string)
 * @param pollTime (number) :: if >0 use polling, else use instead of onBlock event
 * @returns (number) nonce
 */
export const useNonce = (address: string, providerKey?: string, pollTime: number = 0): number => {
  const isMounted = useMounted();
  const { ethersProvider } = useEthersContext(providerKey);

  const [nonce, setNonce] = useState<number>(0);

  const getTransactionCount = useCallback(
    async (provider: TEthersProvider): Promise<void> => {
      const nextNonce: number = (await provider?.getTransactionCount(address)) ?? 0;
      if (isMounted()) {
        setNonce((value) => {
          if (value !== nextNonce) return nextNonce;
          return value;
        });
      }
    },
    [address, isMounted]
  );

  const leadingTrigger = ethersProvider != null;
  useOnRepetition(
    getTransactionCount,
    { pollTime, leadingTrigger: leadingTrigger, provider: ethersProvider },
    ethersProvider
  );

  return nonce;
};
