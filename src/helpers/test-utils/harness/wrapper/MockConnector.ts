import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { MockProvider } from 'ethereum-waffle';
import { Signer } from 'ethers';
import { ThemeColors } from 'web3modal';

import { ICommonModalConnector } from '~~/context';
import { TEthersProvider } from '~~/models';

export class MockConnector extends AbstractConnector implements ICommonModalConnector {
  protected readonly provider: MockProvider | TEthersProvider;
  protected readonly chainId: number;
  protected signer: Signer | undefined;

  constructor(provider: MockProvider | TEthersProvider, chainId?: number) {
    super();
    this.provider = provider;
    this.chainId = chainId ?? 1337;
  }
  getSigner(): Signer | undefined {
    return this.signer;
  }
  setModalTheme(_theme: ('light' | 'dark') | ThemeColors): void {
    return;
  }
  resetModal(): void {
    return;
  }
  changeSigner(signer: Signer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private providerPromise = (): Promise<MockProvider | TEthersProvider> => {
    return Promise.resolve(this.provider);
  };

  public activate = async (): Promise<ConnectorUpdate> => {
    const account = await this.getAccount();
    this.signer = this.provider.getSigner(account);

    return { provider: await this.providerPromise(), chainId: this.chainId, account: account };
  };

  public getProvider = async (): Promise<MockProvider | TEthersProvider> => {
    return await this.providerPromise();
  };

  public getChainId = async (): Promise<number> => {
    return await Promise.resolve(this.chainId);
  };

  public async getAccount(): Promise<string> {
    const accounts = await this.provider.listAccounts();
    return await Promise.resolve(accounts[0]);
  }

  public deactivate(): void {
    return;
  }
}
