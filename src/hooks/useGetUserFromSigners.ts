import { Signer, Wallet } from 'ethers';
import { useEffect, useState } from 'react';

import { parseProviderOrSigner } from '~~/functions/parseProviderOrSigner';
import { TEthersProvider } from '~~/models';
import { TEthersUser } from '~~/models/contextTypes';

/**
 * #### Summary
 * Gets the user {@link TEthersUser} for a signer or wallet
 *
 * @category Hooks
 *
 * @param signer input signer
 * @returns
 */
export const useGetUserFromSigners = (signer: Signer | Wallet | undefined): TEthersUser | undefined => {
  const [resolvedSigner, setResolvedSigner] = useState<Signer>();
  const [provider, setProvider] = useState<TEthersProvider>();
  const [chainId, setChainId] = useState<number>();
  const [account, setAccount] = useState<string>();
  useEffect(() => {
    const getData = async (): Promise<void> => {
      const result = await parseProviderOrSigner(signer);
      if (result) {
        setResolvedSigner(result.signer);
        setProvider(result.provider);
        setAccount(result.account);
        setChainId(result.chainId);
      } else {
        setProvider(undefined);
        setResolvedSigner(signer);
        setChainId(undefined);
        setAccount(undefined);
      }
    };

    void getData();
  }, [signer]);

  if (resolvedSigner != null && provider != null && chainId != null && account != null) {
    const result: TEthersUser = {
      signer: resolvedSigner,
      provider,
      chainId,
      account,
    };
    return result;
  }

  return undefined;
};
