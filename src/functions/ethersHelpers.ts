import { Web3Provider, StaticJsonRpcProvider, JsonRpcProvider } from '@ethersproject/providers';

/**
 * #### Summary
 * Is it a ethers compatable provider
 *
 * @category Functions
 *
 * @param providerBase
 * @returns
 */
export const isEthersProvider = (providerBase: unknown): boolean => {
  return (
    providerBase instanceof Web3Provider ||
    providerBase instanceof StaticJsonRpcProvider ||
    providerBase instanceof JsonRpcProvider
  );
};
