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

import { TEthersProvider, THookOptions, IEthersContext, TEthersAdaptor } from '~~/models';

/**
 * #### Summary
 * Is it a ethers compatable provider, used by {@link EthersModalConnector} and {@link useEthersProvider}
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

export const checkEthersOverride = (context: IEthersContext, options: THookOptions): TEthersAdaptor => {
  if (options.ethersOverride?.enabled) {
    invariant(
      options.ethersOverride != null && options.alternateEthersContextKey != null,
      'You cannot use both contextOverride and contextKey at the same time'
    );

    if (options.ethersOverride) {
      return options.ethersOverride.adaptor;
    }
  }

  return {
    provider: context.provider,
    signer: context.signer,
    chainId: context.chainId,
    account: context.account,
  };
};

export const isValidEthersContext = (ethersContext: IEthersContext | undefined): boolean => {
  if (
    ethersContext != null &&
    ethersContext.chainId != null &&
    ethersContext.provider != null &&
    ethersContext.signer != null &&
    !!ethersContext.account
  )
    return true;
  return false;
};

export const isValidEthersAdaptor = (ethersAdaptor: TEthersAdaptor | undefined): boolean => {
  if (
    ethersAdaptor != null &&
    ethersAdaptor.chainId != null &&
    ethersAdaptor.provider != null &&
    ethersAdaptor.signer != null &&
    !!ethersAdaptor.account
  )
    return true;
  return false;
};
