import { useEffect } from 'react';

import { THookOptions } from '~~/models';

export const useEthersUpdater = (
  update: (() => void) | (() => Promise<void>),
  blockNumber: number | undefined,
  options: THookOptions
): void => {
  const blockNumberFilter = Math.floor((blockNumber ?? 0) / options.update.blockNumberInterval);

  useEffect(() => {
    if (blockNumber != null && !options.update.query.refetchInterval) {
      void update();
    }
  }, [blockNumberFilter, update, blockNumber, options.update.query.refetchInterval]);
};
