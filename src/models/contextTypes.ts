import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Signer } from 'ethers';

import { TEthersModalConnector } from '~~/context/connectors/EthersModalConnector';
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
  ethersProvider: TEthersProvider | undefined;
  active: boolean;
  signer: Signer | undefined;
  account: string | undefined;
  changeSigner: ((signer: Signer) => Promise<void>) | undefined;
  openModal: (ethersModalConnector: TEthersModalConnector) => void;
  disconnectModal: () => void;
  setModalTheme: ((theme: 'light' | 'dark') => void) | undefined;
}
/**
 * #### Summary
 * Essentially a provider and signer and network information for ease of use.
 *
 * @category Type Definition
 */
export type TEthersUser = {
  signer: Signer;
  provider: TEthersProvider;
  chainId: number;
  account: string;
};

export type THookOptions = {
  contextOverride?: TEthersUser;
  providerKeyOverride?: string;
};
