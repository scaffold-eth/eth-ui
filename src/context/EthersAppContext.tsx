import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Signer } from 'ethers';
import { FC, useCallback } from 'react';

import { BlockNumberContext } from '~~/context/BlockNumberContext';
import { EthersModalConnector } from '~~/context/EthersModalConnector';
import { TEthersProvider } from '~~/models';

export interface IEthersContext extends Web3ReactContextInterface<TEthersProvider> {
  connector: EthersModalConnector | undefined;
  ethersProvider: TEthersProvider | undefined;
  openWeb3Modal: (modalConnector: EthersModalConnector) => void;
  logoutWeb3Modal: () => void;
  changeAccount: ((signer: Signer) => Promise<void>) | undefined;
  active: boolean;
  signer: Signer | undefined;
  account: string | undefined;
}

/**
 * A wrapper around useWeb3React that provides functionality for web3modal
 * and eth-hooks compatability
 * @param providerKey (string) :: (optional) :: used if you want a secondary provider context, for example to mainnet
 * @returns (IEthersWeb3Context)
 */
export const useEthersContext = (providerKey?: string): IEthersContext => {
  const { connector, activate, library, account, ...result } = useWeb3React<TEthersProvider>(providerKey);
  const web3Connector = connector as EthersModalConnector;

  const openWeb3Modal = useCallback(
    (modalConnector: EthersModalConnector) => {
      web3Connector?.resetModal?.();
      if (activate) {
        result?.deactivate?.();
        void activate(modalConnector);
      }
    },
    [activate, result?.deactivate, web3Connector]
  );

  const logoutWeb3Modal = useCallback(() => {
    result.deactivate();
  }, [result]);

  const ethersConnector = connector as EthersModalConnector | undefined;

  return {
    connector: ethersConnector,
    ethersProvider: library,
    openWeb3Modal,
    logoutWeb3Modal,
    activate,
    library,
    signer: ethersConnector?.signer,
    changeAccount: ethersConnector?.changeAccount,
    account: account ?? undefined,
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
