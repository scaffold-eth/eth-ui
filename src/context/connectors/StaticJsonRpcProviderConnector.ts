import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { IAbstractConnectorOptions } from 'web3modal';

export interface IStaticJsonRpcProviderConnectorOptions extends IAbstractConnectorOptions {
  rpc: { [chainId: number]: string };
  currentChainId: number;
}

export const ConnectToStaticJsonRpcProvider = async (
  _package: any,
  opts: IStaticJsonRpcProviderConnectorOptions
): Promise<StaticJsonRpcProvider> => {
  const url = opts.rpc[opts.currentChainId];
  const provider = new StaticJsonRpcProvider(url, opts.currentChainId);
  try {
    await provider.getNetwork();
    await provider.getBlockNumber();
    return provider;
  } catch (e) {
    throw e;
  }
};
