import { TEthersAdaptor } from './contextTypes';

export type THookOptions = {
  ethersOverride?: {
    enabled: boolean;
    adaptor: TEthersAdaptor;
  };
  alternateEthersContextKey?: string;
  returnGettersAndSetters: boolean;
};

export const defaultOptions = (): THookOptions => {
  return {
    ethersOverride: undefined,
    alternateEthersContextKey: undefined,
    returnGettersAndSetters: false,
  };
};
