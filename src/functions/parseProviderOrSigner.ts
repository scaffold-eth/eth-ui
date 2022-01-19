import { JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { ethers, Signer } from 'ethers';

import { isValidEthersAdaptor } from '~~/functions';
import { TEthersProviderOrSigner, TEthersProvider } from '~~/models';
import { TEthersAdaptor } from '~~/models/ethersAppContextTypes';

/**
 * #### Summary
 * Parse {@link TEthersProviderOrSigner} to {@link TEthersUser}
 * Get the TEthersUser from a provider or signer
 *
 * @category Helpers
 *
 * @param providerOrSigner TEthersProviderOrSigner
 * @returns TProviderAndSigner
 */
export const parseProviderOrSigner = async (
  providerOrSigner: TEthersProviderOrSigner | undefined
): Promise<Readonly<TEthersAdaptor> | undefined> => {
  let signer: Signer | undefined;
  let provider: ethers.providers.Provider | undefined;
  let providerNetwork: ethers.providers.Network | undefined;
  let account: string | undefined;

  if (
    providerOrSigner instanceof JsonRpcProvider ||
    providerOrSigner instanceof Web3Provider ||
    providerOrSigner instanceof StaticJsonRpcProvider
  ) {
    provider = providerOrSigner;
    providerNetwork = await providerOrSigner.getNetwork();
    const accounts = await providerOrSigner.listAccounts();
    if (accounts && accounts.length > 0) {
      signer = providerOrSigner.getSigner();
    }
  }

  if (!signer && providerOrSigner instanceof Signer) {
    signer = providerOrSigner;
    provider = signer.provider;
    providerNetwork = provider && (await provider.getNetwork());
  }

  if (signer) {
    account = await signer?.getAddress();
  }

  const result: TEthersAdaptor = {
    signer,
    provider: provider as TEthersProvider,
    chainId: providerNetwork?.chainId,
    account,
  } as const;

  if (isValidEthersAdaptor(result)) return result;

  return undefined;
};
