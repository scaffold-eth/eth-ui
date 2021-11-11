import { Contract, EventFilter, Event } from 'ethers';
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
export const useEventListener = (
  contract: Contract | undefined,
  eventName: string | EventFilter,
  startBlock: number
): TypedEvent<Result>[] => {
  const isMounted = useIsMounted();

  const [eventMap, setEventMap] = useState<TypedEvent<Result>[]>([]);

  const queryEvents = useCallback(
    (_listenerArgs: Event[]) => {
      void (async (): Promise<void> => {
        const result = await contract?.queryFilter(eventName as EventFilter, startBlock);
        if (isMounted() && result) {
          setEventMap((value) => {
            if (JSON.stringify(value.map(getEventKey)) !== JSON.stringify(result.map(getEventKey))) {
              return result as TypedEvent<Result>[];
            } else {
              return value;
            }
          });
        }
      })();
    },
    [contract, eventName, isMounted, startBlock]
  );

  // // get the events on initial load of hooks, without waiting for the next event
  useEffect(() => {
    if (contract?.queryFilter != null && setEventMap && (eventMap == null || eventMap?.length === 0) && queryEvents) {
      queryEvents([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.queryFilter]);

  useEffect(() => {
    try {
      contract?.on(eventName, queryEvents);
      return (): void => {
        contract?.off(eventName, queryEvents);
      };
    } catch (e) {
      console.log(e);
    }
  }, [queryEvents, contract, eventName]);

  return eventMap;
};
