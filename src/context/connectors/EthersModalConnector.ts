import { Web3Provider, StaticJsonRpcProvider, JsonRpcProvider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { BigNumber, Signer } from 'ethers';
import Core, { ICoreOptions, ThemeColors } from 'web3modal';

import { TEthersProvider } from '~~/models';
import { const_web3DialogClosedByUser } from '~~/models/constants/common';

interface IEthersModalConfig {
  reloadOnNetworkChange: boolean;
}

type TWeb3ModalTheme = 'light' | 'dark';

export const isEthersProvider = (providerBase: unknown): boolean => {
  return (
    providerBase instanceof Web3Provider ||
    providerBase instanceof StaticJsonRpcProvider ||
    providerBase instanceof JsonRpcProvider
  );
};

export class EthersModalConnector extends AbstractConnector {
  protected options: Partial<ICoreOptions>;
  protected providerBase?: any;
  protected ethersProvider?: TEthersProvider;
  protected web3Modal?: Core;
  protected id: string | undefined;
  protected debug: boolean = false;
  protected config: IEthersModalConfig;
  protected signer: Signer | undefined;
  protected theme: TWeb3ModalTheme | ThemeColors;

  constructor(
    web3modalOptions: Partial<ICoreOptions>,
    config: IEthersModalConfig,
    id?: string,
    debug: boolean = false
  ) {
    // super({supportedChainIds: options.network ? });
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

  private log(...args: any[]): void {
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

  public load(): void {
    if (!this.web3Modal) {
      this.web3Modal = new Core({ ...this.options, theme: this.theme });
    }
  }

  public async activate(): Promise<ConnectorUpdate> {
    try {
      this.load();

      if (this.web3Modal) {
        await this.web3Modal.updateTheme(this.theme);
        if (this.id) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.providerBase = await this.web3Modal.connectTo(this.id);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.providerBase = await this.web3Modal.connect();
        }
        /* eslint-disable */
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
      this.setSigner(account);

      return { provider: this.providerBase, account, chainId };
      /* eslint-enable */
    } catch (error) {
      if ((error as string).includes(const_web3DialogClosedByUser)) {
        console.log(error);
        // @ts-ignore
        return;
      } else {
        console.error('EthersModalConnector: Could not activate provider', error, this.providerBase);
        throw error;
      }
    }
  }

  private isEthersProvider(): boolean {
    return isEthersProvider(this.providerBase);
  }

  public deactivate(): void {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
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
    /* eslint-enable @typescript-eslint/no-unsafe-call */
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  }

  public getProvider(): Promise<TEthersProvider | undefined> {
    return Promise.resolve(this.ethersProvider) as Promise<TEthersProvider | undefined>;
  }

  public async getChainId(): Promise<number | string> {
    return Promise.resolve(this.ethersProvider?.network?.chainId ?? 0) as Promise<number | string>;
  }

  public async setSigner(account: string | null): Promise<void> {
    const signerAccountPromise = this.signer?.getAddress();
    if (account && account !== '' && (await signerAccountPromise) !== account) {
      this.signer = this.ethersProvider?.getSigner(account);
    }
  }

  public async getAccount(): Promise<null | string> {
    const accounts = await this.ethersProvider?.listAccounts();
    const account = accounts?.[0] ?? null;
    await this.setSigner(account);
    return Promise.resolve(accounts?.[0] ?? null);
  }

  public getSigner(): Signer | undefined {
    return this.signer;
  }

  public async changeAccount(signer: Signer): Promise<void> {
    const account = await signer.getAddress();
    await this.setSigner(account);
    this.emitUpdate?.({ account });
  }

  public resetModal(): void {
    if (this.web3Modal) {
      this.web3Modal.clearCachedProvider();
      this.providerBase = undefined;
      this.ethersProvider = undefined;
      this.signer = undefined;
      this.emitUpdate?.({ account: undefined, provider: undefined, chainId: undefined });
    }
  }
  public setModalTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
  }
}
