import {
  Web3Provider,
  StaticJsonRpcProvider,
  JsonRpcProvider,
  JsonRpcBatchProvider,
  UrlJsonRpcProvider,
  WebSocketProvider,
} from '@ethersproject/providers';
import { Signer } from 'ethers';
import invariant from 'tiny-invariant';

import { TEthersProvider } from '~~/models';
import { IEthersContext, TEthersUser, THookOptions } from '~~/models/contextTypes';

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
  if (providerBase == null) return false;
  return (
    providerBase instanceof Web3Provider ||
    providerBase instanceof StaticJsonRpcProvider ||
    providerBase instanceof JsonRpcProvider ||
    providerBase instanceof UrlJsonRpcProvider ||
    providerBase instanceof JsonRpcBatchProvider ||
    providerBase instanceof WebSocketProvider
  );
};

export const signerHasNetwork = (signer: Signer | undefined): boolean => {
  const provider = signer?.provider as TEthersProvider;
  // eslint-disable-next-line no-underscore-dangle
  if (provider?.network?.chainId > 0 && signer?._isSigner) return true;

  return false;
};

export const checkContextOverride = (context: IEthersContext, options: THookOptions): Partial<TEthersUser> => {
  invariant(
    options.contextOverride != null && options.providerKeyOverride != null,
    'You cannot use both contextOverride and contextKey at the same time'
  );

  if (options.contextOverride) {
    return options.contextOverride;
  }

  return {
    provider: context.ethersProvider,
    signer: context.signer,
    chainId: context.chainId,
    account: context.account,
  };
};
