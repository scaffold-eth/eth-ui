import { Token, WETH, Fetcher, Route } from '@uniswap/sdk';
import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { mergeDefaultUpdateOptions, providerKey, TRequiredKeys } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { TNetworkInfo, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';
import { TEthersProvider } from '~~/models/providerTypes';

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useDexEthPrice' } as const;

/**
 * #### Summary
 * Get the Exchange price of ETH/USD (extrapolated from WETH/DAI) from uniswap
 *
 * ##### Notes
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
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): [price: number, update: () => void] => {
  const keys = [{ ...queryKey, ...providerKey(mainnetProvider) }, { networkPrice: targetNetworkInfo?.price }] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys): Promise<number | undefined> => {
      const { networkPrice } = keys.queryKey[1];
      if (networkPrice) {
        return networkPrice;
      } else if (mainnetProvider) {
        const network = await mainnetProvider.getNetwork();

        const DAI = new Token(network ? network.chainId : 1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);
        const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], mainnetProvider);
        const route = new Route([pair], WETH[DAI.chainId]);
        const price = parseFloat(route.midPrice.toSignificant(6));
        return price;
      }
    },
    {
      ...options.query,
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? 0, refetch];
};
