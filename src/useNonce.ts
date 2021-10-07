import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { useBlockNumberContext } from '~~/context/BlockNumberContext';

/**
 * Get the current nonce of the address provided
 * @param provider (TEthersProvider)
 * @param address (string)
 * @param pollTime (number) :: if >0 use polling, else use instead of onBlock event
 * @returns (number) nonce
 */
export const useNonce = (address: string): number => {
  const isMounted = useIsMounted();
  const { ethersProvider } = useEthersContext();
  const blockNumber = useBlockNumberContext();

  const [nonce, setNonce] = useState<number>(0);

  const callFunc = useCallback(async (): Promise<void> => {
    const nextNonce: number = (await ethersProvider?.getTransactionCount(address)) ?? 0;
    if (isMounted()) {
      setNonce((value) => {
        if (value !== nextNonce) return nextNonce;
        return value;
      });
    }
  }, [address, ethersProvider, isMounted]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);

  return nonce;
};
