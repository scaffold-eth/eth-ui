import { Provider } from '@ethersproject/providers';
import { BaseContract, Event } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { QueryClient } from 'react-query';
import { invariant } from 'ts-invariant';

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const signerStr: string = (providerOrSigner as any)?.address ?? '';
    if (provider && provider?.network) {
      return {
        provider: `${provider?.network?.chainId}_${signerStr}_${
          provider?.network?.name
        }_${provider?.connection.url.substring(0, 25)}`,
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

export const contractKey = (contract: BaseContract | undefined): Record<string, string> => {
  if (contract == null) return { contract: 'undefined contract' };

  const address = contract.address;
  const provider = providerKey(contract.provider as TEthersProvider | undefined);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const signerStr: string = (contract.signer as any)?.address ?? '';
  const fragments = contract.interface.fragments
    .map((m) => m.name)
    .reduce((oldValue, current) => {
      let newValue = oldValue;
      if (newValue == null) {
        newValue = '';
      }
      newValue += `${current},`;
      return newValue;
    }, '');

  return { contract: `${address}_${signerStr}_${fragments}`, ...provider };
};

export type TRequiredKeys = {
  namespace: string;
  key: string;
};

export type TKeyTypes = {
  provider?: string;
  adaptor?: string;
  contract?: string;
};

export const invalidateCache = (
  queryClient: QueryClient,
  namespace: string,
  otherKeys: TKeyTypes & { key?: string } = {},
  variables: Record<string, any> = {}
): void => {
  void queryClient?.invalidateQueries?.([{ namespace, ...otherKeys }, variables]);
};

export const logQueryCache = (
  queryClient: QueryClient,
  namespace: string,
  otherKeys: TKeyTypes & { key?: string } = {},
  variables: Record<string, any> = {}
): void => {
  invariant.log(queryClient.getQueriesData([{ namespace, ...otherKeys }, variables]));
};
