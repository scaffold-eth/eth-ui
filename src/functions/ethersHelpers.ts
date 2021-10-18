import { Web3Provider, StaticJsonRpcProvider, JsonRpcProvider } from '@ethersproject/providers';
import { Signer } from 'ethers';

import { TEthersProvider } from '~~/models';

/**
 * #### Summary
 * Is it a ethers compatable provider
 *
 * @category Helpers
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

export const signerHasNetwork = (signer: Signer | undefined): boolean => {
  const provider = signer?.provider as TEthersProvider;
  if (provider?.anyNetwork) return true;

  return false;
};
