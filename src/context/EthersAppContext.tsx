import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3ReactManagerReturn } from '@web3-react/core/dist/types';
import { Signer } from 'ethers';
import { FC, useCallback, useEffect, useState } from 'react';

import { BlockNumberContext } from '~~/context/BlockNumberContext';
import { EthersModalConnector } from '~~/context/EthersModalConnector';
import { TEthersProvider } from '~~/models';

export interface IEthersWeb3Context extends Web3ReactManagerReturn {
  connector: EthersModalConnector | undefined;
  ethersProvider: TEthersProvider | undefined;
  library: TEthersProvider | undefined;
  openWeb3Modal: () => void;
  logoutWeb3Modal: () => void;
  active: boolean;
  signer: Signer | undefined;
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
  const [signer, setSigner] = useState<Signer>();

  const openWeb3Modal = useCallback(() => {
    web3Connector?.resetModal?.();
    if (connector && activate) void activate(connector);
  }, [connector, activate, web3Connector]);

  const logoutWeb3Modal = useCallback(() => {
    result.deactivate();
  }, [result]);

  useEffect(() => {
    if (library) {
      if (result?.account && result.account !== '') {
        setSigner(library.getSigner(result.account));
      } else {
        setSigner(undefined);
      }
    }
    setSigner(undefined);
  }, [library, result.account]);

  return {
    connector: connector as EthersModalConnector,
    ethersProvider: library,
    openWeb3Modal,
    logoutWeb3Modal,
    activate,
    library,
    signer,
    ...result,
  };
};

/**
 * Convert the provider obtained from web3Modal into a ethers.web3provider
 * @param provider
 * @param _connector
 * @returns
 */
const setEthersAppProvider = (provider: any, _connector: AbstractConnector | undefined): Web3Provider => {
  return new Web3Provider(provider);
};

interface IChildContextProps {
  providerKey?: string;
}

const ChildContexts: FC<IChildContextProps> = (props) => {
  const { chainId, ethersProvider } = useEthersContext();
  return (
    <BlockNumberContext providerKey={props.providerKey} chainId={chainId} ethersProvider={ethersProvider}>
      {props.children}
    </BlockNumberContext>
  );
};

export const EthersAppContext: FC = (props) => {
  return (
    <Web3ReactProvider getLibrary={setEthersAppProvider}>
      <ChildContexts>{props.children}</ChildContexts>
    </Web3ReactProvider>
  );
};
