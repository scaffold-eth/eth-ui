import { merge } from 'merge-anything';

import { TEthersAdaptor } from './ethersAppContextTypes';

import { DeepPartial } from '~~/models/utilityTypes';

/**
 * interval of 100 blocks
 */
export const const_blockNumberInterval100: DeepPartial<THookOptions> = { update: { blockNumberInterval: 100 } };

export type THookOptions = {
  contextOverride: {
    adaptorEnabled: boolean;
    adaptor: TEthersAdaptor | undefined;
    alternateContextKey?: string;
  };
  update: {
    blockNumberInterval: number;
    query: {
      refetchOnWindowFocus: boolean;
      refetchOnMount: boolean;
      staleTime: number;
      refetchInterval: number | undefined;
    };
  };
};

const defaultHookOptions = (): THookOptions => {
  return {
    contextOverride: {
      adaptorEnabled: false,
      adaptor: undefined,
      alternateContextKey: undefined,
    },
    update: {
      blockNumberInterval: 1,
      query: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 30000,
        refetchInterval: undefined,
      },
    },
  };
};

export const mergeDefaultHookOptions = (...overrides: DeepPartial<THookOptions>[]): THookOptions => {
  const defaultOptions: THookOptions = defaultHookOptions();

  if (overrides?.length > 0) {
    return merge(defaultOptions, ...overrides);
  }

  return defaultOptions;
};
