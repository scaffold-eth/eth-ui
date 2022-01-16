import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { cloneElement, FC, useCallback } from 'react';
import { QueryClientProvider } from 'react-query';
import { invariant } from 'ts-invariant';

import { NoEthereumProviderFoundError } from '~~/context';
import { BlockNumberContext } from '~~/context/ethers/BlockNumberContext';
import { EthersModalConnector, TEthersModalConnector } from '~~/context/ethers/connectors/EthersModalConnector';
import { contextQueryClient as ethersAppQueryClient } from '~~/context/ethers/queryClient';
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
 * @category EthersContext
 *
 * @param contextKey
 * @returns
 */
export const useEthersContext = (contextKey?: string): IEthersContext => {
  if (contextKey === 'primary') console.warn('Do not explicitly use primary contextKey, pass in undefined instead');
  const { connector, activate, library, account, deactivate, chainId, ...context } =
    useWeb3React<TEthersProvider>(contextKey);

  if (!(connector instanceof EthersModalConnector || connector instanceof AbstractConnector) && connector != null) {
    throw 'Connector is not a EthersModalConnector';
  }
  const ethersConnector = connector as EthersModalConnector;

  const openWeb3Modal = useCallback(
    (ethersModalConnector: TEthersModalConnector | undefined) => {
      if (context.active) {
        deactivate();
      }

      if (ethersModalConnector == null) {
        invariant.error('A valid ethersModalConnector was not provided');
      }
      if (ethersModalConnector != null) {
        const onError = (error: Error): void => {
          try {
            connector?.deactivate?.();
            console.warn(error);
          } catch {}
        };
        void activate(ethersModalConnector, onError).catch(onError);
      }
    },
    [context.active, deactivate, activate, connector]
  );

  const disconnectModal = useCallback(() => {
    ethersConnector.resetModal();
    deactivate();
  }, [deactivate, ethersConnector]);

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
    openModal: openWeb3Modal,
    disconnectModal: disconnectModal,
    setModalTheme: ethersConnector?.setModalTheme.bind(ethersConnector),
    ...context,
  };

  return result;
};

/**
 * #### Summary
 * Props for context that allow you specify alternate web3ReactRoot [See docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).  You must provide both an alternate key and its root.
 */
export type TEthersAppContextProps = {
  secondaryWeb3ReactRoot?: {
    contextKey: string;
    web3ReactRoot: JSX.Element;
  };
  disableQueryClientRoot?: boolean;
};

/**
 * Convert the provider obtained from web3Modal into a ethers.web3provider
 *
 * @internal
 *
 * @param provider
 * @param _connector
 * @returns
 */
export const getEthersAppProviderLibrary = (
  provider: any,
  connector: AbstractConnector | undefined
): TEthersProvider => {
  if (provider == null) {
    throw new NoEthereumProviderFoundError();
  }

  let anyNetwork: string | undefined = undefined;
  if (connector instanceof EthersModalConnector) {
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
 * Ethers App Context for your react app to be used with {@link useEthersContext}.
 * This is a wrapper around Web3ReactProvider that provides additional functionality such as a {@link BlockNumberContext} and access to {@link IEthersContext}.  See {@link TEthersAppContextProps} for more information on props for alternate context roots.
 *
 * @category EthersContext
 *
 * @param props
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
      { getLibrary: getEthersAppProviderLibrary },
      <BlockNumberContext override={options}>{props.children}</BlockNumberContext>
    );

    return alternateProvider;
  }

  const element = (
    <Web3ReactProvider getLibrary={getEthersAppProviderLibrary}>
      <BlockNumberContext>{props.children}</BlockNumberContext>
    </Web3ReactProvider>
  );

  if (props.disableQueryClientRoot) {
    return element;
  }

  return <QueryClientProvider client={ethersAppQueryClient}>{element}</QueryClientProvider>;
};
