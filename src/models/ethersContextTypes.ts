import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Signer } from 'ethers';

import { TEthersModalConnector } from '~~/context/ethers-app/connectors/EthersModalConnector';
import { TEthersProvider, TEthersSigner } from '~~/models';

/**
 * #### Summary
 * A callback type that returns a EthersModalConnector
 *
 * #### Notes
 * - can be used by components that need to give a connector to {@link IEthersContext.openModal}
 *
 * @category EthersContext
 */

export type TCreateEthersModalConnector = () => TEthersModalConnector | undefined;
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
  provider: TEthersProvider | undefined;
  active: boolean;
  signer: TEthersSigner | undefined;
  account: string | undefined;
  chainId: number | undefined;
  changeSigner: ((signer: Signer) => Promise<void>) | undefined;
  openModal: (ethersModalConnector: TEthersModalConnector) => void;
  disconnectModal: () => void;
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
