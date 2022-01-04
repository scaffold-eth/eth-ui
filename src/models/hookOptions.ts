import { TEthersAdaptor } from './ethersAppContextTypes';

import { DeepPartial } from '~~/models/utilityTypes';

/**
 * interval of 100 blocks
 */
export const const_blockNumberInterval100: DeepPartial<THookOptions> = { update: { blockNumberInterval: 100 } };

export type THookOptions = {
  override: {
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

export const defaultHookOptions = (): THookOptions => {
  return {
    override: {
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
