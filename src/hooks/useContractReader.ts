import { BaseContract, ContractFunction, EventFilter } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext, useBlockNumberContext } from '~~/context';
import { contractFuncKey, ethersOverride, mergeDefaultOverride, mergeDefaultUpdateOptions } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { TContractFunctionInfo, TOverride, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey = { namespace: keyNamespace.contracts, key: 'useContractReader' } as const;

/**
 * #### Summary
 * Enables you to call a contract function with arguments and receive the output.  You can use this to easily track of contract outputs in react states
 *
 * ##### ✏️ Notes
 * - uses the ethers.Contract object's provider to access the network
 * - formatter is a function that can change the format of the output
 * @param contract
 * @param contractFunc
 * @param args
 * @param options
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
): [value: Awaited<ReturnType<GContractFunc>> | undefined, update: () => void] => {
  const keys = [
    {
      ...queryKey,
      ...contractFuncKey(contract, contractFunc),
    },
    { args: args ?? [], funcEventFilter },
  ] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys) => {
      const { args } = keys.queryKey[1];

      if (contractFunc != null && contract != null) {
        const result = await contractFunc(...args);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result;
      }

      return undefined;
    },
    {
      ...options.query,
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

  return [data, refetch];
};

/**
 * #### Summary
 * Enables you to call a contract function with arguments and receive the output.  You can use this to easily track of contract outputs in react states
 *
 * ##### ✏️ Notes
 * - uses the ethers.Contract object's provider to access the network
 * - formatter is a function that can change the format of the output
 *
 * @category Hooks
 *
 * @template OutputT return type
 * @param contract ethers.Contract class
 * @param contractFunctionInfo
 * @param formatter <OutputT> a function that can format the output
 * @param onChange callback with result as a parameter
 * @returns <OutputT>
 */
export const useContractReaderUntyped = <GOutput>(
  contract: BaseContract,
  contractFunctionInfo: TContractFunctionInfo,
  formatter?: (_value: GOutput | undefined) => GOutput,
  onChange?: (_value?: GOutput) => void,
  override: TOverride = mergeDefaultOverride()
): GOutput | undefined => {
  const isMounted = useIsMounted();
  const [value, setValue] = useState<GOutput>();
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext(override.alternateContextKey);
  const { chainId } = ethersOverride(ethersContext, override);

  const callContractFunction = useCallback(async () => {
    const contractFunction = contract.functions?.[contractFunctionInfo.functionName] as ContractFunction<GOutput>;
    let result: GOutput | undefined = undefined;
    try {
      if (contractFunctionInfo.functionArgs && contractFunctionInfo.functionArgs.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        result = await contractFunction?.(...contractFunctionInfo.functionArgs);
      } else {
        result = await contractFunction?.();
      }
    } catch (error: any) {
      console.warn('Could not read from contract function', contractFunctionInfo);
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, contractFunctionInfo.functionArgs, contractFunctionInfo.functionName]);

  const contractProvider = contract?.provider;

  const callFunc = useCallback(async () => {
    const contractChainId = (await contractProvider?.getNetwork())?.chainId;
    if (callContractFunction != null && contractChainId === chainId && contractProvider != null && chainId != null) {
      try {
        let newResult: GOutput | undefined = await callContractFunction();
        if (
          Array.isArray(newResult) &&
          newResult.length === 1 &&
          (typeof newResult[0] === 'string' || typeof newResult[0] === 'number')
        ) {
          // @ts-ignore
          newResult = newResult[0];
        }

        if (formatter != null) {
          newResult = formatter(newResult);
        }

        if (isMounted()) {
          setValue((value) => {
            if (!Object.is(value, newResult) && JSON.stringify(value) !== JSON.stringify(newResult)) {
              return newResult;
            }
            return value;
          });
          onChange?.(newResult);
        }
      } catch (error: any) {
        console.warn(error);
      }
    }
  }, [contractProvider, callContractFunction, chainId, formatter, isMounted, onChange]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);

  return value;
};
