import { TEthersAdaptor } from './ethersAppContextTypes';

export type THookOptions = {
  adaptorOverrride?: {
    enabled: boolean;
    adaptor: TEthersAdaptor | undefined;
  };
  alternateContextOverride?: string;
};

export const defaultHookOptions = (): THookOptions => {
  return {
    adaptorOverrride: undefined,
    alternateContextOverride: undefined,
  };
};
