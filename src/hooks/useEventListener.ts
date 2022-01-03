import { EventFilter, BaseContract } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { providerKey } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { defaultHookOptions, TEthersProvider, THookOptions, TypedEvent } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey = { namespace: keyNamespace.contracts, key: 'useEventListener' } as const;
/**
 * #### Summary
 * Tracks the events of associated with a contract
 *
 * #### Notes
 * - updates triggered through ethers event listener
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param contract ethers.Contract
 * @param eventName
 * @param startBlock
 * @returns
 */
export const useEventListener = <GTypedEvent extends TypedEvent<Result>>(
  contract: BaseContract | undefined,
  eventFilter: string | EventFilter | undefined,
  startBlock: number,
  toBlock: number | undefined = undefined,
  options: THookOptions = defaultHookOptions({ update: { blockNumberInterval: 100 } })
): [eventMap: GTypedEvent[], queryEvents: () => void] => {
  const keys = [
    {
      ...queryKey,
      ...providerKey(contract?.provider as TEthersProvider),
      address: contract?.address,
    },
    { contract, eventFilter },
  ] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys): Promise<GTypedEvent[]> => {
      const { contract } = keys.queryKey[1];
      {
        const result = await contract?.queryFilter(eventFilter as EventFilter, startBlock, toBlock);
        return (result as GTypedEvent[]) ?? [];
      }
    },
    {
      ...options.update.query,
    }
  );

  // update the result when ethers calls the event listner
  useEffect(() => {
    if (eventFilter != null) {
      try {
        contract?.on(eventFilter, () => refetch);
        return (): void => {
          contract?.off(eventFilter, () => refetch);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [contract, eventFilter, refetch]);

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? [], refetch];
};
