import { JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { ethers, Signer } from 'ethers';

import { TEthersUser, TEthersProviderOrSigner } from '~~/models';

/**
 * #### Summary
 * Parse {@link TEthersProviderOrSigner} to {@link TEthersUser}
 * Get the TEthersUser from a provider or signer
 *
 * @category Functions
 *
 * @param providerOrSigner TEthersProviderOrSigner
 * @returns TProviderAndSigner
 */
export const parseProviderOrSigner = async (
  providerOrSigner: TEthersProviderOrSigner | undefined
): Promise<TEthersUser> => {
  let signer: Signer | undefined;
  let provider: ethers.providers.Provider | undefined;
  let providerNetwork: ethers.providers.Network | undefined;

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

  return { signer, provider, providerNetwork } as TEthersUser;
};
