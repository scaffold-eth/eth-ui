import { useState, useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useBlockNumber } from '~~';
import { useEthersContext } from '~~/context';

/**
 * Get the current timestamp from the latest block
 * @param provider (TEthersProvider)
 * @param pollTime (number) :: if >0 use polling, else use instead of onBlock event
 * @returns (number) :: timestamp
 */
export const useTimestamp = (pollTime?: number): number => {
  const isMounted = useIsMounted();
  const { ethersProvider } = useEthersContext();

  const blockNumber = useBlockNumber(pollTime);
  const [timestamp, setTimestamp] = useState<number>(0);

  useEffect((): void => {
    const getTimestamp = async (): Promise<void> => {
      const nextBlock = await ethersProvider?.getBlock(blockNumber);
      if (nextBlock?.timestamp != null) {
        const nextTimestamp = nextBlock.timestamp;
        if (isMounted()) setTimestamp(nextTimestamp);
      }
    };

    void getTimestamp();
  }, [blockNumber, ethersProvider, isMounted]);

  return timestamp;
};
