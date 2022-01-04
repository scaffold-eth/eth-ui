import { useEffect } from 'react';

import { THookOptions } from '~~/models';

export const useEthersUpdater = (
  update: (() => void) | (() => Promise<void>),
  blockNumber: number | undefined,
  options: THookOptions,
  allowBlockNumberUpdate: boolean = true
): void => {
  const blockNumberFilter = Math.floor((blockNumber ?? 0) / (options.update.blockNumberInterval ?? 1));

  useEffect(() => {
    if (blockNumber != null && !options.update.query.refetchInterval && allowBlockNumberUpdate) {
      void update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumberFilter, update, options.update.query.refetchInterval]);
};
