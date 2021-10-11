import { Contract, Event } from '@ethersproject/contracts';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';

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
 * @param startBlock (number) starting block
 * @returns (ethers->Event)
 */
export const useEventListener = (contract: Contract | undefined, eventName: string, startBlock: number): Event[] => {
  const isMounted = useIsMounted();
  const { ethersProvider } = useEthersContext();

  const [eventMap, setEventMap] = useState<Map<string, Event>>(new Map<string, Event>());
  const deps = JSON.stringify([...eventMap]);
  const events = useMemo(() => [...eventMap].map((m) => m[1]), [deps]);

  const addNewEvent = useCallback(
    (events: Event[]) => {
      if (events != null && events.length > 0) {
        const newMap = new Map(events.map((m) => [getEventKey(m), m]));
        if (isMounted()) setEventMap((oldMap) => new Map([...oldMap, ...newMap]));
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
