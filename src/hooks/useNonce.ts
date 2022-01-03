import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext, useBlockNumberContext } from '~~/context';
import { ethersOverride } from '~~/functions';
import { defaultHookOptions, THookOptions } from '~~/models';

/**
 * #### Summary
 * Get the current nonce for the address provided
 *
 * #### Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param address
 * @returns
 */
export const useNonce = (
  address: string,
  options: THookOptions = defaultHookOptions()
): [nonce: number, update: () => void] => {
  const isMounted = useIsMounted();
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext(options.contextOverride.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, options);

  const [nonce, setNonce] = useState<number>(0);

  const update = useCallback(async (): Promise<void> => {
    let nextNonce: number = 0;
    try {
      nextNonce = (await provider?.getTransactionCount(address)) ?? 0;
    } catch {
      // do nothing
    }
    if (isMounted()) {
      setNonce((value) => {
        if (nextNonce && value !== nextNonce && value < nextNonce) return nextNonce;
        return value;
      });
    }
  }, [address, provider, isMounted]);

  useEffect(() => {
    void update();
  }, [blockNumber, update]);

  return [nonce, update];
};
