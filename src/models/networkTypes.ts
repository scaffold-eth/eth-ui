/**
 * #### Summary
 * A type that describes a network for applications
 *
 * @category Models
 */
export type TNetworkInfo = {
  name: string;
  color: string;
  chainId: number;
  rpcUrl: string;
  faucet?: string;
  blockExplorer: string;
  price?: number;
  gasPrice?: number;
};
