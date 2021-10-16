import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { BigNumber, Signer, utils } from 'ethers';
import Core, { ICoreOptions, ThemeColors } from 'web3modal';

import { isEthersProvider } from '../../functions/ethersHelpers';

import { UserClosedModalError, CouldNotActivateError } from './connectorErrors';

import { TEthersProvider } from '~~/models';
import { const_web3DialogClosedByUser } from '~~/models/constants/common';

type TEthersModalConfig = {
  reloadOnNetworkChange: boolean;
};

type TWeb3ModalTheme = 'light' | 'dark';

/**
 * #### Summary
 * An interface implemented by {@link EthersModalConnector} in addition to AbstractConnector
 */
export interface ICommonModalConnector {
  getSigner(): Signer | undefined;
  setModalTheme(theme: TWeb3ModalTheme | ThemeColors): void;
  resetModal(): void;
  changeSigner(signer: Signer): Promise<void>;
}

export type TEthersModalConnector = ICommonModalConnector & AbstractConnector;

/**
 * #### Summary
 * This is a connector for (web3-react)[https://github.com/NoahZinsmeister/web3-react] that allows it to interface with [web3Modal](https://github.com/Web3Modal/web3modal).
 * The provider selected by user via web3modal is interfaced to the web3-react context.
 *
 * #### Features
 * - This connector used with {@link useEthersContext} allows the app and all the hooks to effortlessly access the current network, provider, signer, address information {@link IEthersContext}
 * - The connector centralizes and takes care of management of the web3 interaction and provides a consistent exprience for your app.
 *
 * #### Notes
 * - inherits from web3-react class AbstractConnector
 *
 * @category EthersContext
 */
export class EthersModalConnector extends AbstractConnector implements ICommonModalConnector {
  protected options: Partial<ICoreOptions>;
  protected providerBase?: any;
  protected ethersProvider?: TEthersProvider;
  protected web3Modal?: Core;
  protected id: string | undefined;
  protected debug: boolean = false;
  protected config: TEthersModalConfig;
  protected signer: Signer | undefined;
  protected theme: TWeb3ModalTheme | ThemeColors;

  /**
   * @param web3modalOptions see [web3modal docs](https://github.com/Web3Modal/web3modal#provider-options) for details.  You can also check the [scaffold-eth-typescript web3config](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/main/packages/vite-app-ts/src/config/web3ModalConfig.ts) for an example.
   * @param config Configuration for EthersModalConnector
   * @param id allows you to connect directly to a specific provider.  [See docs](https://github.com/Web3Modal/web3modal#connect-to-specific-provider)
   * @param debug turn on debug logging
   */
  constructor(
    web3modalOptions: Partial<ICoreOptions>,
    config: TEthersModalConfig,
    id?: string,
    debug: boolean = false
  ) {
    super();

    this.options = web3modalOptions;
    this.id = id;
    this.debug = debug;
    this.config = config;
    this.theme = (web3modalOptions.theme as TWeb3ModalTheme | ThemeColors) ?? 'light';

    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  protected log(...args: any[]): void {
    if (this.debug) {
      console.log('🔌 ', args);
    }
  }

  private maybeReload(): void {
    if (window && this.config.reloadOnNetworkChange) {
      window.location.reload();
    }
  }

  private handleChainChanged(chainId: number | string): void {
    this.log(`Handling chain changed to ${chainId}! updating providers`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.emitUpdate?.({ chainId, provider: this.providerBase });
    this.ethersProvider = new Web3Provider(this.providerBase);
    this.maybeReload();
  }

  private handleAccountsChanged(accounts: string[]): void {
    this.log(`Handling accounts changed`, accounts);
    if (accounts.length === 0) {
      this.emitDeactivate?.();
    } else {
      this.emitUpdate?.({ account: accounts[0] });
    }
  }

  private handleDisconnect(code: any, reason: any): void {
    this.log(`Handling disconnected event`, code, reason);
    this.deactivate();
  }

  private handleClose(code: number, reason: string): void {
    this.log("Handling 'close' event", code, reason);
    this.deactivate();
  }

  private load(): void {
    if (!this.web3Modal) {
      this.web3Modal = new Core({ ...this.options, theme: this.theme });
    }
  }

  /**
   * #### Summary
   * Inherits from AbstractConnector.  This activates web3Modal and opens the modal.
   *
   * #### Notes
   * Once the user selects a provider
   * - this will activate the provider and attach the appropriate event listeners.
   * - get the account and signer
   * - gets the ethers compatable provider
   *
   * #### Errors
   * - {@link UserClosedModalError}
   * - {@link CouldNotActivateError}
   * @returns
   */
  public async activate(): Promise<ConnectorUpdate> {
    try {
      this.load();

      if (this.web3Modal) {
        if (this.options.cacheProvider === false) this.resetModal();
        console.log('Open provider modal');
        await this.web3Modal.updateTheme(this.theme);
        /* eslint-disable @typescript-eslint/no-unsafe-assignment*/
        if (this.id) {
          this.providerBase = await this.web3Modal.connectTo(this.id);
        } else {
          this.providerBase = await this.web3Modal.connect();
        }
        /* eslint-enable */

        /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call*/
        this.providerBase.on('chainChanged', this.handleChainChanged);
        this.providerBase.on('accountsChanged', this.handleAccountsChanged);
        this.providerBase.on('disconnect', this.handleDisconnect as any);
        this.providerBase.on('close', this.handleClose as any);
        /* eslint-enable */

        if (this.isEthersProvider()) {
          this.ethersProvider = this.providerBase as TEthersProvider;
        } else {
          this.ethersProvider = new Web3Provider(this.providerBase);
        }
      }

      /* eslint-disable */
      const account: string = this.providerBase?.selectedAddress ?? (await this.getAccount());
      let chainId: number =
        this.providerBase?.networkVersion ?? BigNumber.from(this.providerBase?.chainId ?? 0).toNumber();
      if (chainId === 0) {
        chainId = (await this.getChainId()) as number;
      }
      this.setSignerFromAccount(account);

      return { provider: this.providerBase, account, chainId };
      /* eslint-enable */
    } catch (error) {
      if ((error as string).includes(const_web3DialogClosedByUser)) {
        console.log(error);
        this.deactivate();
        throw new UserClosedModalError();
      } else {
        console.error('EthersModalConnector: Could not activate provider', error, this.providerBase);
        throw new CouldNotActivateError(error);
      }
    }
  }

  private isEthersProvider(): boolean {
    return isEthersProvider(this.providerBase);
  }

  /**
   * #### Summary
   * Safely deactivates the current provider and removes all event listeners
   */
  public deactivate(): void {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call  */
    this.emitDeactivate?.();

    this.providerBase?.removeListener('disconnect', this.handleDisconnect);
    this.providerBase?.removeListener('chainChanged', this.handleChainChanged);
    this.providerBase?.removeListener('accountsChanged', this.handleAccountsChanged);
    this.providerBase?.removeListener('close', this.handleClose);

    const provider = this.providerBase;

    // use disconnect function if exists
    provider?.disconnect?.();
    // use close function if exists
    provider?.close?.();

    this.maybeReload();
    /* eslint-enable  */
  }

  public getProvider(): Promise<TEthersProvider | undefined> {
    return Promise.resolve(this.ethersProvider) as Promise<TEthersProvider | undefined>;
  }

  public async getChainId(): Promise<number | string> {
    return Promise.resolve(this.ethersProvider?.network?.chainId ?? 0) as Promise<number | string>;
  }

  private async setSignerFromAccount(account: string | null): Promise<void> {
    if (account && utils.isAddress(account) && (await this.signer?.getAddress()) !== account) {
      this.signer = this.ethersProvider?.getSigner(account);
    }
  }

  public async getAccount(): Promise<null | string> {
    if (this.signer) {
      const account = await this.signer.getAddress();
      if (utils.isAddress(account)) return account;
    }

    const accounts = await this.ethersProvider?.listAccounts();
    const account = accounts?.[0] ?? null;
    await this.setSignerFromAccount(account);
    return Promise.resolve(accounts?.[0] ?? null);
  }

  public getSigner(): Signer | undefined {
    return this.signer;
  }

  /**
   * #### Summary
   * Change the current signer and account used by the connector
   * @param signer
   */
  public async changeSigner(signer: Signer): Promise<void> {
    const account = await signer.getAddress();
    if (utils.isAddress(account) && this.validState()) {
      this.signer = signer;
      this.handleAccountsChanged([account]);

      console.log(`changeSigner: provider chainId ${await this.getChainId()}`);
      console.log(`new signer chainId ${(await signer.provider?.getNetwork())?.chainId ?? ''}`);
    }
  }

  protected validState(): boolean {
    return this.providerBase != null && this.ethersProvider != null && this.web3Modal != null;
  }

  /**
   * #### Summary
   * Resets the web3Modal and clears the cache
   */
  public resetModal(): void {
    if (this.web3Modal) {
      this.web3Modal.clearCachedProvider();
      this.providerBase = undefined;
      this.ethersProvider = undefined;
      this.signer = undefined;
      this.emitUpdate?.({ account: undefined, provider: undefined, chainId: undefined });
    }
  }

  /**
   * #### Summary
   * Sets the web3modal theme: light | dark | ThemeColors
   * @param theme
   */
  public setModalTheme(theme: TWeb3ModalTheme | ThemeColors): void {
    this.theme = theme;
  }
}
