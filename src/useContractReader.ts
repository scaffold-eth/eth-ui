import { Contract, ContractFunction } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { useBlockNumberContext } from '~~/context/BlockNumberContext';
import { TContractFunctionInfo } from '~~/models';

/**
 * #### Summary
 * Enables you to call a contract function with arguments and receive the output.  You can use this to easily track of contract outputs in react states
 *
 * #### Notes
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
export const useContractReader = <OutputT>(
  contract: Contract,
  contractFunctionInfo: TContractFunctionInfo,
  formatter?: (_value: OutputT) => OutputT,
  onChange?: (_value?: OutputT) => void
): OutputT | undefined => {
  const isMounted = useIsMounted();
  const [value, setValue] = useState<OutputT>();
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext();

  const callFunc = useCallback(async () => {
    const contractFunction = contract?.[contractFunctionInfo.functionName] as ContractFunction<OutputT>;
    const contractChainId = await contract?.signer?.getChainId();

    if (contractFunction != null && contractChainId === ethersContext.chainId) {
      let newResult: OutputT | undefined = undefined;
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
