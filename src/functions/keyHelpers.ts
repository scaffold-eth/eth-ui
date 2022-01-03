import { Provider } from '@ethersproject/providers';

import { isValidEthersAdaptor } from '~~/functions';
import { TEthersAdaptor, TEthersProvider } from '~~/models';

export const providerKey = (providerOrSigner: TEthersProvider | undefined): string => {
  if (providerOrSigner == null) return 'undefined provider';

  if (providerOrSigner instanceof Provider) {
    return `${providerOrSigner?.network?.chainId}_${
      providerOrSigner?.network?.name
    }_${providerOrSigner?.connection.url.substring(0, 25)}`;
  }

  return 'unknown provider';
};

export const adaptorKey = (adaptor: TEthersAdaptor | undefined): string => {
  if (adaptor == null && !isValidEthersAdaptor(adaptor)) return 'undefined adaptor';

  if (adaptor?.signer != null && adaptor.account != null && adaptor.provider != null) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${adaptor.chainId?.toString()}_${adaptor?.account}_${providerKey(adaptor?.provider ?? '')}`;
  } else if (adaptor?.provider) {
    return providerKey(adaptor?.provider);
  }
  return 'unknown adaptor';
};
