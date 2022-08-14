import { JsonRpcSigner } from '@ethersproject/providers';
// @ts-ignore
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { MockProvider } from 'ethereum-waffle';
import { Signer } from 'ethers';

import { MockConnector } from '~~/helpers/test-utils/wrapper/MockConnector';

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

export type THardhatAccountsNames = 'deployer' | 'user1' | 'user2' | 'user3' | 'user4' | 'user5' | 'governance';

export type THardhatAccounts = Record<THardhatAccountsNames, SignerWithAddress>;
export const getTestAccounts = async (
  provider: MockProvider
): Promise<{ [names in THardhatAccountsNames]: string }> => {
  const accounts = await provider.listAccounts();

  return {
    deployer: accounts[0],
    user1: accounts[1],
    user2: accounts[2],
    user3: accounts[3],
    user4: accounts[4],
    user5: accounts[5],
    governance: accounts[10],
  };
};

export const getTestSigners = async (
  provider: MockProvider
): Promise<{ [names in THardhatAccountsNames]: JsonRpcSigner }> => {
  const accounts = await provider.listAccounts();

  return {
    deployer: provider.getSigner(accounts[0]),
    user1: provider.getSigner(accounts[1]),
    user2: provider.getSigner(accounts[2]),
    user3: provider.getSigner(accounts[3]),
    user4: provider.getSigner(accounts[4]),
    user5: provider.getSigner(accounts[5]),
    governance: provider.getSigner(accounts[10]),
  };
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
