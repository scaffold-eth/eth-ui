// import { useBalance } from 'eth-hooks';
import { BigNumber, utils } from 'ethers';
import { useState } from 'react';

export interface EthBalanceProps {
  address: string;
  price?: number;
  balance?: BigNumber;
  dollarMultiplier?: number;
}

export interface EthBalanceResult {
  balance: string;
  toggleMode: () => void;
}

export const useEthBalance = (props: EthBalanceProps): EthBalanceResult => {
  const [dollarMode, setDollarMode] = useState(true);
  // const [userBalance] = useBalance(props.address);
  // hack to get monorepo done
  const userBalance = [3];

  let resolvedBalance = BigNumber.from(userBalance ?? 0);
  if (userBalance != null) {
    resolvedBalance = BigNumber.from(userBalance);
  }

  let floatBalance = parseFloat('0.00');
  if (resolvedBalance) {
    const etherBalance = utils.formatEther(resolvedBalance);
    floatBalance = parseFloat(etherBalance);
  }

  let balance = floatBalance.toFixed(4);
  const price = props.price ?? props.dollarMultiplier;
  if (price && dollarMode) {
    balance = `$${(floatBalance * price).toFixed(2)}`;
  }

  const toggleMode = (): void => {
    setDollarMode(!dollarMode);
  };

  return {
    balance,
    toggleMode,
  };
};
