import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { BigNumber, Signer } from 'ethers';
import type { default as Web3Modal, ICoreOptions } from 'web3modal';

import { TEthersProvider } from '~~/models';

interface IEthersModalConfig {
  reloadOnNetworkChange: boolean;
}

export class EthersModalConnector extends AbstractConnector {
  public options: Partial<ICoreOptions>;
  public provider?: any;
  public ethersProvider?: TEthersProvider;
  public web3Modal?: Web3Modal;
  public id: string | undefined;
  public debug: boolean = false;
  public config: IEthersModalConfig;
  public signer: Signer | undefined;

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
    this.maybeReload();
    this.emitUpdate({ chainId, provider: this.provider });
    this.ethersProvider = new Web3Provider(this.provider);
  }

  private handleAccountsChanged(accounts: string[]): void {
    this.log(`Handling accounts changed`, accounts);
    if (accounts.length === 0) {
      this.emitDeactivate();
    } else {
      this.emitUpdate({ account: accounts[0] });
    }
  }

  private handleDisconnect(code: any, reason: any): void {
    this.log(`Handling disconnected event`, code, reason);
    this.emitDeactivate();
    this.maybeReload();
  }

  private handleClose(code: number, reason: string): void {
    this.log("Handling 'close' event", code, reason);
    this.emitDeactivate();
    this.resetModal();
    this.maybeReload();
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
      if (this.id) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.provider = await this.web3Modal.connectTo(this.id);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.provider = await this.web3Modal.connect();
      }
      /* eslint-disable */
      this.provider.on('chainChanged', this.handleChainChanged);
      this.provider.on('accountsChanged', this.handleAccountsChanged);
      this.provider.on('disconnect', this.handleDisconnect as any);
      this.provider.on('close', this.handleClose as any);
      /* eslint-enable */
      this.ethersProvider = new Web3Provider(this.provider);
    }

    /* eslint-disable */
    const account: string = this.provider?.selectedAddress ?? (await this.getAccount());
    const chainId: number =
      this.provider?.networkVersion ?? BigNumber.from(this.provider?.chainId).toNumber() ?? (await this.getChainId());

    this.setSigner(account);

    return { provider: this.provider, account, chainId };
    /* eslint-enable */
  }

  public deactivate(): void {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    this.provider?.removeListener('disconnect', this.handleDisconnect);
    this.provider?.removeListener('chainChanged', this.handleChainChanged);
    this.provider?.removeListener('accountsChanged', this.handleAccountsChanged);
    this.provider?.removeListener('close', this.handleClose);

    // use disconnect function if exists
    this.provider?.disconnect?.();

    // use close function if exists
    this.provider?.close?.();

    this.resetModal();
    /* eslint-enable @typescript-eslint/no-unsafe-call */
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  }

  public getProvider(): Promise<TEthersProvider | undefined> {
    return Promise.resolve(this.ethersProvider) as Promise<TEthersProvider | undefined>;
  }

  public async getChainId(): Promise<number | string> {
    return Promise.resolve(this.ethersProvider?.network?.chainId ?? 0) as Promise<number | string>;
  }

  public async getAccount(): Promise<null | string> {
    const accounts = await this.ethersProvider?.listAccounts();
    const account = accounts?.[0] ?? null;
    await this.setSigner(account);
    return Promise.resolve(accounts?.[0] ?? null);
  }

  private async setSigner(account: string | null): Promise<void> {
    const signerAccountPromise = this.signer?.getAddress();
    if (account && account !== '' && (await signerAccountPromise) !== account) {
      this.signer = this.ethersProvider?.getSigner(account);
    }
  }

  public async changeAccount(signer: Signer): Promise<void> {
    const account = await signer.getAddress();
    this.signer = signer;
    this.emitUpdate({ account });
  }

  public resetModal(): void {
    if (this.web3Modal) {
      this.provider = undefined;
      this.ethersProvider = undefined;
      this.web3Modal.clearCachedProvider();
    }
  }
}
