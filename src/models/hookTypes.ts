import { QueryObserverOptions, QueryStatus } from 'react-query';

import { TEthersAdaptor } from './ethersAppContextTypes';

import { DeepPartial } from '~~/models/utilityTypes';

/**
 * interval of 100 blocks
 */
export const const_blockNumberInterval100: DeepPartial<TUpdateOptions> = { blockNumberInterval: 100 };

export type TQueryOptions<GResult> = Omit<
  QueryObserverOptions<GResult, any>,
  'refetchInterval' | 'onError' | 'onSuccess' | 'notifyOnChangeProps' | 'notifyOnChangePropsExclusions' | 'select'
>;

export type TUpdateOptions<GResult = any> = {
  blockNumberInterval: number;
  refetchInterval: number | undefined;
  query: TQueryOptions<GResult>;
};

export type TOverride = {
  adaptorEnabled: boolean;
  adaptor: TEthersAdaptor | undefined;
  alternateContextKey?: string;
};

export const defaultOverride = (): TOverride => {
  return {
    adaptorEnabled: false,
    adaptor: undefined,
    alternateContextKey: undefined,
  };
};
export const defaultUpdateOptions = <GResult = any>(): TUpdateOptions<GResult> => {
  return {
    blockNumberInterval: 1,
    refetchInterval: undefined,
    query: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 30000,
    },
  };
};

export type THookResult<T> = [result: T, update: () => void, status: QueryStatus];
