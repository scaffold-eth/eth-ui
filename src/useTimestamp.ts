import { useState, useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useBlockNumberContext, useEthersContext } from '~~/context';

/**
 * #### Summary
 * Get the current timestamp from the latest block
 *
 * #### Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param pollTime
 * @returns
 */
export const useTimestamp = (): number => {
  const isMounted = useIsMounted();
  const { ethersProvider } = useEthersContext();
  const blockNumber = useBlockNumberContext();

  const [timestamp, setTimestamp] = useState<number>(0);

  useEffect((): void => {
    const getTimestamp = async (): Promise<void> => {
      if (blockNumber) {
        const nextBlock = await ethersProvider?.getBlock(blockNumber);
        if (nextBlock?.timestamp != null) {
          const nextTimestamp = nextBlock.timestamp;
          if (isMounted()) setTimestamp(nextTimestamp);
        }
      }
    };

    void getTimestamp();
  }, [blockNumber, ethersProvider, isMounted]);

  return timestamp;
};
