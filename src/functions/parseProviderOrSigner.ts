import { JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { ethers, Signer } from 'ethers';

import { TEthersProviderOrSigner, TEthersProvider } from '~~/models';
import { TEthersAdaptor } from '~~/models/ethersContextTypes';

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
): Promise<Required<TEthersAdaptor> | undefined> => {
  let signer: Signer | undefined;
  let provider: ethers.providers.Provider | undefined;
  let providerNetwork: ethers.providers.Network | undefined;
  let account: string | undefined;

  if (
    providerOrSigner &&
    (providerOrSigner instanceof JsonRpcProvider ||
      providerOrSigner instanceof Web3Provider ||
      providerOrSigner instanceof StaticJsonRpcProvider)
  ) {
    const accounts = await providerOrSigner.listAccounts();
    if (accounts && accounts.length > 0) {
      signer = providerOrSigner.getSigner();
    }
    provider = providerOrSigner;
    providerNetwork = await providerOrSigner.getNetwork();
  }

  if (!signer && providerOrSigner instanceof Signer) {
    signer = providerOrSigner;
    provider = signer.provider;
    providerNetwork = provider && (await provider.getNetwork());
  }

  if (signer) {
    account = await signer?.getAddress();
  }

  if (signer != null && provider != null && providerNetwork?.chainId != null && account != null) {
    const result: TEthersAdaptor = {
      signer,
      provider: provider as TEthersProvider,
      chainId: providerNetwork.chainId,
      account,
    };
    return result as Required<TEthersAdaptor>;
  }

  return undefined;
};
