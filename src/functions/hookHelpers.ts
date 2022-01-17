import { merge } from 'merge-anything';
import { invariant } from 'ts-invariant';

import { asEthersAdaptor } from './ethersHelpers';

import {
  TOverride,
  IEthersContext,
  TEthersAdaptor,
  defaultOverride,
  TUpdateOptions,
  defaultUpdateOptions,
  TQueryOptions,
} from '~~/models';
import { DeepPartial } from '~~/models/utilityTypes';

export const ethersOverride = (context: IEthersContext, options: TOverride): Readonly<TEthersAdaptor> => {
  // check if there is an override
  if (options.adaptorEnabled) {
    invariant(
      options.alternateContextKey == null,
      'You cannot use both contextOverride and contextKey at the same time'
    );

    return options.adaptor ?? {};
  }

  return asEthersAdaptor(context);
};

export const checkUpdateOptions = (update: TUpdateOptions): void => {
  // check if there is an override
  if (update.refetchInterval) {
    invariant(
      update.refetchInterval == null || update.refetchInterval >= 10000,
      'Invalid refetchInterval (polling), must be at least 10000ms or undefined (disabled)'
    );
    invariant(
      update.blockNumberInterval == null,
      'You cannot use both refetchInterval (polling) and blockNumberInterval at the same time'
    );
  } else if (update.blockNumberInterval == null) {
    invariant(
      update.blockNumberInterval != null,
      'Invalid blockNumberInterval, it cannot be undefined unless polling is used'
    );
  } else {
    invariant(update.blockNumberInterval > 0, 'Invalid blockNumberInterval, must be greater than 0');
  }
};

export const mergeDefaultOverride = (...overrides: DeepPartial<TOverride>[]): TOverride => {
  const defaultOptions: TOverride = defaultOverride();

  if (overrides?.length > 0) {
    return merge(defaultOptions, ...overrides);
  }

  return defaultOptions;
};

export const mergeDefaultUpdateOptions = <GResult = any>(
  ...overrides: DeepPartial<TUpdateOptions<GResult>>[]
): TUpdateOptions<GResult> => {
  const mergedOverrides = merge({}, ...overrides) as TUpdateOptions<GResult>;
  const defaultOptions: TUpdateOptions = defaultUpdateOptions();

  if (overrides?.length > 0) {
    // since check passed on overrides, if polling is enabled, then blockNumberInterval must have been disabled
    if (mergedOverrides.refetchInterval) {
      checkUpdateOptions(mergedOverrides);
      defaultOptions.blockNumberInterval = undefined;
    }
    return merge(defaultOptions, mergedOverrides);
  }

  return defaultOptions;
};

export const setContextOverride = (adaptor: TEthersAdaptor | undefined, enabled: boolean = true): TOverride => {
  return mergeDefaultOverride({ adaptor, adaptorEnabled: enabled });
};

export const processQueryOptions = <GResult>(
  options: TUpdateOptions<GResult>
): typeof options.query & { refetchInterval?: number } => {
  checkUpdateOptions(options);

  const queryOptions: TQueryOptions<GResult> & { refetchInterval?: number } = { ...options.query };
  if (options.refetchInterval) {
    queryOptions.enabled = true;
    queryOptions.refetchInterval = options.refetchInterval;
  }
  return queryOptions;
};
