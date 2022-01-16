import axios from 'axios';
import { utils } from 'ethers';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import { useEthersContext, useBlockNumberContext } from '~~/context';
import {
  ethersOverride,
  mergeDefaultOverride,
  mergeDefaultUpdateOptions,
  processQueryOptions,
  providerKey,
  TRequiredKeys,
} from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { TOverride, TNetworkInfo, TUpdateOptions, keyNamespace, THookResult } from '~~/models';

const queryKey: TRequiredKeys = { namespace: keyNamespace.state, key: 'useGasPrice' } as const;

/**
 * Preset speeds for Eth Gas Station API
    - fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    - fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    - safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    - average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)

    @category Hooks
 */
export type TGasStationSpeed = 'fast' | 'fastest' | 'safeLow' | 'average';

/**
 * #### Summary
 * Gets the gas price for the current network as gwei
 * - uses EthGasStation for mainnet
 * - uses ethers.estimateGas other networks
 * - can use currentNetworkInfo {@link TNetworkInfo.gasPrice} gasPrice as fallback
 *
 * #### Notes
 * - if the gas price is unknown it returns undefined
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param speed
 * @param currentNetworkInfo uses gasPrice as a fallback
 * @returns gas as gwei
 */
export const useGasPrice = (
  chainId: number | undefined,
  speed: TGasStationSpeed,
  currentNetworkInfo?: TNetworkInfo,
  override: TOverride = mergeDefaultOverride(),
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<number | undefined> => {
  const ethersContext = useEthersContext(override.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, override);

  const keys = [
    { ...queryKey, ...providerKey(provider) },
    { chainId, speed, currentNetworkInfo },
  ] as const;
  const { data, refetch, isError, status } = useQuery(
    keys,
    async (keys): Promise<number | undefined> => {
      const { chainId, speed, currentNetworkInfo } = keys.queryKey[1];
      if (!chainId) {
        return undefined;
      } else if (chainId === 1) {
        if (navigator?.onLine) {
          const gweiFactor = 10;
          const response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
          const result: Record<string, any> = (response.data as Record<string, any>) ?? {};
          let newGasPrice: number | undefined = result[speed] / gweiFactor;
          if (!newGasPrice) newGasPrice = result['fast'] / gweiFactor;
          return newGasPrice;
        }
      } else if (provider) {
        const fee = await provider.getFeeData();
        const price = fee.gasPrice ?? fee.maxFeePerGas;
        if (price && price?.toBigInt() > 0) {
          const result = parseInt(utils.formatUnits(price, 'gwei')) ?? 0;
          return result;
        }
      }

      if (currentNetworkInfo?.gasPrice) {
        return currentNetworkInfo.gasPrice;
      }
      return undefined;
    },
    {
      ...processQueryOptions<number | undefined>(options),
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  const result = isError ? undefined : data;
  const [gasPriceDebounced] = useDebounce(result, 250, { trailing: true });
  return [gasPriceDebounced, refetch, status];
};
