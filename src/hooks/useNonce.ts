import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { useBlockNumberContext } from '~~/context/BlockNumberContext';

/**
 * #### Summary
 * Get the current nonce for the address provided
 *
 * #### Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param address
 * @returns
 */
export const useNonce = (address: string): number => {
  const isMounted = useIsMounted();
  const { ethersProvider } = useEthersContext();
  const blockNumber = useBlockNumberContext();

  const [nonce, setNonce] = useState<number>(0);

  const callFunc = useCallback(async (): Promise<void> => {
    let nextNonce: number = 0;
    try {
      nextNonce = (await ethersProvider?.getTransactionCount(address)) ?? 0;
    } catch {
      // do nothing
    }
    if (isMounted()) {
      setNonce((value) => {
        if (nextNonce && value !== nextNonce && value < nextNonce) return nextNonce;
        return value;
      });
    }
  }, [address, ethersProvider, isMounted]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);

  return nonce;
};
