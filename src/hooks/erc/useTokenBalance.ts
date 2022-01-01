import { BigNumber } from '@ethersproject/bignumber';
import { BaseContract } from '@ethersproject/contracts';
import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useBlockNumberContext, useEthersContext } from '~~/context';
import { checkEthersOverride } from '~~/functions';
import { useAreSignerEqual } from '~~/hooks';
import { defaultHookOptions, THookOptions } from '~~/models';

const zero = BigNumber.from(0);

type ERC20 = {
  balanceOf: (address: string) => Promise<BigNumber>;
};

/**
 * Get the balance of an ERC20 token in an address
 * 
 * ~ Features ~
  - Provide address and get balance corresponding to given address
  - Change provider to access balance on different chains (ex. mainnetProvider)
  - If no pollTime is passed, the balance will update on every new block
 * @param contract (ethers->Contract) contract object for the ERC20 token
 * @param address (string)
 * @param pollTime (number) :: if >0 use polling, else use instead of onBlock event
 * @returns (BigNumber) :: balance
 */

/**
 * #### Summary
 * Get the balance of an ERC20 token in an address
 * - uses the ethers.Contract object's provider to access the network
 *
 * #### Notes
 * - uses useOnRepetition
 *
 * @category Hooks
 *
 * @param contract ethers.Contract class
 * @param address
 * @param pollTime if >0 use polling, else use instead of onBlock event
 * @returns
 */
export const useTokenBalance = <GContract extends BaseContract & ERC20>(
  contract: GContract,
  address: string,
  options: THookOptions = defaultHookOptions()
): [balance: BigNumber, update: () => void] => {
  const isMounted = useIsMounted();
  const [balance, setBalance] = useState<BigNumber>(zero);

  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext(options.alternateEthersContextKey);
  const { signer } = checkEthersOverride(ethersContext, options);

  const validSigners = useAreSignerEqual(contract.signer, signer);

  const update = useCallback(async (): Promise<void> => {
    if (contract != null) {
      try {
        if (validSigners) {
          const newBalance: BigNumber = (await contract?.balanceOf?.(address)) ?? zero;
          if (isMounted()) {
            setBalance((value) => {
              if (value.toHexString() !== newBalance.toHexString()) return newBalance;
              return value;
            });
          }
        }
      } catch (e) {
        console.log('⚠ Could not get token balance', e);
      }
    }
  }, [contract, validSigners, address, isMounted]);

  useEffect(() => {
    void update();
  }, [blockNumber, update]);

  return [balance, update];
};
