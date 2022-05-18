import { JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { ethers, Signer } from 'ethers';
import { invariant } from 'ts-invariant';

import { isValidEthersAdaptor } from '~~/functions';
import { TEthersProviderOrSigner, TEthersProvider } from '~~/models';
import { TEthersAdaptor } from '~~/models/ethersAppContextTypes';

const isProvider = (providerOrSigner: TEthersProviderOrSigner | undefined): boolean => {
  const casted = providerOrSigner as TEthersProvider;

  if (
    providerOrSigner instanceof JsonRpcProvider ||
    providerOrSigner instanceof Web3Provider ||
    providerOrSigner instanceof StaticJsonRpcProvider
  ) {
    return true;
  } else if (
    casted?._isProvider &&
    casted?.getNetwork != null &&
    typeof casted?.getNetwork == 'function' &&
    casted.listAccounts != null &&
    typeof casted.listAccounts == 'function'
  ) {
    // fallback check incase of inter library calls and differences in deps.
    return true;
  }
  return false;
};

const isSigner = (providerOrSigner: TEthersProviderOrSigner | undefined): boolean => {
  const casted = providerOrSigner as Signer;

  if (providerOrSigner instanceof ethers.Signer) {
    return true;
  } else if (
    casted?._isSigner &&
    typeof casted?.provider != null &&
    casted?.signMessage != null &&
    typeof casted?.signMessage == 'function'
  ) {
    // fallback check incase of inter library calls and differences in deps.
    return true;
  }
  return false;
};

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

  try {
    if (isProvider(providerOrSigner)) {
      const casted = providerOrSigner as TEthersProvider;
      provider = casted;
      providerNetwork = await casted.getNetwork();
      const accounts = await casted.listAccounts();
      if (accounts && accounts.length > 0) {
        signer = casted.getSigner();
      }
    }

    if (!signer && isSigner(providerOrSigner)) {
      const casted = providerOrSigner as Signer;
      signer = casted;
      provider = casted.provider;
      providerNetwork = casted.provider && (await casted.provider.getNetwork());
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
  } catch (error) {
    invariant.warn('parseProviderOrSigner error:', error, providerOrSigner);
  }

  return undefined;
};
