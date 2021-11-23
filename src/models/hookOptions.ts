import { TEthersAdaptor } from './contextTypes';

export type THookOptions = {
  ethersOverride?: {
    enabled: boolean;
    adaptor: TEthersAdaptor;
  };
  alternateEthersContextKey?: string;
};

export const defaultHookOptions = (): THookOptions => {
  return {
    ethersOverride: undefined,
    alternateEthersContextKey: undefined,
  };
};
