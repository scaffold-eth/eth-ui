import { Token, WETH, Fetcher, Route } from '@uniswap/sdk';
import { useCallback, useState } from 'react';

import { useOnRepetition } from '~~';
import { TNetworkInfo } from '~~/models';
import { TEthersProvider } from '~~/models/providerTypes';

/**
 * Get the Exchange price of ETH/USD (extrapolated from WETH/DAI)
 * @param targetNetwork (TNetwork)
 * @param mainnetProvider (TEthersProvider)
 * @param pollTime (number) :: if >0 use polling, else use instead of onBlock event
 * @returns (number) :: price
 */
export const useDexEthPrice = (
  targetNetwork: TNetworkInfo,
  mainnetProvider: TEthersProvider,
  pollTime: number = 0
): number => {
  const [price, setPrice] = useState(0);

  const pollPrice = useCallback(() => {
    const getPrice = async (): Promise<void> => {
      if (!mainnetProvider) {
        return;
      } else if (targetNetwork.price) {
        setPrice(targetNetwork.price);
      } else {
        const network = await mainnetProvider.getNetwork();

        const DAI = new Token(network ? network.chainId : 1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);
        const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], mainnetProvider);
        const route = new Route([pair], WETH[DAI.chainId]);
        setPrice(parseFloat(route.midPrice.toSignificant(6)));
      }
    };

    void getPrice();
  }, [targetNetwork.price, mainnetProvider]);

  useOnRepetition(pollPrice, { pollTime, provider: mainnetProvider });

  return price;
};