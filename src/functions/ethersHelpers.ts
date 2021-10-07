import { Web3Provider, StaticJsonRpcProvider, JsonRpcProvider } from '@ethersproject/providers';

export const isEthersProvider = (providerBase: unknown): boolean => {
  return (
    providerBase instanceof Web3Provider ||
    providerBase instanceof StaticJsonRpcProvider ||
    providerBase instanceof JsonRpcProvider
  );
};
