import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { MockProvider } from 'ethereum-waffle';
import { Signer } from 'ethers';
import sinon from 'ts-sinon';
import { ThemeColors } from 'web3modal';

import { ICommonModalConnector } from '~~/context';
import { const_DefaultTestChainId } from '~~/helpers/test-utils/constants';
import { getHardhatAccount } from '~~/helpers/test-utils/wrapper';
import { TEthersProvider } from '~~/models';

export class MockConnector extends AbstractConnector implements ICommonModalConnector {
  protected provider: MockProvider;
  protected mockChainId: number;

  protected mockSigner: Signer | undefined;
  protected mockAccount: string | undefined;

  public spyResetModal = sinon.stub(this, 'resetModal');
  public spySetModalTheme = sinon.stub(this, 'setModalTheme');
  public spyChangeSigner = sinon.stub(this, 'changeSigner');
  public spyActivate = sinon.stub();
  public spyDeactivate = sinon.stub();

  constructor(provider: MockProvider) {
    super();
    this.provider = provider;
    this.mockChainId = const_DefaultTestChainId;
    this.replaceWithSpies();
  }

  public replaceWithSpies(): void {
    this.resetModal = this.spyResetModal;
    this.setModalTheme = this.spySetModalTheme;
    this.changeSigner = this.spyChangeSigner as (_signer: Signer) => Promise<void>;
  }

  public hasCachedProvider(): boolean {
    return false;
  }

  public getSigner(): Signer | undefined {
    return this.mockSigner;
  }
  public setModalTheme(_theme: ('light' | 'dark') | ThemeColors): void {
    throw new Error('MockConnector: Method not implemented.');
  }
  public resetModal(): void {
    throw new Error('MockConnector: Method not implemented.');
  }

  public changeSigner(_signer: Signer): Promise<void> {
    throw new Error('MockConnector: Method not implemented.');
  }

  private providerPromise = (): Promise<MockProvider | TEthersProvider> => {
    return Promise.resolve(this.provider);
  };

  public activate = async (): Promise<ConnectorUpdate> => {
    this.spyActivate();
    const account = await this.setMockAccount(0);
    this.mockSigner = this.provider.getSigner(account) as Signer;

    return { provider: await this.providerPromise(), chainId: this.mockChainId, account: account };
  };

  public getProvider = async (): Promise<MockProvider | TEthersProvider> => {
    return await this.providerPromise();
  };

  public getChainId = async (): Promise<number> => {
    return await Promise.resolve(this.mockChainId);
  };

  public async getAccount(): Promise<string> {
    const accounts = await this.provider.listAccounts();
    return await Promise.resolve(this.mockAccount ?? accounts[0]);
  }

  public async setMockAccount(hardhatAccountIndex: number): Promise<string> {
    const account = await getHardhatAccount(this.provider, hardhatAccountIndex);
    this.mockAccount = account;
    return account;
  }
  public deactivate(): void {
    this.spyDeactivate();
    return;
  }
}
