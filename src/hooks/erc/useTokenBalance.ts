import { BigNumber } from '@ethersproject/bignumber';
import { BaseContract } from '@ethersproject/contracts';
import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { contractKey, mergeDefaultUpdateOptions, TRequiredKeys } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const zero = BigNumber.from(0);
const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useTokenBalance' } as const;

type ERC20 = {
  balanceOf: (address: string) => Promise<BigNumber>;
};

/**
 * #### Summary
 * Get the balance of an ERC20 token in an address
 * - uses the ethers.Contract object's provider to access the network
 *
 * ##### ✏️ Notes
 * - uses useOnRepetition
 *
 * @category Hooks
 *
 * @param contract ethers.Contract class
 * @param address
 * @param pollTime if >0 use polling, else use instead of onBlock event
 * @returns
 */
export const useTokenBalance = <GContract extends BaseContract & ERC20>(
  contract: GContract,
  address: string,
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): [balance: BigNumber, update: () => void] => {
  const keys = [{ ...queryKey, ...contractKey(contract) }, { address }] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys): Promise<BigNumber> => {
      const { address } = keys.queryKey[1];

      if (contract?.provider && address) {
        const newBalance: BigNumber = (await contract?.balanceOf?.(address)) ?? zero;
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
