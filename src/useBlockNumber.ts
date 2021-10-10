import { useCallback, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { TEthersProvider } from '~~/models';
import { useOnRepetition } from '~~/useOnRepetition';

/**
 * Get the current block number of the network
 * @param ethersProvider (TEthersProvider)
 * @param pollTime (number) :: if >0 use polling, else use instead of onBlock event
 * @returns (number) :: block number
 */
export const useBlockNumber = (pollTime: number = 0): number => {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const isMounted = useIsMounted();
  const { ethersProvider } = useEthersContext();

  const getBlockNumber = useCallback(
    async (provider: TEthersProvider): Promise<void> => {
      const nextBlockNumber = await provider?.getBlockNumber();
      if (isMounted()) {
        setBlockNumber((value) => {
          if (value !== nextBlockNumber) return nextBlockNumber;
          return value;
        });
      }
    },
    [isMounted]
  );

  useOnRepetition(getBlockNumber, { provider: ethersProvider, pollTime }, ethersProvider);

  return blockNumber;
};
