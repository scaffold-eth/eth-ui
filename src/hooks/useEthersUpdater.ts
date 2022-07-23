import { useRef } from 'react';

import { checkUpdateOptions } from '~~/functions';
import { TUpdateOptions } from '~~/models';

/**
 * #### Summary
 * A hook that invokes an update callback function based on update options and ethers network state (i.e. block number)
 *
 * @param update Function to call when update
 * @param blockNumber Current block number
 * @param options Options for how often and when to update
 * @param allowBlockNumberUpdate Boolean of if updating using this hook is allowed
 */
export const useEthersUpdater = (
  update: (() => void) | (() => Promise<void>),
  blockNumber: number | undefined,
  options: TUpdateOptions,
  allowBlockNumberUpdate: boolean = true
): void => {
  checkUpdateOptions(options);
  const updateNumberRef = useRef<undefined | number>(undefined);

  // number that only increases every (X * options.blockNumberInterval) blocks
  const blockNumberFilter = blockNumber ? Math.floor(blockNumber / (options.blockNumberInterval ?? 1)) : undefined;

  if (allowBlockNumberUpdate) {
    // update if blocknumber or if polling
    if (!options.refetchInterval && blockNumberFilter !== updateNumberRef.current) {
      updateNumberRef.current = blockNumberFilter;
      void update();
    }
  }
};
