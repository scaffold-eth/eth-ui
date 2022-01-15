import { BigNumber } from 'ethers';
import { useQuery } from 'react-query';

import { useEthersUpdater } from './useEthersUpdater';

import { useEthersContext, useBlockNumberContext } from '~~/context';
import { asyncForEach, ethersOverride, mergeDefaultOverride, mergeDefaultUpdateOptions } from '~~/functions';
import { providerKey, TRequiredKeys } from '~~/functions/keyHelpers';
import { TOverride, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useBalance' };

const zero = BigNumber.from(0);

type TUseBalanceResult<GAddress extends string | Array<string>> = GAddress extends string[]
  ? Record<GAddress[number], BigNumber>
  : BigNumber;

/**
 * #### Summary
 * Gets your balance in ETH for the given address.
 *
 * ##### Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link provider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param addresses
 * @param options
 * @returns current balance
 */
export const useBalance = <GAddress extends string | Array<string>, GResult = TUseBalanceResult<GAddress>>(
  addresses: GAddress | undefined,
  override: TOverride = mergeDefaultOverride(),
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): [balance: GResult | undefined, update: () => void] => {
  const ethersContext = useEthersContext(override.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, override);

  const keys = [{ ...queryKey, ...providerKey(provider) }, { addresses }] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys) => {
      const { addresses } = keys.queryKey[1];

      if (provider && addresses) {
        if (Array.isArray(addresses)) {
          const result: Record<string, BigNumber> = {};
          await asyncForEach(addresses, async (address: string) => {
            const balance = await provider.getBalance(address);
            result[address] = balance;
          });
          return result;
        } else {
          const address: string = addresses;
          const newBalance = await provider.getBalance(address);
          return newBalance;
        }
      }
      return undefined;
    },
    {
      // isDataEqual: (oldResult, newResult) => oldResult?._hex === newResult._hex,
      ...options.query,
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data as unknown as GResult | undefined, refetch];
};
