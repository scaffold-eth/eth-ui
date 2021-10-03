import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Web3ReactManagerReturn } from '@web3-react/core/dist/types';
import { FC, useCallback } from 'react';

import { EthersModalConnector } from '~~/context/EthersModalConnector';
import { TEthersProvider } from '~~/models';

/**
 * Convert the provider obtained from web3Modal into a ethers.web3provider
 * @param provider
 * @param _connector
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const setEthersAppProvider = (provider: any, _connector: AbstractConnector | undefined): Web3Provider => {
  return new Web3Provider(provider);
};

export const EthersAppContext: FC = (props) => {
  // this is a wrapper
  return (
    <>
      <Web3ReactProvider getLibrary={setEthersAppProvider}>{props.children}</Web3ReactProvider>
    </>
  );
};

export interface IEthersWeb3Context extends Web3ReactManagerReturn {
  connector?: EthersModalConnector;
  ethersProvider?: TEthersProvider;
  library?: TEthersProvider;
  openWeb3Modal: () => void;
  logoutWeb3Modal: () => void;
  active: boolean;
}

/**
 * A wrapper around useWeb3React that provides functionality for web3modal
 * and eth-hooks compatability
 * @param providerKey (string) :: (optional) :: used if you want a secondary provider context, for example to mainnet
 * @returns (IEthersWeb3Context)
 */
export const useEthersContext = (providerKey?: string): IEthersWeb3Context => {
  const { connector, activate, library, ...result } = useWeb3React<TEthersProvider>(providerKey);
  const web3Connector = connector as EthersModalConnector;

  const openWeb3Modal = useCallback(() => {
    web3Connector?.resetModal?.();
    if (connector && activate) void activate(connector);
  }, [connector, activate, web3Connector]);

  const logoutWeb3Modal = useCallback(() => {
    result.deactivate();
  }, [result]);

  return {
    connector: connector as EthersModalConnector,
    ethersProvider: library,
    openWeb3Modal,
    logoutWeb3Modal,
    activate,
    library,
    ...result,
  };
};
