import { BigNumber } from 'ethers';
import { useState, useCallback, useEffect } from 'react';

import { useEthersContext } from '~~/context';
import { useBlockNumberContext } from '~~/context/BlockNumberContext';
import { useMounted } from '~~/helpers/hooks/useMounted';

const zero = BigNumber.from(0);

/**
 * Gets your balance in ETH from given address and provider
 *   
 * ~ Features ~
  - Provide address and get balance corresponding to given address
  - Change provider to access balance on different chains (ex. mainnetProvider)
  - If no pollTime is passed, the balance will update on every new block
 * @param ethersProvider (ethers->Provider)
 * @param address (string)
 * @param pollTime (number) :: if >0 use polling, else use instead of onBlock event
 * @returns (Bignumber) ::  current balance
 */
export const useBalance = (address: string, providerKey?: string): BigNumber => {
  const isMounted = useMounted();
  const { ethersProvider } = useEthersContext(providerKey);
  const blockNumber = useBlockNumberContext();
  const [balance, setBalance] = useState<BigNumber>(zero);

  const callFunc = useCallback(async (): Promise<void> => {
    if (ethersProvider && address) {
      const newBalance = await ethersProvider.getBalance(address);
      if (isMounted()) {
        setBalance((value) => {
          if (value.toHexString() !== newBalance.toHexString()) return newBalance;
          return value;
        });
      }
    }
  }, [address, ethersProvider, isMounted]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);

  return balance ?? zero;
};
