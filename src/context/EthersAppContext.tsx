import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Web3ReactManagerReturn } from '@web3-react/core/dist/types';
import { FC, useCallback } from 'react';

import { EthersAppConnector } from '~~/context/EthersAppConnector';
import { TEthersProvider } from '~~/models';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setEthersWeb3AppProvider = (provider: any, _connector: AbstractConnector | undefined): Web3Provider => {
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

export interface IEthersWeb3Context extends Web3ReactManagerReturn {
  // changeEthersAppProvider: (provider: TEthersProvider) => void;
  connector?: EthersAppConnector;
  provider?: TEthersProvider;
  openWeb3Modal: () => void;
  logoutWeb3Modal: () => void;
  active: boolean;
}

// const changeEthersAppProvider = (ethersProvider: TEthersProvider) => {};

/**
 * A wrapper around useWeb3React that we can extend as required
 * @returns TEthersManager
 */
export const useEthersContext = (): IEthersWeb3Context => {
  const { connector, activate, library, ...result } = useWeb3React<TEthersProvider>();
  const web3Connector = connector as EthersAppConnector;

  const openWeb3Modal = useCallback(() => {
    web3Connector?.resetModal?.();
    if (connector && activate) void activate(connector);
  }, [connector, activate, web3Connector]);

  const logoutWeb3Modal = useCallback(() => {
    result.deactivate();
  }, [result]);

  return {
    connector: connector as EthersAppConnector,
    provider: library,
    openWeb3Modal,
    logoutWeb3Modal,
    activate,
    ...result,
  };
};
