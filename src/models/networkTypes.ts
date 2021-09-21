/**
 * Simple type to describe a network in scaffold-eth
 */
export type TNetwork = {
  name: string;
  color: string;
  chainId: number;
  rpcUrl: string;
  faucet?: string;
  blockExplorer: string;
  price?: number;
  gasPrice?: number;
};
