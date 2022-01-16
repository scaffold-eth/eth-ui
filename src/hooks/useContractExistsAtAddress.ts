import { BaseContract, utils } from 'ethers';
import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { contractKey, mergeDefaultUpdateOptions, processQueryOptions, TRequiredKeys } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { THookResult, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey: TRequiredKeys = { namespace: keyNamespace.contracts, key: 'useContractExistsAtAddress' } as const;

/**
 * #### Summary
 * Checks whether a contract exists on the blockchain
 *
 * ##### ✏️ Notes
 * - uses the ethers.Contract object's provider to access the network
 * - checks the contract address to see if the contract is deployed
 *
 * @category Hooks
 *
 * @param contract ethers.BaseContract class
 * @returns
 */
export const useContractExistsAtAddress = (
  contract: BaseContract | undefined,
  options: TUpdateOptions<boolean> = mergeDefaultUpdateOptions()
): THookResult<boolean> => {
  const keys = [{ ...queryKey, ...contractKey(contract) }, { contractAddress: contract?.address }] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<boolean> => {
      const { contractAddress } = keys.queryKey[1];
      /**
       * We can look at the blockchain and see what's stored at `contractAddress`
       * If we find code then we know that a contract exists there.
       * If we find nothing (0x0) then there is no contract deployed to that address
       */
      if (contractAddress != null && utils.isAddress(contractAddress) && contract?.provider != null) {
        const bytecode = await contract.provider.getCode(contractAddress);
        return bytecode !== '0x';
      }
      return false;
    },
    {
      ...processQueryOptions<boolean>(options),
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? false, refetch, status];
};
