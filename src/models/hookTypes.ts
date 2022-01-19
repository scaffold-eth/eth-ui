import { QueryObserverOptions, QueryStatus } from 'react-query';

import { TEthersAdaptor } from './ethersAppContextTypes';

import { DeepPartial } from '~~/models/utilityTypes';

/**
 * #### Summary
 * An constant for block number interval of 10 blocks
 */
export const const_blockNumberIntervalShort: DeepPartial<TUpdateOptions> = { blockNumberInterval: 10 };

/**
 * #### Summary
 * An constant for block number interval of 50 blocks
 */
export const const_blockNumberIntervalMedium: DeepPartial<TUpdateOptions> = { blockNumberInterval: 50 };

/**
 * #### Summary
 * An constant for block number interval of 250 blocks
 */
export const const_blockNumberIntervalLong: DeepPartial<TUpdateOptions> = { blockNumberInterval: 250 };

export type TQueryOptions<GResult> = Omit<
  QueryObserverOptions<GResult, any>,
  'refetchInterval' | 'notifyOnChangeProps' | 'notifyOnChangePropsExclusions' | 'select'
>;

/**
 * #### Summary
 * Options for hooks that describe the behviour of updates.
 * By default, depending on the hook, it will update every block.
 *
 * ##### ✏️ Notes
 * The following options are available:
 * - interval: interval in blocknumber to update in (default 1) see {@link TUpdateOptions.blockNumberInterval}
 * - polling: in ms, should be over 10000ms.  This is set by {@link TUpdateOptions.query.refetchInterval}
 */
export type TUpdateOptions<GResult = any> = {
  /**
   * The interval in blocknumber for the hook to update in (default 1)
   */
  blockNumberInterval: number | undefined;
  refetchInterval?: number;
  query?: TQueryOptions<GResult>;
};

/**
 * #### Summary
 * Ethers Provider options.  By default, the context provider is used by the hook.  If you want to use a different provider, you can:
 * - pass in an {@link TEthersAdaptor} to override the provider
 * - give the alternateContextKey for a secondary context provider.
 *
 * ##### ✏️ Notes
 * Adaptor
 * - To create a adaptor from a provider/signer see {@link useGetEthersAdaptorFromSignerOrProvider}
 * - You need to set adaptorEnabled to true
 *
 * Alternate Context Key
 * - For more info on alternateContextKey, see {@link TEthersAppContextProps} and [web3-react docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).
 */
export type TOverride = {
  /**
   * An enable override adaptor (ethers provider) for this hook
   */
  adaptorEnabled: boolean;
  /**
   * The alternate adaptor to use.  See {@link TEthersAdaptor}
   */
  adaptor: TEthersAdaptor | undefined;

  /**
   * The alternate context key to use.  See {@link TEthersAppContextProps}
   */
  alternateContextKey?: string;
};

/**
 * An helper to create the default override settings for hooks
 * @returns {TOverride}
 */
export const defaultOverride = (): TOverride => {
  return {
    adaptorEnabled: false,
    adaptor: undefined,
    alternateContextKey: undefined,
  };
};

/**
 * A helper to create default update options for hooks
 * @returns {TUpdateOptions}
 */
export const defaultUpdateOptions = <GResult = any>(): TUpdateOptions<GResult> => {
  return {
    blockNumberInterval: 1,
    refetchInterval: undefined,
    query: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 30000,
    },
  };
};

export type THookResult<T> = [result: T, update: () => void, status: QueryStatus];
