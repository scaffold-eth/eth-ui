import { Contract, Event } from '@ethersproject/contracts';
import { useState, useEffect, useCallback } from 'react';

import { TEthersProvider } from '~~/models';

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
  provider: TEthersProvider | undefined,
  startBlock: number
): any[] => {
  const [updates, setUpdates] = useState<Event[]>([]);

  const addNewEvent = useCallback((...events: Event[]) => {
    if (events != null && events.length > 0) {
      const last = events[events.length - 1];
      setUpdates((value) => [last, ...value]);
    }
  }, []);

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

  return updates;
};
