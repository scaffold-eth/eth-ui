import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Signer } from 'ethers';

import { TEthersModalConnector } from '~~/context/ethers-app/connectors/EthersModalConnector';
import { TEthersProvider, TEthersSigner } from '~~/models';

/**
 * #### Summary
 * A callback type that returns a EthersModalConnector
 *
 * ##### ✏️ Notes
 * - can be used by components that need to give a connector to {@link IEthersContext.openModal}
 * - id is the identifier of the provider:  [See docs](https://github.com/Web3Modal/web3modal#connect-to-specific-provider)
 *
 * @category EthersAppContext
 */
export type TCreateEthersModalConnector = (id?: string) => TEthersModalConnector | undefined;

/**
 * #### Summary
 * The return type of {@link TCreateEthersModalConnector}
 * - ethers compatable provider {@link TEthersProvider}
 * - a callback to change the current signer
 * - the current account, chainId and signer
 * - callbacks to open the web3Modal, logout or change theme
 *
 * @category EthersAppContext
 */
export interface IEthersContext extends Web3ReactContextInterface<TEthersProvider> {
  connector: TEthersModalConnector | undefined;
  provider: TEthersProvider | undefined;
  active: boolean;
  signer: TEthersSigner | undefined;
  account: string | undefined;
  chainId: number | undefined;
  changeSigner: ((signer: Signer) => Promise<void>) | undefined;
  /**
   * Open web3 modal for login
   */
  openModal: (ethersModalConnector: TEthersModalConnector, onError?: (error: Error) => void) => void;
  disconnectModal: (onSuccess?: () => void) => void;
  setModalTheme: ((theme: 'light' | 'dark') => void) | undefined;
}

/**
 * #### Summary
 * Essentially a object that allows interaction with the network:
 * - provider signer,
 *
 * @category Type Definition
 */
export type TEthersAdaptor = {
  signer?: TEthersSigner;
  provider?: TEthersProvider;
  chainId?: number;
  account?: string;
};
