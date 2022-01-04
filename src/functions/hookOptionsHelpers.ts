import { invariant } from 'ts-invariant';

import { asEthersAdaptor } from './ethersHelpers';

import { THookOptions, IEthersContext, TEthersAdaptor } from '~~/models';

export const ethersOverride = (context: IEthersContext, options: THookOptions): Readonly<TEthersAdaptor> => {
  // check if there is an override
  if (options.contextOverride.adaptorEnabled) {
    invariant(
      options.contextOverride.alternateContextKey == null,
      'You cannot use both contextOverride and contextKey at the same time'
    );

    return options.contextOverride.adaptor ?? {};
  }

  return asEthersAdaptor(context);
};

export const checkUpdateOptions = (context: IEthersContext, options: THookOptions): void => {
  // check if there is an override
  if (options.update.query.refetchInterval) {
    invariant(
      options.update.query.refetchInterval == null || options.update.query.refetchInterval >= 10000,
      'Invalid refetchInterval (polling), must be at least 10000ms or undefined (disabled)'
    );
    invariant(
      options.update.blockNumberInterval == null,
      'You cannot use both refetchInterval (polling) and blockNumberInterval at the same time'
    );
  } else {
    invariant(options.update.blockNumberInterval > 0, 'Invalid blockNumberInterval, must be greater than 0');
  }
};
