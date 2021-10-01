import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { FC, useCallback } from 'react';

import { EthersAppConnector } from '~~/context/EthersAppConnector';
import { TEthersProvider } from '~~/models';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setEthersWeb3AppProvider = (provider: any): Web3Provider => {
  return new Web3Provider(provider);
};

export const EthersWeb3Context: FC = (props) => {
  // comments

  return (
    <>
      <Web3ReactProvider getLibrary={setEthersWeb3AppProvider}>{props.children}</Web3ReactProvider>
    </>
  );
};

export type TEthersWeb3Context = {
  // changeEthersAppProvider: (provider: TEthersProvider) => void;
  connector?: EthersAppConnector;
  provider?: TEthersProvider;
  chainId?: number;
  address?: null | string;
  active: boolean;
  error?: Error;
  openWeb3Modal: () => void;
  logoutWeb3Modal: () => void;
};

// const changeEthersAppProvider = (ethersProvider: TEthersProvider) => {};

/**
 * A wrapper around useWeb3React that we can extend as required
 * @returns TEthersManager
 */
export const useEthersProvider = (): TEthersWeb3Context => {
  const { connector, library, ...result } = useWeb3React<TEthersProvider>();
  const web3Connector = connector as EthersAppConnector;

  const openWeb3Modal = useCallback(() => {
    web3Connector?.activate();
  }, [web3Connector]);

  const logoutWeb3Modal = useCallback(() => {
    web3Connector.deactivate();
  }, [web3Connector]);

  return { connector: connector as EthersAppConnector, provider: library, openWeb3Modal, logoutWeb3Modal, ...result };
};
