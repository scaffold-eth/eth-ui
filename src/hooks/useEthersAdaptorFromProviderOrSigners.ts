import { Signer } from 'ethers';
import { useState, useCallback, useEffect } from 'react';

import { isValidEthersAdaptor } from '~~/functions';
import { parseProviderOrSigner } from '~~/functions/parseProviderOrSigner';
import { TEthersProvider, TEthersProviderOrSigner } from '~~/models';
import { keyNamespace } from '~~/models/constants';
import { TEthersAdaptor } from '~~/models/ethersAppContextTypes';

const queryKey = { namespace: keyNamespace.network, key: 'useGetEthersAdaptorFromProviderOrSigners' } as const;

/**
 * #### Summary
 * Gets the user {@link TEthersUser} for a signer or wallet
 *
 * @category Hooks
 *
 * @param providerOrSigner input signer
 * @returns
 */
export const useEthersAdaptorFromProviderOrSigners = (
  providerOrSigner: TEthersProviderOrSigner | undefined
): [adaptor: TEthersAdaptor | undefined, update: () => void] => {
  const [resolvedSigner, setResolvedSigner] = useState<Signer>();
  const [provider, setProvider] = useState<TEthersProvider>();
  const [chainId, setChainId] = useState<number>();
  const [account, setAccount] = useState<string>();

  const update = useCallback(async (): Promise<void> => {
    const result = await parseProviderOrSigner(providerOrSigner);
    if (result && isValidEthersAdaptor(result)) {
      setResolvedSigner(result.signer);
      setProvider(result.provider);
      setAccount(result.account);
      setChainId(result.chainId);
    } else {
      setProvider(undefined);
      setResolvedSigner(undefined);
      setChainId(undefined);
      setAccount(undefined);
    }
  }, [providerOrSigner]);

  useEffect(() => {
    void update();
  }, [update]);

  const result: TEthersAdaptor = {
    signer: resolvedSigner,
    provider,
    chainId,
    account,
  } as const;
  return [result, update];
};
