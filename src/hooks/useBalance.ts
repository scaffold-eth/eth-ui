import { BigNumber } from 'ethers';
import { useQuery } from 'react-query';

import { useEthersUpdater } from './useEthersUpdater';

import { useEthersContext, useBlockNumberContext } from '~~/context';
import {
  asyncForEach,
  ethersOverride,
  mergeDefaultOverride,
  mergeDefaultUpdateOptions,
  processQueryOptions,
} from '~~/functions';
import { providerKey, TRequiredKeys } from '~~/functions/keyHelpers';
import { THookResult, TOverride, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useBalance' };

const zero = BigNumber.from(0);

type TUseBalanceResult<GAddress extends string | string[]> = GAddress extends string[]
  ? Record<string, BigNumber>
  : BigNumber;

/**
 * #### Summary
 * Gets your balance in ETH for the given address.
 *
 * ##### ✏️ Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link provider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param addresses
 * @param options
 * @returns current balance
 */
export const useBalance = <GAddress extends string | Array<string>>(
  addresses: GAddress | undefined,
  options: TUpdateOptions = mergeDefaultUpdateOptions(),
  override: TOverride = mergeDefaultOverride()
): THookResult<TUseBalanceResult<GAddress>> => {
  const ethersContext = useEthersContext(override.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, override);

  const keys = [{ ...queryKey, ...providerKey(provider) }, { addresses }] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<TUseBalanceResult<GAddress> | undefined> => {
      const { addresses } = keys.queryKey[1];

      if (provider && addresses) {
        if (Array.isArray(addresses)) {
          const result: TUseBalanceResult<string[]> = {};
          await asyncForEach(addresses, async (address: string) => {
            const balance = await provider.getBalance(address);
            result[address] = balance;
          });
          return result as TUseBalanceResult<GAddress>;
        } else {
          const address: string = addresses;
          const newBalance = await provider.getBalance(address);
          return newBalance as TUseBalanceResult<GAddress>;
        }
      }
      return undefined;
    },
    {
      ...processQueryOptions<TUseBalanceResult<GAddress> | undefined>(options),
      isDataEqual: (oldResult, newResult) => oldResult?._hex === newResult?._hex,
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  let result: TUseBalanceResult<GAddress>;
  if (Array.isArray(addresses)) {
    result = data ?? ({} as TUseBalanceResult<GAddress>);
  } else {
    result = data ?? (zero as TUseBalanceResult<GAddress>);
  }

  return [result, refetch, status];
};
