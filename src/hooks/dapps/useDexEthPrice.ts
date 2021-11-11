import { Token, WETH, Fetcher, Route } from '@uniswap/sdk';
import { useCallback, useState } from 'react';

import { useOnRepetition } from '~~/hooks';
import { TNetworkInfo } from '~~/models';
import { TEthersProvider } from '~~/models/providerTypes';

/**
 * #### Summary
 * Get the Exchange price of ETH/USD (extrapolated from WETH/DAI) from uniswap
 *
 * #### Notes
 * - uses useOnRepetition, does not use context
 *
 * @category Hooks
 *
 * @param mainnetProvider
 * @param targetNetworkInfo
 * @param pollTime if >0 use polling, else use instead of onBlock event
 * @returns price in USD
 */
export const useDexEthPrice = (
  mainnetProvider: TEthersProvider | undefined,
  targetNetworkInfo?: TNetworkInfo,
  pollTime: number = 0
): number => {
  const [price, setPrice] = useState(0);

  const callFunc = useCallback(() => {
    const getPrice = async (): Promise<void> => {
      if (targetNetworkInfo?.price) {
        setPrice(targetNetworkInfo.price);
      } else if (mainnetProvider) {
        const network = await mainnetProvider.getNetwork();

        const DAI = new Token(network ? network.chainId : 1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);
        const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], mainnetProvider);
        const route = new Route([pair], WETH[DAI.chainId]);
        setPrice(parseFloat(route.midPrice.toSignificant(6)));
      } else {
        setPrice(-1);
        console.warn('useDexEthPrice: mainnetProvider or targetNetwork not given');
      }
    };

    void getPrice();
  }, [targetNetworkInfo?.price, mainnetProvider]);

  useOnRepetition(callFunc, { pollTime, provider: mainnetProvider });

  return price;
};
