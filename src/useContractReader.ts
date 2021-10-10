import { Contract, ContractFunction } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { useBlockNumberContext } from '~~/context/BlockNumberContext';
import { TContractFunctionInfo } from '~~/models';

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
 * @param contractList (Record<string, Contract>) :: a record of contractName/contract
 * @param contractName (string) :: The contract name
 * @param functionName (string) :: The function name in the contract
 * @param functionArgs (any[]) :: arguments to functions
 * @param pollTime (number) :: optional :: if >0 use polling, else use instead of onBlock event
 * @param formatter ((_value: T) => T) :: optional :: function to format the result
 * @param onChange (string) :: optional :: callback to call with the function
 * @returns (<T>) :: generic return type 
 */
export const useContractReader = <T>(
  contract: Contract,
  contractFunctionInfo: TContractFunctionInfo,
  formatter?: (_value: T) => T,
  onChange?: (_value?: T) => void
): T | undefined => {
  const isMounted = useIsMounted();
  const [value, setValue] = useState<T>();
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext();

  const callFunc = useCallback(async () => {
    const contractFunction = contract?.[contractFunctionInfo.functionName] as ContractFunction<T>;
    const contractChainId = await contract?.signer?.getChainId();

    if (contractFunction != null && contractChainId === ethersContext.chainId) {
      let newResult: T | undefined = undefined;
      try {
        if (contractFunctionInfo.functionArgs && contractFunctionInfo.functionArgs.length > 0) {
          newResult = await contractFunction?.(...contractFunctionInfo.functionArgs);
        } else {
          newResult = await contractFunction?.();
        }

        if (formatter != null) {
          newResult = formatter(newResult);
        }

        if (isMounted()) {
          setValue(newResult);
          onChange?.(newResult);
        }
      } catch (error: any) {
        console.warn('Could not read form contract function', contractFunctionInfo);
        console.warn(error);
      }
    }
  }, [contract, contractFunctionInfo, ethersContext.chainId, formatter, isMounted, onChange]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);

  return value;
};
