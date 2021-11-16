import { TEthersAdaptor } from './contextTypes';

export type THookOptions = {
  ethersOverride?: {
    enabled: boolean;
    adaptor: TEthersAdaptor;
  };
  alternateEthersContextKey?: string;
  gettersAndSetters: boolean;
};

export const defaultOptions = (): THookOptions => {
  return {
    ethersOverride: undefined,
    alternateEthersContextKey: undefined,
    gettersAndSetters: false,
  };
};
