import { EventFilter, BaseContract } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { contractKey, mergeDefaultUpdateOptions, TRequiredKeys } from '~~/functions';
import { const_blockNumberIntervalMedium, TUpdateOptions, TypedEvent } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey: TRequiredKeys = { namespace: keyNamespace.contracts, key: 'useEventListener' } as const;
/**
 * #### Summary
 * Tracks the events of associated with a contract
 *
 * ##### Notes
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
  options: TUpdateOptions = mergeDefaultUpdateOptions({ ...const_blockNumberIntervalMedium })
): [eventMap: GTypedEvent[], queryEvents: () => void] => {
  const keys = [
    {
      ...queryKey,
      ...contractKey(contract),
    },
    {
      eventFilter,
      startBlock,
      toBlock,
    },
  ] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys): Promise<GTypedEvent[]> => {
      {
        const { eventFilter: eventFilter_, startBlock: startBlock_, toBlock: toBlock_ } = keys.queryKey[1];
        const result = await contract?.queryFilter(eventFilter_ as EventFilter, startBlock_, toBlock_);
        return (result as GTypedEvent[]) ?? [];
      }
    },
    {
      ...options.query,
    }
  );

  // update the result when ethers calls the event listner
  useEffect(() => {
    if (eventFilter != null) {
      const listener = (): void => {
        void refetch();
      };
      try {
        contract?.on(eventFilter, listener);
        return (): void => {
          contract?.off(eventFilter, listener);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [contract, eventFilter, refetch]);

  // const blockNumber = useBlockNumberContext();
  // useEthersUpdater(refetch, blockNumber, options);

  return [data ?? [], refetch];
};
