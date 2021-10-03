import { useState, useEffect } from 'react';

import { useBlockNumber } from '~~';
import { useEthersContext } from '~~/context';
import { useMounted } from '~~/helpers/hooks/useMounted';

/**
 * Get the current timestamp from the latest block
 * @param provider (TEthersProvider)
 * @param pollTime (number) :: if >0 use polling, else use instead of onBlock event
 * @returns (number) :: timestamp
 */
export const useTimestamp = (providerKey?: string, pollTime?: number): number => {
  const isMounted = useMounted();
  const { ethersProvider } = useEthersContext(providerKey);

  const blockNumber = useBlockNumber(providerKey, pollTime);
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
