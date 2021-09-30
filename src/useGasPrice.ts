import { FeeData } from '@ethersproject/providers';
import axios, { AxiosResponse } from 'axios';
import { utils } from 'ethers';
import { useCallback, useState } from 'react';

import { TEthersProvider, TNetworkInfo } from '~~/models';
import { useOnRepetition } from '~~/useOnRepetition';

/**
 * Preset speeds for Eth Gas Station
    fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
 */
export type TGasStationSpeed = 'fast' | 'fastest' | 'safeLow' | 'average';

/**
 * Gets the gas price from Eth Gas Station.  as gwei
 * @param speed (TGasStationSpeed) 'fast', 'fastest', 'safeLow', 'average'
 * @param currentNetwork (TNetwork) fallback config with gas price
 * @param pollTime (number) :: if > 0 use polling, else use instead of onBlock event
 * @returns (number) gas price in gwei
 */
export const useGasPrice = (
  chainId: number | undefined,
  speed: TGasStationSpeed,
  provider: TEthersProvider | undefined,
  currentNetwork?: TNetworkInfo,
  pollTime: number = 0
): number | undefined => {
  const [gasPrice, setGasPrice] = useState<number | undefined>();

  const loadGasPrice = useCallback((): void => {
    if (!chainId) {
      setGasPrice(undefined);
    } else if (chainId === 1) {
      if (navigator.onLine) {
        const gweiFactor = 10;
        axios
          .get('https://ethgasstation.info/json/ethgasAPI.json')
          .then((response: AxiosResponse<any>) => {
            const result: Record<string, any> = (response.data as Record<string, any>) ?? {};
            let newGasPrice: number | undefined = result[speed] / gweiFactor;
            if (!newGasPrice) newGasPrice = result['fast'] / gweiFactor;
            setGasPrice(newGasPrice);
          })
          .catch((error) => {
            console.log('⚠ Could not get gas Price!', error);
            setGasPrice(undefined);
          });
      }
    } else if (provider) {
      void provider
        .getFeeData()
        .then((fee: FeeData) => {
          console.log(fee);
          const price = fee.gasPrice ?? fee.maxFeePerGas;
          if (price) {
            const result = parseInt(utils.formatUnits(price, 'gwei')) ?? 0;
            setGasPrice(result);
          } else {
            setGasPrice(undefined);
          }
        })
        .catch((_error) => {
          console.log('⚠ Could not estimate gas!');
          setGasPrice(undefined);
        });
    } else if (currentNetwork?.gasPrice) {
      setGasPrice(currentNetwork.gasPrice);
    } else {
      setGasPrice(undefined);
    }
  }, [chainId, provider, currentNetwork?.gasPrice, speed]);

  useOnRepetition(loadGasPrice, { pollTime, leadingTrigger: true, provider });
  return gasPrice;
};
