import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Signer } from 'ethers';
import { FC, useCallback } from 'react';

import { BlockNumberContext } from '~~/context/BlockNumberContext';
import { EthersModalConnector, TEthersModalConnector } from '~~/context/connectors/EthersModalConnector';
import { isEthersProvider } from '~~/functions/ethersHelpers';
import { TEthersProvider } from '~~/models';

/**
 * #### Summary
 * A callback type that returns a EthersModalConnector
 *
 * #### Notes
 * - can be used by components that need to give a connector to {@link IEthersContext.openModal}
 *
 * @category EthersContext
 */
export type CreateEthersModalConnector = () => TEthersModalConnector | undefined;

/**
 * #### Summary
 * The return type of {@link EthersModalConnector}
 * - ethers compatable provider {@link TEthersProvider}
 * - a callback to change the current signer
 * - the current account, chainId and signer
 * - callbacks to open the web3Modal, logout or change theme
 *
 * @category EthersContext
 */
export interface IEthersContext extends Web3ReactContextInterface<TEthersProvider> {
  connector: TEthersModalConnector | undefined;
  ethersProvider: TEthersProvider | undefined;
  active: boolean;
  signer: Signer | undefined;
  account: string | undefined;
  changeAccount: ((signer: Signer) => Promise<void>) | undefined;
  openModal: (ethersModalConnector: TEthersModalConnector) => void;
  disconnectModal: () => void;
  setModalTheme: ((theme: 'light' | 'dark') => void) | undefined;
}

/**
 * A wrapper around useWeb3React that provides functionality for web3modal
 * and eth-hooks compatability
 * @param providerKey (string) :: (optional) :: used if you want a secondary provider context, for example to mainnet
 * @returns (IEthersWeb3Context)
 */

/**
 * #### Summary
 * This Hook provides you with access to the current Ethers Provider Context.
 * This provider would be the one selected by using {@link EthersModalConnect} and Web3Modal
 *
 * #### Features
 * Gives you access to consistent interface to get the current provider information {@link EthersModalConnector}
 * - ethers compatable provider {@link TEthersProvider}
 * - a callback to change the current account (signer)
 * - the current account, chainId and signer
 * - callbacks to open the web3Modal, logout or change theme
 *
 * #### Notes
 * - currently providerKey isnt being used
 *
 * @category EthersContext
 *
 * @param providerKey
 * @returns
 */
export const useEthersContext = (providerKey?: string): IEthersContext => {
  const { connector, activate, library, account, deactivate, ...context } = useWeb3React<TEthersProvider>(providerKey);
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
        console.error('A valid ethersModalConnector was not provided');
      }
      if (ethersModalConnector != null) {
        console.log('activate ethersModalConnector');
        const onError = (error: Error): void => {
          connector?.deactivate?.();
          console.warn(error);
        };
        void activate(ethersModalConnector, onError).catch(onError);
      }
    },
    [context.active, deactivate, activate, connector]
  );

  const disconnectWeb3Modal = useCallback(() => {
    ethersConnector.resetModal();
    deactivate();
  }, [deactivate, ethersConnector]);

  const result: IEthersContext = {
    connector: ethersConnector,
    ethersProvider: library,
    activate,
    deactivate,
    library,
    account: account ?? undefined,
    signer: ethersConnector?.getSigner(),
    changeAccount: ethersConnector?.changeSigner.bind(ethersConnector),
    openModal: openWeb3Modal,
    disconnectModal: disconnectWeb3Modal,
    setModalTheme: ethersConnector?.setModalTheme.bind(ethersConnector),
    ...context,
  };

  return result;
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
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  provider: any,
  _connector: AbstractConnector | undefined
): TEthersProvider => {
  if (isEthersProvider(provider)) {
    return provider as TEthersProvider;
  } else {
    return new Web3Provider(provider);
  }
};

/**
 * @internal
 */
interface IChildContextProps {
  providerKey?: string;
}

/**
 * @internal
 *
 * @param props
 * @returns
 */
const ChildContexts: FC<IChildContextProps> = (props) => {
  const { chainId, ethersProvider } = useEthersContext();
  return (
    <BlockNumberContext providerKey={props.providerKey} chainId={chainId} ethersProvider={ethersProvider}>
      {props.children}
    </BlockNumberContext>
  );
};

/**
 * #### Summary
 * Ethers App Context for your react app to be used with {@link useEthersContext}.
 * This is a wrapper around Web3ReactProvider that provides additional functionality such as a {@link BlockNumberContext} and access to {@link IEthersContext}
 *
 * @category EthersContext
 *
 * @param props
 * @returns
 */
export const EthersAppContext: FC = (props) => {
  return (
    <Web3ReactProvider getLibrary={getEthersAppProviderLibrary}>
      <ChildContexts>{props.children}</ChildContexts>
    </Web3ReactProvider>
  );
};
