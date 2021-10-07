import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { useCallback, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useOnRepetition } from '~~/useOnRepetition';

const zero = BigNumber.from(0);
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
export const useTokenBalance = (contract: Contract, address: string, pollTime: number = 0): BigNumber => {
  const isMounted = useIsMounted();
  const [balance, setBalance] = useState<BigNumber>(zero);

  const pollBalance = useCallback(async (): Promise<void> => {
    if (contract != null) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const newBalance: BigNumber = (await contract?.balanceOf?.(address)) ?? zero;
        if (isMounted()) {
          setBalance((value) => {
            if (value.toHexString() !== newBalance.toHexString()) return newBalance;
            return value;
          });
        }
      } catch (e) {
        console.log('⚠ Could not get token balance', e);
      }
    }
  }, [address, contract, isMounted]);

  useOnRepetition(pollBalance, { pollTime, leadingTrigger: contract?.provider != null, provider: contract.provider });

  return balance;
};
