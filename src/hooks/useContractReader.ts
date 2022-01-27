import { BaseContract, EventFilter } from 'ethers';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { contractFuncKey, mergeDefaultUpdateOptions, processQueryOptions } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { THookResult, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey = { namespace: keyNamespace.contracts, key: 'useContractReader' } as const;

/**
 * #### Summary
 * Enables you to call a contract function with arguments and receive the output.  You can use this to easily track of contract outputs in react states
 *
 * ##### ✏️ Notes
 * - uses the ethers.Contract object's provider to access the network
 * - formatter is a function that can change the format of the output
 * @param contract Contract reading from
 * @param contractFunc Contract variable or function to read
 * @param args Typed tuple argument to contract function or variable
 * @param funcEventFilter Optional if only want contract to update on event
 * @param options Options for how often and when to update
 * @returns
 */
export const useContractReader = <
  GContract extends BaseContract,
  GContractFunc extends (...args: any[]) => Promise<any>
>(
  contract: GContract | undefined,
  contractFunc: GContractFunc | undefined,
  args?: Parameters<GContractFunc>,
  funcEventFilter?: EventFilter | undefined,
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<Awaited<ReturnType<GContractFunc>> | undefined> => {
  const keys = [
    {
      ...queryKey,
      ...contractFuncKey(contract, contractFunc),
    },
    { args: args ?? [], funcEventFilter },
  ] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<Awaited<ReturnType<GContractFunc>> | undefined> => {
      const { args } = keys.queryKey[1];

      if (contractFunc != null && contract != null) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result = await contractFunc(...args);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result;
      }

      return undefined;
    },
    {
      ...processQueryOptions<Awaited<ReturnType<GContractFunc>> | undefined>(options),
    }
  );

  /**
   * event based updates:
   * you can use an event and only call the contract when there is an event
   */
  useEffect(() => {
    if (funcEventFilter != null) {
      const listener = (): void => {
        void refetch();
      };
      try {
        contract?.on(funcEventFilter, listener);
        return (): void => {
          contract?.off(funcEventFilter, listener);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [contract, funcEventFilter, refetch]);

  const blockNumber = useBlockNumberContext();
  /**
   * if event based updates is on, interval updates are disabled
   */
  const allowBlockNumberIntervalUpdate = funcEventFilter == null;
  useEthersUpdater(refetch, blockNumber, options, allowBlockNumberIntervalUpdate);

  return [data, refetch, status];
};
