import { MockProvider } from 'ethereum-waffle';
import { Signer } from 'ethers';

import { MockConnector } from '~~/helpers/test-utils/harness/wrapper/MockConnector';

export const isActive = async (connector: MockConnector): Promise<boolean> => {
  const active =
    connector != null &&
    (await connector.getChainId()) != null &&
    (await connector.getProvider()) != null &&
    (await connector.getAccount()) != null;
  return active;
};

export const waitForActivation = async (callback: () => Promise<boolean>): Promise<void> => {
  let timeout = false;
  void setTimeout(() => {
    timeout = true;
  }, 2000);
  while (!(await callback()) && !timeout) {
    // sleep for 100ms
    await (async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 100)))();
  }
};

export const getHardhatAccount = async (provider: MockProvider, hardhatAccountIndex: number): Promise<string> => {
  const accounts = await provider.listAccounts();
  if (accounts?.[hardhatAccountIndex] == null) {
    const error = new Error('MockConnector: unknown mock hardhat account');
    console.error(error);
    throw error;
  }
  return accounts[hardhatAccountIndex];
};

export const getHardhatSigner = async (provider: MockProvider, hardhatAccountIndex: number): Promise<Signer> => {
  const accounts = await provider.listAccounts();
  if (accounts?.[hardhatAccountIndex] == null) {
    const error = new Error('MockConnector: unknown mock hardhat account');
    console.error(error);
    throw error;
  }
  return provider.getSigner(accounts[hardhatAccountIndex]);
};
