import { Contract, EventFilter, Event } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { TypedEvent } from '~~/models';

const getEventKey = (m: Event): string => {
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
  const { ethersProvider } = useEthersContext();

  const [eventMap, setEventMap] = useState<Map<string, Event>>();
  const deps = JSON.stringify([...(eventMap ?? []).keys()]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events: TypedEvent<Result>[] = useMemo(
    () => [...(eventMap ?? [])].map((m) => m[1] as unknown as TypedEvent<Result>),
    [deps]
  );

  const addNewEvent = useCallback(
    (...listenerArgs: Event[]) => {
      void (async (): Promise<void> => {
        if (listenerArgs != null && listenerArgs.length > 0) {
          const result = await contract?.queryFilter(eventName as EventFilter, startBlock);
          if (isMounted() && result) {
            const mapResult = new Map(result?.map((m) => [getEventKey(m), m]));
            setEventMap(mapResult);
          }
        }
      })();
    },
    [contract, eventName, isMounted, startBlock]
  );

  // get the events on initial load of hooks, without waiting for the next event
  useEffect(() => {
    if (contract?.queryFilter != null && setEventMap && (eventMap == null || eventMap?.size === 0)) {
      contract?.queryFilter(eventName as EventFilter, startBlock).then((result) => {
        if (isMounted() && result) {
          const mapResult = new Map(result?.map((m) => [getEventKey(m), m]));
          setEventMap(mapResult);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.queryFilter]);

  useEffect(() => {
    try {
      contract?.on(eventName, addNewEvent);
      return (): void => {
        contract?.off(eventName, addNewEvent);
      };
    } catch (e) {
      console.log(e);
    }
  }, [addNewEvent, contract, eventName]);

  return events;
};
