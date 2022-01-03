import { merge } from 'merge-anything';

import { TEthersAdaptor } from './ethersAppContextTypes';

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

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const defaultHookOptions = (overrides?: DeepPartial<THookOptions>): THookOptions => {
  const defaultOptions: THookOptions = {
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

  if (overrides) {
    return merge(defaultOptions, overrides as Partial<THookOptions>);
  }

  return defaultOptions;
};
