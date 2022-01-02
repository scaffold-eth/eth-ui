import { Signer, Wallet } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import { parseProviderOrSigner } from '~~/functions/parseProviderOrSigner';
import { TEthersProvider } from '~~/models';
import { TEthersAdaptor } from '~~/models/ethersAppContextTypes';

/**
 * #### Summary
 * Gets the user {@link TEthersUser} for a signer or wallet
 *
 * @category Hooks
 *
 * @param signer input signer
 * @returns
 */
export const useGetEthersAdaptorFromSigners = (signer: Signer | Wallet | undefined): TEthersAdaptor | undefined => {
  const [resolvedSigner, setResolvedSigner] = useState<Signer>();
  const [provider, setProvider] = useState<TEthersProvider>();
  const [chainId, setChainId] = useState<number>();
  const [account, setAccount] = useState<string>();

  const update = useCallback(async (): Promise<void> => {
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
  }, [signer]);

  useEffect(() => {
    void update();
  }, [update]);

  const result: TEthersAdaptor = {
    signer: resolvedSigner,
    provider,
    chainId,
    account,
  };
  if (result.account == null && provider == null && signer == null && chainId == null) {
    return undefined;
  }
  return result;
};
