import { BigNumber } from 'ethers';
import { useQuery } from 'react-query';

import { useEthersUpdater } from './useEthersUpdater';

import { useEthersContext, useBlockNumberContext } from '~~/context';
import { ethersOverride, mergeDefaultOverride, mergeDefaultUpdateOptions } from '~~/functions';
import { providerKey } from '~~/functions/keyHelpers';
import { TOverride, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const zero = BigNumber.from(0);
const queryKey = { namespace: keyNamespace.signer, key: 'useBalance' } as const;

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
  override: TOverride = mergeDefaultOverride(),
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): [balance: BigNumber, update: () => void] => {
  const ethersContext = useEthersContext(override.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, override);

  const keys = [{ ...queryKey, ...providerKey(provider) }, { address }] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys): Promise<BigNumber> => {
      const { address } = keys.queryKey[1];

      if (provider && address) {
        const newBalance = await provider.getBalance(address);
        return newBalance;
      } else {
        return zero;
      }
    },
    {
      isDataEqual: (oldResult, newResult) => oldResult?._hex === newResult._hex,
      ...options.query,
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? zero, refetch];
};
