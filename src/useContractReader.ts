import { Contract, ContractFunction } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { useBlockNumberContext } from '~~/context/BlockNumberContext';

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
  contractList: Record<string, Contract>,
  contract: { contractName: string; functionName: string; functionArgs?: any[] },
  formatter?: (_value: T) => T,
  onChange?: (_value?: T) => void,
  providerKey?: string
): T | undefined => {
  const isMounted = useIsMounted();
  const [value, setValue] = useState<T>();
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext(providerKey);

  const callFunc = useCallback(async () => {
    const contractFunction = contractList?.[contract.contractName]?.[contract.functionName] as ContractFunction<T>;
    const contractChainId = await contractList?.[contract.contractName]?.signer?.getChainId();

    if (contractFunction != null && contractChainId === ethersContext.chainId) {
      let newResult: T | undefined = undefined;
      try {
        if (contract.functionArgs && contract.functionArgs.length > 0) {
          newResult = await contractFunction?.(...contract.functionArgs);
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
        console.warn(error);
      }
    }
  }, [
    contractList,
    contract.contractName,
    contract.functionName,
    contract.functionArgs,
    ethersContext.chainId,
    formatter,
    isMounted,
    onChange,
  ]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);

  return value;
};
