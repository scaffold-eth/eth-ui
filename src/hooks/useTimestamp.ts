import { useState, useEffect, useCallback } from 'react';
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
export const useTimestamp = (): [timestamp: number, update: () => void] => {
  const isMounted = useIsMounted();
  const { provider: ethersProvider } = useEthersContext();
  const blockNumber = useBlockNumberContext();

  const [timestamp, setTimestamp] = useState<number>(0);

  const update = useCallback(async (): Promise<void> => {
    if (blockNumber != null) {
      const block = await ethersProvider?.getBlock(blockNumber);
      if (block?.timestamp != null) {
        const nextTimestamp = block.timestamp;
        if (isMounted()) setTimestamp(nextTimestamp);
      }
    }
  }, [blockNumber, ethersProvider, isMounted]);

  useEffect(() => {
    void update();
  }, [blockNumber, update]);

  return [timestamp, update];
};
