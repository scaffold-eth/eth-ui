import { Provider } from '@ethersproject/providers';
import { Event } from 'ethers';
import { Result } from 'ethers/lib/utils';

import { isValidEthersAdaptor } from '~~/functions';
import { TEthersAdaptor, TEthersProvider, TEthersProviderOrSigner, TypedEvent } from '~~/models';

export const providerKey = (providerOrSigner: TEthersProviderOrSigner | undefined): Record<string, string> => {
  if (providerOrSigner == null) return { provider: 'undefined provider' };

  if (providerOrSigner instanceof Provider) {
    return {
      provider: `${providerOrSigner?.network?.chainId}_${
        providerOrSigner?.network?.name
      }_${providerOrSigner?.connection.url.substring(0, 25)}`,
    };
  } else {
    const provider = providerOrSigner.provider as TEthersProvider;
    if (provider && provider?.network) {
      return {
        provider: `${provider?.network?.chainId}_${provider?.network?.name}_${provider?.connection.url.substring(
          0,
          25
        )}`,
      };
    }
  }

  return { provider: 'unknown provider' };
};

export const adaptorKey = (adaptor: TEthersAdaptor | undefined): Record<string, string> => {
  if (adaptor == null && !isValidEthersAdaptor(adaptor)) return { adaptor: 'undefined adaptor' };

  if (adaptor?.signer != null && adaptor.account != null && adaptor.provider != null) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return { adaptor: `${adaptor.chainId?.toString()}_${adaptor?.account}_${providerKey(adaptor?.provider ?? '')}` };
  } else if (adaptor?.provider) {
    return providerKey(adaptor?.provider);
  }
  return { adaptor: 'unknown adaptor' };
};

export const eventKey = (m: Event | TypedEvent<Result>): string => {
  return `${m.transactionHash}_${m.logIndex}`;
};
