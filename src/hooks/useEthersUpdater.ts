import { useEffect } from 'react';

import { TUpdateOptions } from '~~/models';

export const useEthersUpdater = (
  update: (() => void) | (() => Promise<void>),
  blockNumber: number | undefined,
  options: TUpdateOptions,
  allowBlockNumberUpdate: boolean = true
): void => {
  const blockNumberFilter = Math.floor((blockNumber ?? 0) / (options.blockNumberInterval ?? 1));

  useEffect(() => {
    if (allowBlockNumberUpdate) {
      // update if blocknumber or if polling
      if (blockNumber != null && !options.refetchInterval) {
        void update();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumberFilter, update, options.refetchInterval]);
};
