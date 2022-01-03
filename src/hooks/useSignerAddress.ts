import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { providerKey } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { defaultHookOptions, TEthersSigner, THookOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey = { namespace: keyNamespace.signer, key: 'useSignerAddress' } as const;

/**
 * #### Summary
 * Get the address from the signer
 *
 * @category Hooks
 *
 * @param signer
 * @returns
 */
export const useSignerAddress = (
  signer: TEthersSigner | undefined,
  options: THookOptions = defaultHookOptions({ update: { blockNumberInterval: 100 } })
): [address: string | undefined, update: () => void] => {
  const keys = [{ ...queryKey, ...providerKey(signer) }, { signer }] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys) => {
      const { signer } = keys.queryKey[1];
      const address = await signer?.getAddress();
      return address;
    },
    {
      ...options.update.query,
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data, refetch];
};
