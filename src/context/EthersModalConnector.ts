import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { BigNumber } from 'ethers';
import type { default as Web3Modal, ICoreOptions } from 'web3modal';

import { TEthersProvider } from '~~/models';

export class EthersModalConnector extends AbstractConnector {
  public options: Partial<ICoreOptions>;
  public provider?: any;
  public ethersProvider?: TEthersProvider;
  public web3Modal?: Web3Modal;
  public debug: boolean = false;

  constructor(options: Partial<ICoreOptions>, debug: boolean = false) {
    // super({supportedChainIds: options.network ? });
    super();

    this.options = options;
    this.debug = debug;

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

  private handleChainChanged(chainId: number | string): void {
    this.log(`chain changed to ${chainId}! updating providers`);
    this.emitUpdate({ chainId });
  }

  private handleAccountsChanged(accounts: string[]): void {
    this.log(`accounts changed`, accounts);
    this.emitUpdate({ account: accounts[0] });
  }

  private handleDisconnect(code: any, reason: any): void {
    this.log(`disconnected`, code, reason);
    this.emitDeactivate();
  }

  public async load(): Promise<void> {
    if (!this.web3Modal) {
      const Web3Modal = await import('web3modal').then((m) => m.default);
      this.web3Modal = new Web3Modal(this.options);
    }
  }

  public async activate(): Promise<ConnectorUpdate> {
    await this.load();

    if (this.web3Modal) {
      this.web3Modal.on('chainChanged', this.handleChainChanged);
      this.web3Modal.on('accountsChanged', this.handleAccountsChanged);
      this.web3Modal.on('disconnect', this.handleDisconnect as any);
      this.web3Modal.on('close', this.handleClose as any);

      this.provider = await this.web3Modal.connect();
      this.ethersProvider = new Web3Provider(this.provider);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const account: string = this.provider?.selectedAddress ?? (await this.getAccount());
    const chainId: number =
      this.provider?.networkVersion ?? BigNumber.from(this.provider?.chainId).toNumber() ?? (await this.getChainId());
    return { provider: this.provider, account, chainId };
  }

  public getProvider(): Promise<TEthersProvider | undefined> {
    return Promise.resolve(this.ethersProvider) as Promise<TEthersProvider | undefined>;
  }

  public async getChainId(): Promise<number | string> {
    return Promise.resolve(this.ethersProvider?.network?.chainId ?? 0) as Promise<number | string>;
  }

  public async getAccount(): Promise<null | string> {
    const accounts = await this.ethersProvider?.listAccounts();
    return Promise.resolve(accounts?.[0] ?? null);
  }

  public resetModal(): void {
    if (this.web3Modal) {
      this.provider = undefined;
      this.ethersProvider = undefined;
      this.web3Modal.clearCachedProvider();
    }
  }

  // public connectTo(id: string): void {
  //   if (this.web3Modal) {
  //     this.deactivate();
  //     this.provider = undefined;
  //     this.ethersProvider = undefined;
  //     this.web3Modal.clearCachedProvider();
  //     this.web3Modal?.connectTo(id);
  //   }
  // }

  public deactivate(): void {
    this.ethersProvider?.removeListener('disconnect', this.handleDisconnect);
    this.ethersProvider?.removeListener('chainChanged', this.handleChainChanged);
    this.ethersProvider?.removeListener('accountsChanged', this.handleAccountsChanged);
    this.ethersProvider?.removeListener('close', this.handleClose);

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unsafe-call */

    // use disconnect function if exists
    this.provider?.disconnect?.();

    // use close function if exists
    this.provider?.close?.();

    this.resetModal();

    /* eslint-enable @typescript-eslint/no-unsafe-call */
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  }

  private handleClose(code: number, reason: string): void {
    this.log("Handling 'close' event with payload", code, reason);
    this.emitDeactivate();
    this.resetModal();
  }
}
