import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { cloneElement, FC, useCallback } from 'react';
import { QueryClientProvider } from 'react-query';
import { invariant } from 'ts-invariant';

import { NoEthereumProviderFoundError } from '~~/context';
import { BlockNumberContext } from '~~/context/ethers-app/BlockNumberContext';
import { EthersModalConnector, TEthersModalConnector } from '~~/context/ethers-app/connectors/EthersModalConnector';
import { contextQueryClient as ethersAppQueryClient } from '~~/context/ethers-app/queryClient';
import { mergeDefaultOverride } from '~~/functions';
import { isEthersProvider } from '~~/functions/ethersHelpers';
import { TEthersProvider, TOverride } from '~~/models';
import { IEthersContext } from '~~/models/ethersAppContextTypes';

/**
 * #### Summary
 * This Hook provides you with access to the current Ethers Provider Context.
 * This provider would be the one selected by using {@link EthersModalConnector} and Web3Modal
 *
 * ##### ✨ Features
 * Gives you access to consistent interface to get the current provider information {@link EthersModalConnector}
 * - ethers compatable provider {@link TEthersProvider}
 * - a callback to change the current account (signer)
 * - the current account, chainId and signer
 * - callbacks to open the web3Modal, logout or change theme
 *
 * ##### ✏️ Notes
 * - currently providerKey isnt being used
 *
 * @category EthersAppContext
 *
 * @param contextKey
 * @returns
 */
export const useEthersAppContext = (contextKey?: string): IEthersContext => {
  if (contextKey === 'primary') console.warn('Do not explicitly use primary contextKey, pass in undefined instead');
  const { connector, activate, library, account, deactivate, chainId, ...context } =
    useWeb3React<TEthersProvider>(contextKey);

  if (!(connector instanceof EthersModalConnector || connector instanceof AbstractConnector) && connector != null) {
    throw 'Connector is not a EthersModalConnector';
  }
  const ethersConnector = connector as EthersModalConnector;

  const openModal = useCallback<IEthersContext['openModal']>(
    (ethersModalConnector: TEthersModalConnector | undefined, onError?: (error: Error) => void) => {
      if (context.active) {
        deactivate();
      }

      if (ethersModalConnector == null) {
        invariant.error('A valid ethersModalConnector was not provided');
      }
      if (ethersModalConnector != null) {
        const onActivateError = (error: Error): void => {
          try {
            connector?.deactivate?.();
            console.warn(error);
            onError?.(error);
          } catch {}
        };
        void activate(ethersModalConnector, onActivateError);
      }
    },
    [context.active, deactivate, activate, connector]
  );

  const disconnectModal = useCallback<IEthersContext['disconnectModal']>(
    (onSuccess?: () => void) => {
      ethersConnector.resetModal();
      deactivate();
      onSuccess?.();
    },
    [deactivate, ethersConnector]
  );

  const result: IEthersContext = {
    connector: ethersConnector,
    provider: library,
    activate,
    deactivate,
    library,
    account: account ?? undefined,
    signer: ethersConnector?.getSigner(),
    chainId,
    changeSigner: ethersConnector?.changeSigner.bind(ethersConnector),
    openModal,
    disconnectModal,
    setModalTheme: ethersConnector?.setModalTheme.bind(ethersConnector),
    ...context,
  };

  return result;
};

/**
 * @deprecated Please use useEthersAppContext instead, this is a shim for backwards compatibility
 * #### Summary
 * This is just a shim around {@link useEthersAppContext} for backwards compatibility.  Will be removed later in a major update.
 *
 * @param contextKey
 * @returns
 */
export const useEthersContext: typeof useEthersAppContext = (contextKey?: string): IEthersContext => {
  return useEthersAppContext(contextKey);
};

/**
 * #### Summary
 * Props for context
 *
 * ##### ✏️ Notes
 * - allow you specify alternate web3ReactRoot [See docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).  You must provide both an alternate key and its root.
 * - allows you to use your own QueryClientProvider
 */
export type TEthersAppContextProps = {
  children?: React.ReactNode;
  /**
   * Props for context that allow you specify alternate web3ReactRoot [See docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).  You must provide both an alternate key and its root.
   */
  secondaryWeb3ReactRoot?: {
    contextKey: string;
    web3ReactRoot: JSX.Element;
  };
  /**
   * disables the local queryClientRoot and QueryClientProvider for react-query and allows you to use your own
   */
  disableQueryClientRoot?: boolean;
  /**
   * if you want to pass in your own provider.
   * Make sure it is compatable with ethers.js, see {@link TGetEthersAppProviderLibrary} for details
   */
  customGetEthersAppProviderLibrary?: TGetEthersAppProviderLibrary;
};

export type TGetEthersAppProviderLibrary = (
  provider: TEthersProvider | ExternalProvider | JsonRpcFetchFunc | any,
  connector?: AbstractConnector
) => TEthersProvider;

/**
 * Convert the provider obtained from web3Modal into a ethers.web3provider
 *
 * @internal
 *
 * @param provider Should be either {@link TEthersProvider} or a {@link ExternalProvider} or {@link JsonRpcFetchFunc},
 * @param _connector
 * @returns
 */
export const getEthersAppProviderLibrary: TGetEthersAppProviderLibrary = (
  provider: TEthersProvider | ExternalProvider | JsonRpcFetchFunc | any,
  connector?: AbstractConnector
): TEthersProvider => {
  if (provider == null) {
    throw new NoEthereumProviderFoundError();
  }

  let anyNetwork: string | undefined = undefined;
  if (connector && connector instanceof EthersModalConnector) {
    anyNetwork = connector.config.immutableProvider ? 'any' : undefined;
  }

  if (isEthersProvider(provider)) {
    return provider as TEthersProvider;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new Web3Provider(provider, anyNetwork);
  }
};
/**
 * #### Summary
 * Ethers App Context for your react app to be used with {@link useEthersAppContext}.
 * This is a wrapper around Web3ReactProvider that provides additional functionality such as a {@link BlockNumberContext} and access to {@link IEthersContext}.  See {@link TEthersAppContextProps} for more information on props for alternate context roots.
 *
 * @category EthersAppContext
 *
 * @param props {@link TEthersAppContextProps}
 * @returns
 */
export const EthersAppContext: FC<TEthersAppContextProps> = (props) => {
  if (props.secondaryWeb3ReactRoot != null) {
    invariant(
      !!props.secondaryWeb3ReactRoot.contextKey,
      'When using alternate web3-react roots, you need to provide a valid contextKeyName'
    );

    invariant(
      props.secondaryWeb3ReactRoot.web3ReactRoot != null,
      'When using alternate web3-react roots, you need to provide a valid web3ReactRoot'
    );

    invariant(props.secondaryWeb3ReactRoot.contextKey !== 'primary', 'You cannot use primary for alternate roots');

    const options: TOverride = mergeDefaultOverride({
      alternateContextKey: props.secondaryWeb3ReactRoot.contextKey,
    });

    const alternateProvider = cloneElement(
      props.secondaryWeb3ReactRoot.web3ReactRoot,
      { getLibrary: props.customGetEthersAppProviderLibrary ?? getEthersAppProviderLibrary },
      <BlockNumberContext override={options}>{props.children}</BlockNumberContext>
    );

    return alternateProvider;
  }

  const element = (
    <Web3ReactProvider getLibrary={props.customGetEthersAppProviderLibrary ?? getEthersAppProviderLibrary}>
      <BlockNumberContext>{props.children}</BlockNumberContext>
    </Web3ReactProvider>
  );

  if (props.disableQueryClientRoot) {
    return element;
  } else {
    return <QueryClientProvider client={ethersAppQueryClient}>{element}</QueryClientProvider>;
  }
};
