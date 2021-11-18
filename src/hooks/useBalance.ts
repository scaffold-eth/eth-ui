import { BigNumber } from 'ethers';
import { useState, useCallback, useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext, useBlockNumberContext } from '~~/context';

const zero = BigNumber.from(0);
/**
 * #### Summary
 * Gets your balance in ETH for the given address.
 *
 * #### Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
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
          if (value.toHexString() !== newBalance?.toHexString()) {
            return newBalance;
          }
          return value;
        });
      }
    }
  }, [address, ethersProvider, isMounted]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);

  return balance;
};
