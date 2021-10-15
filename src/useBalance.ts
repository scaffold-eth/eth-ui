import { BigNumber } from 'ethers';
import { useState, useCallback, useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { useBlockNumberContext } from '~~/context/BlockNumberContext';

const zero = BigNumber.from(0);
/**
 * Gets your balance in ETH for the given address.
 * - uses the current ethersProvider from context
 * - updates with {@link BlockNumberContext}
 * @category Hooks
 * @param address
 * @returns current balance
 */
export const useBalance = (address: string | undefined): BigNumber => {
  const isMounted = useIsMounted();
  const { ethersProvider } = useEthersContext();
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
