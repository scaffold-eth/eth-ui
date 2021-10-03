import { BigNumber } from 'ethers';
import { useState, useCallback } from 'react';

import { useEthersContext } from '~~/context';
import { useMounted } from '~~/helpers/hooks/useMounted';
import { TEthersProvider } from '~~/models';
import { useOnRepetition } from '~~/useOnRepetition';

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
export const useBalance = (address: string, providerKey?: string, pollTime: number = 0): BigNumber => {
  const isMounted = useMounted();
  const { ethersProvider } = useEthersContext(providerKey);

  const [balance, setBalance] = useState<BigNumber>(zero);

  const pollBalance = useCallback(async (provider?: TEthersProvider, address?: string): Promise<void> => {
    if (provider && address) {
      const newBalance = await provider.getBalance(address);
      if (isMounted()) {
        setBalance((value) => {
          if (value.toHexString() !== newBalance.toHexString()) return newBalance;
          return value;
        });
      }
    }
  }, []);

  const activateLeadingTrigger = address != null && address !== '' && ethersProvider != null;
  useOnRepetition(
    pollBalance,
    { pollTime, provider: ethersProvider, leadingTrigger: activateLeadingTrigger },
    ethersProvider,
    address
  );
  return balance ?? zero;
};
