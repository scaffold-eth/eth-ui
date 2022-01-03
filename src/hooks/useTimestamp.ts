import { useState, useEffect, useCallback } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useBlockNumberContext, useEthersContext } from '~~/context';
import { checkEthersOverride } from '~~/functions';
import { THookOptions, defaultHookOptions } from '~~/models';

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
export const useTimestamp = (options: THookOptions = defaultHookOptions()): [timestamp: number, update: () => void] => {
  const isMounted = useIsMounted();
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext(options.alternateContextOverride);
  const { provider } = checkEthersOverride(ethersContext, options);

  const [timestamp, setTimestamp] = useState<number>(0);

  const update = useCallback(async (): Promise<void> => {
    if (blockNumber != null) {
      const block = await provider?.getBlock(blockNumber);
      if (block?.timestamp != null) {
        const nextTimestamp = block.timestamp;
        if (isMounted()) setTimestamp(nextTimestamp);
      }
    }
  }, [blockNumber, provider, isMounted]);

  useEffect(() => {
    void update();
  }, [blockNumber, update]);

  return [timestamp, update];
};
