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
export const useTimestamp = (): number => {
  const isMounted = useIsMounted();
  const { ethersProvider } = useEthersContext();
  const blockNumber = useBlockNumberContext();

  const [timestamp, setTimestamp] = useState<number>(0);

  const callFunc = useCallback(async (): Promise<void> => {
    if (blockNumber != null) {
      const block = await ethersProvider?.getBlock(blockNumber);
      if (block?.timestamp != null) {
        const nextTimestamp = block.timestamp;
        if (isMounted()) setTimestamp(nextTimestamp);
      }
    }
  }, [blockNumber, ethersProvider, isMounted]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);

  return timestamp;
};
