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

  const [eventMap, setEventMap] = useState<Map<string, Event>>(new Map<string, Event>());
  const deps = JSON.stringify([...eventMap]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events: TypedEvent<Result>[] = useMemo(
    () => [...eventMap].map((m) => m[1] as unknown as TypedEvent<Result>),
    [deps]
  );

  const addNewEvent = useCallback(
    (...listenerArgs: Event[]) => {
      if (listenerArgs != null && listenerArgs.length > 0) {
        const newEvent = listenerArgs[listenerArgs.length - 1];
        if (newEvent.event != null && newEvent.logIndex != null && newEvent.transactionHash != null) {
          const newMap = new Map([[getEventKey(newEvent), newEvent]]);
          if (isMounted()) setEventMap((oldMap) => new Map([...oldMap, ...newMap]));
        }
      }
    },
    [isMounted]
  );

  useEffect(() => {
    if (ethersProvider) {
      // if you want to read _all_ events from your contracts, set this to the block number it is deployed
      // NOTE: this is depcrecated
      ethersProvider.resetEventsBlock(startBlock);
    }

    try {
      contract?.on(eventName, addNewEvent);
      return (): void => {
        contract?.off(eventName, addNewEvent);
      };
    } catch (e) {
      console.log(e);
    }
  }, [addNewEvent, contract, ethersProvider, eventName, startBlock]);

  return events;
};
