import { TEthersAdaptor } from './ethersAppContextTypes';

import { DeepPartial } from '~~/models/utilityTypes';

/**
 * interval of 100 blocks
 */
export const const_blockNumberInterval100: DeepPartial<TUpdateOptions> = { blockNumberInterval: 100 };

export type TUpdateOptions = {
  blockNumberInterval: number;
  query: {
    refetchOnWindowFocus: boolean;
    refetchOnMount: boolean;
    staleTime: number;
    refetchInterval: number | undefined;
  };
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
export const defaultUpdateOptions = (): TUpdateOptions => {
  return {
    blockNumberInterval: 1,
    query: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 30000,
      refetchInterval: undefined,
    },
  };
};
