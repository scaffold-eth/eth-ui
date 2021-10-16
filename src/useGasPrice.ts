import { FeeData } from '@ethersproject/providers';
import axios, { AxiosResponse } from 'axios';
import { utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useEthersContext } from '~~/context';
import { useBlockNumberContext } from '~~/context/BlockNumberContext';
import { TNetworkInfo } from '~~/models';

/**
 * Preset speeds for Eth Gas Station API
    - fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    - fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    - safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    - average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
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
  currentNetworkInfo?: TNetworkInfo
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
          } else if (currentNetworkInfo?.gasPrice) {
            setGasPrice(currentNetworkInfo.gasPrice);
          } else {
            setGasPrice(undefined);
          }
        })
        .catch((_error) => {
          console.log('⚠ Could not estimate gas!');
          if (currentNetworkInfo?.gasPrice) {
            setGasPrice(currentNetworkInfo.gasPrice);
          } else {
            setGasPrice(undefined);
          }
        });
    } else if (currentNetworkInfo?.gasPrice) {
      setGasPrice(currentNetworkInfo.gasPrice);
    } else {
      setGasPrice(undefined);
    }
  }, [currentChainId, chainId, ethersProvider, currentNetworkInfo?.gasPrice, speed]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);
  return gasPriceDebounced;
};
