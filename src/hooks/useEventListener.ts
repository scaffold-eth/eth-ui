import { EventFilter, Event, BaseContract } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { useState, useEffect, useCallback } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { TypedEvent } from '~~/models';

const getEventKey = (m: Event | TypedEvent<Result>): string => {
  return `${m.transactionHash}_${m.logIndex}`;
};

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
  event: string | EventFilter | undefined,
  startBlock: number,
  toBlock?: number
): [eventMap: GTypedEvent[], queryEvents: () => void] => {
  const isMounted = useIsMounted();

  const [eventMap, setEventMap] = useState<GTypedEvent[]>([]);

  const queryEvents = useCallback(
    (_listenerArgs: Event[] = []) => {
      void (async (): Promise<void> => {
        const result = await contract?.queryFilter(event as EventFilter, startBlock, toBlock);
        if (isMounted() && result) {
          setEventMap((value) => {
            if (JSON.stringify(value.map(getEventKey)) !== JSON.stringify(result.map(getEventKey))) {
              return result as GTypedEvent[];
            } else {
              return value;
            }
          });
        }
      })();
    },
    [contract, event, isMounted, startBlock, toBlock]
  );

  // get the events on initial load of hooks, without waiting for the next event
  useEffect(() => {
    if (contract?.queryFilter != null && (eventMap?.length == null || eventMap?.length === 0)) {
      queryEvents?.([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.queryFilter]);

  useEffect(() => {
    if (event != null) {
      try {
        contract?.on(event, queryEvents);
        return (): void => {
          contract?.off(event, queryEvents);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [queryEvents, contract, event]);

  return [eventMap, queryEvents];
};
