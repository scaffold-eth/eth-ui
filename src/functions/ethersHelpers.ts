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
  if (provider?.network?.chainId > 0 && signer?._isSigner) return true;

  return false;
};

export const asEthersAdaptor = (ethersContext: IEthersContext): Readonly<TEthersAdaptor> => {
  return {
    provider: ethersContext.provider,
    signer: ethersContext.signer,
    chainId: ethersContext.chainId,
    account: ethersContext.account,
  } as const;
};

export const checkEthersOverride = (context: IEthersContext, options: THookOptions): Readonly<TEthersAdaptor> => {
  if (options.adaptorOverrride?.enabled) {
    invariant(
      options.adaptorOverrride != null && options.alternateContextOverride != null,
      'You cannot use both contextOverride and contextKey at the same time'
    );

    if (options.adaptorOverrride) {
      return options.adaptorOverrride.adaptor ?? {};
    }
  }

  return asEthersAdaptor(context);
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
  if (ethersAdaptor != null && ethersAdaptor.chainId != null) {
    if (ethersAdaptor.provider != null || (ethersAdaptor.signer != null && !!ethersAdaptor.account)) return true;
  }
  return false;
};
