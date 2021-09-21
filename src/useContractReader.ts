import { Contract, ContractFunction } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import { useOnRepetition } from '~~/useOnRepetition';

const DEBUG = false;

/**
 * Enables you to call functions in contracts and read their values.  It helps keep track of them in the local React states
 * 
  ~ Features ~
  - Provide readContracts by loading contracts (see more on ContractLoader.js)
  - Specify the name of the contract, in this case it is "YourContract"
  - Specify the name of the variable in the contract, in this case we keep track of "purpose" variable
  - Pass an args array if the function requires
  - Pass pollTime - if no pollTime is specified, the function will update on every new block
 * @param contracts (Record<string, Contract>) :: a record of contractName/contract
 * @param contractName (string) :: The contract name
 * @param functionName (string) :: The function name in the contract
 * @param functionArgs (any[]) :: arguments to functions
 * @param pollTime (number) :: optional :: if >0 use polling, else use instead of onBlock event
 * @param formatter ((_value: T) => T) :: optional :: function to format the result
 * @param onChange (string) :: optional :: callback to call with the function
 * @returns (<T>) :: generic return type 
 */
export const useContractReader = <T>(
  contracts: Record<string, Contract>,
  contractName: string,
  functionName: string,
  functionArgs: any[] = [],
  pollTime?: number,
  formatter?: (_value: T) => T,
  onChange?: (_value?: T) => void
): T | undefined => {
  const [value, setValue] = useState<T>();
  useEffect(() => {
    if (typeof onChange === 'function') {
      setTimeout(onChange.bind(this, value), 1);
    }
  }, [value, onChange]);

  const updateValue = useCallback(async (): Promise<void> => {
    try {
      const contractFunction = contracts?.[contractName]?.[functionName] as ContractFunction<T>;
      let newValue: T;
      if (DEBUG) console.log('CALLING ', contractName, functionName, 'with args', functionArgs);

      if (contractFunction) {
        if (functionArgs && functionArgs.length > 0) {
          newValue = await contractFunction(...functionArgs);
          if (DEBUG)
            console.log(
              'contractName',
              contractName,
              'functionName',
              functionName,
              'functionArgs',
              functionArgs,
              'RESULT:',
              newValue
            );
        } else {
          newValue = await contractFunction();
        }
        if (formatter && typeof formatter === 'function') {
          newValue = formatter(newValue);
        }
        setValue(newValue);
      }
    } catch (e) {
      console.log(e);
    }
  }, [contracts, contractName, functionName, functionArgs, formatter]);

  useOnRepetition(
    updateValue,
    {
      pollTime,
      leadingTrigger: contracts?.[contractName] != null,
      provider: contracts?.[contractName]?.provider,
    },
    functionArgs
  );

  return value;
};
