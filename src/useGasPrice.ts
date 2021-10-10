import { FeeData } from '@ethersproject/providers';
import axios, { AxiosResponse } from 'axios';
import { utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useEthersContext } from '~~/context';
import { useBlockNumberContext } from '~~/context/BlockNumberContext';
import { TNetworkInfo } from '~~/models';

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
  currentNetwork?: TNetworkInfo
): number | undefined => {
  const { ethersProvider } = useEthersContext();
  const blockNumber = useBlockNumberContext();
  const [currentChainId, setCurrentChainId] = useState<number>();
  const [gasPrice, setGasPrice] = useState<number | undefined>();
  const [gasPriceDebounced] = useDebounce(gasPrice, 250, { trailing: true });

  const callFunc = useCallback((): void => {
    if (currentChainId !== chainId) {
      setCurrentChainId(chainId);
      setGasPrice(undefined);
    }

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
    } else if (ethersProvider) {
      void ethersProvider
        .getFeeData()
        .then((fee: FeeData) => {
          const price = fee.gasPrice ?? fee.maxFeePerGas;
          if (price && price?.toBigInt() > 0) {
            const result = parseInt(utils.formatUnits(price, 'gwei')) ?? 0;
            setGasPrice(result);
          } else if (currentNetwork?.gasPrice) {
            setGasPrice(currentNetwork.gasPrice);
          } else {
            setGasPrice(undefined);
          }
        })
        .catch((_error) => {
          console.log('⚠ Could not estimate gas!');
          if (currentNetwork?.gasPrice) {
            setGasPrice(currentNetwork.gasPrice);
          } else {
            setGasPrice(undefined);
          }
        });
    } else if (currentNetwork?.gasPrice) {
      setGasPrice(currentNetwork.gasPrice);
    } else {
      setGasPrice(undefined);
    }
  }, [currentChainId, chainId, ethersProvider, currentNetwork?.gasPrice, speed]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);
  return gasPriceDebounced;
};
