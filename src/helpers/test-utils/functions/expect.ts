import { expect } from 'chai';
import { Wallet } from 'ethers';

export const expectValidWallets = (...wallets: Wallet[]): void => {
  wallets.forEach((w) => expect(w.address).to.be.properAddress);
};
