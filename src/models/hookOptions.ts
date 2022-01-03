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

export const defaultHookOptions = (): THookOptions => {
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
