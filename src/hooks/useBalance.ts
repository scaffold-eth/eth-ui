import { BigNumber } from 'ethers';
import { useQuery } from 'react-query';

import { useEthersUpdater } from './useEthersUpdater';

import { useEthersContext, useBlockNumberContext } from '~~/context';
import { ethersOverride } from '~~/functions';
import { providerKey } from '~~/functions/keyHelpers';
import { defaultHookOptions, THookOptions } from '~~/models';

const zero = BigNumber.from(0);
const hookKey = 'useBalance' as const;

/**
 * #### Summary
 * Gets your balance in ETH for the given address.
 *
 * #### Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link provider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param address
 * @param options
 * @returns current balance
 */
export const useBalance = (
  address: string | undefined,
  options: THookOptions = defaultHookOptions()
): [balance: BigNumber, update: () => void] => {
  const ethersContext = useEthersContext(options.contextOverride.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, options);

  const keys = [hookKey, providerKey(provider), { address }] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys): Promise<BigNumber> => {
      const { address } = keys.queryKey[2];

      if (provider && address) {
        const newBalance = await provider.getBalance(address);
        return newBalance;
      } else {
        return zero;
      }
    },
    {
      isDataEqual: (oldResult, newResult) => oldResult?._hex === newResult._hex,
      ...options.update.query,
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? zero, refetch];
};
