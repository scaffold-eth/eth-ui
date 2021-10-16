import { Contract, Event } from '@ethersproject/contracts';
import { useState, useEffect, useCallback, useMemo } from 'react';

import { TEthersProvider } from '~~/models';

const getEventKey = (m: Event): string => {
  return `${m.transactionHash}_${m.logIndex}`;
};

/**
 * Enables you to keep track of events
 *
 * ~ Features ~
  - Provide readContracts by loading contracts (see more on ContractLoader.js)
  - Specify the name of the contract, in this case it is "YourContract"
  - Specify the name of the event in the contract, in this case we keep track of "SetPurpose" event
  - Specify the provider
 * @param contracts (Record<string, Contract>) :: record of current contractname/contract
 * @param contractName (string) :: name of the contract you are interested in
 * @param eventName (string) :: name of the event
 * @param provider (TEthersProvider)
 * @param startBlock (number) string block of events
 * @returns (ethers->Event)
 */
export const useEventListener = (
  contracts: Record<string, Contract>,
  contractName: string,
  eventName: string,
  provider: TEthersProvider,
  startBlock: number
): Event[] => {
  const [eventMap, setEventMap] = useState<Map<string, Event>>(new Map<string, Event>());

  const deps = JSON.stringify([...eventMap]);
  const events = useMemo(() => [...eventMap].map((m) => m[1]), [deps]);

  const addNewEvent = useCallback(
    (...listenerArgs: any[]) => {
      if (listenerArgs != null && listenerArgs.length > 0) {
        const newEvent = listenerArgs[listenerArgs.length - 1] as Event;
        if (newEvent.event != null && newEvent.logIndex != null && newEvent.transactionHash != null) {
          const newMap = new Map([[getEventKey(newEvent), newEvent]]);
          setEventMap((oldMap) => new Map([...oldMap, ...newMap]));
        }
      }
    },
    [setEventMap]
  );

  useEffect(() => {
    if (provider) {
      // if you want to read _all_ events from your contracts, set this to the block number it is deployed
      provider.resetEventsBlock(startBlock);
    }
    if (contracts?.[contractName] != null) {
      try {
        contracts[contractName].on(eventName, addNewEvent);
        return (): void => {
          contracts[contractName].off(eventName, addNewEvent);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [provider, startBlock, contracts, contractName, eventName, addNewEvent]);

  return events;
};
