import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { MockProvider } from 'ethereum-waffle';

import { getMockProvider } from '~helpers/getMockProvider';

// Modified from https://github.com/NoahZinsmeister/web3-react/blob/v6/packages/network-connector/src/index.ts
export class MockConnector extends AbstractConnector {
  private readonly provider: MockProvider;
  private readonly chainId: number;

  constructor(provider?: MockProvider, chainId?: number) {
    super();
    this.provider = provider ?? getMockProvider();
    this.chainId = chainId ?? 1337;
  }

  private providerPromise = (): Promise<MockProvider> => {
    return Promise.resolve(this.provider);
  };

  public activate = async (): Promise<ConnectorUpdate> => {
    return { provider: await this.providerPromise(), chainId: this.chainId, account: null };
  };

  public getProvider = async (): Promise<MockProvider> => {
    return await this.providerPromise();
  };

  public getChainId = async (): Promise<number> => {
    return await Promise.resolve(this.chainId);
  };

  public async getAccount(): Promise<null> {
    return await Promise.resolve(null);
  }

  public deactivate(): void {
    return;
  }
}
