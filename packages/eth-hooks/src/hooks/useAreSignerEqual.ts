import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { mergeDefaultUpdateOptions, processQueryOptions, providerKey, signerHasNetwork } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { keyNamespace, TEthersSigner, THookResult, TUpdateOptions } from '~~/models';

const queryKey = { namespace: keyNamespace.signer, key: 'useAreSignerEqual' } as const;

/**
 * #### Summary
 * Are the signers equal and valid
 *
 * @category Hooks
 *
 * @param signer1 Object for first signer to compare
 * @param signer2 Object for second signer to compare
 * @param options Options for how often and when to update
 * @returns
 */
export const useAreSignerEqual = (
  signer1: TEthersSigner | undefined,
  signer2: TEthersSigner | undefined,
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<boolean | undefined> => {
  const keys = [{ ...queryKey }, { singer1Key: providerKey(signer1), signer2Key: providerKey(signer2) }] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (_keys): Promise<boolean | undefined> => {
      if (signerHasNetwork(signer1)) {
        const chainId1 = await signer1?.getChainId();
        const chainId2 = await signer2?.getChainId();

        const address1 = await signer1?.getAddress();
        const address2 = await signer2?.getAddress();
        const isEqual =
          address1 === address2 && chainId1 === chainId2 && address1 !== undefined && chainId1 !== undefined;
        return isEqual;
      }
      return undefined;
    },
    {
      ...processQueryOptions<boolean | undefined>(options),
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data, refetch, status];
};
