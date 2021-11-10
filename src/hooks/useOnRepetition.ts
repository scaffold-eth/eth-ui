import { useCallback, useEffect, useRef } from 'react';

import { TEthersProvider } from '~~/models';

const DEBUG = false;

/**
 * Options for useOnRepetition
 */
interface IUseOnRepetitionOptions {
  /**
   * (number) :: if >0 use polling, else use instead of onBlock event.  the minimum polling time is 10s.
   */
  pollTime?: number;
  /**
   * (TEthersProvider)
   */
  provider?: TEthersProvider | undefined;
  /**
   * (boolean) :: invoke the callback after initialization
   */
  leadingTrigger?: boolean;
}

/**
 * #### Summary
 * A hook that will periodically invoke a callback.
 * It can use one of the two options to do so
 * - onBlock: the block event is used to invoke callback
 * - Polling: invoke the callback periodically via polling. The minimum time is 10s.
 *
 * #### Notes
 * The callback can be invoked once on leading edge when leadTrigger conditions are satisfied
 * - For example you may want to wait for the provider to initalize before first invocation.
 * - 👩🏽‍🏫 A provider is needed for onBlock.
 *
 * @category Hooks
 *
 * @param callback
 * @param options
 * @param args variable arguments for callback
 */
export const useOnRepetition = (
  callback: (..._args: any[]) => void | Promise<void>,
  options: IUseOnRepetitionOptions,
  ...args: any[]
): void => {
  const isPolling = options?.pollTime != null && options.pollTime > 0;
  const readyForEvents = options?.provider && !isPolling && options?.provider?.network.chainId > 0;
  const readyForLeadTrigger = (readyForEvents || isPolling) && options?.leadingTrigger;
  const isFirstCall = useRef(true);

  // created a strigified args to use for deps
  const argDeps = JSON.stringify(args ?? []);

  // create a callback for the input function
  const callFunctionWithArgs = useCallback(() => {
    if (DEBUG) console.log('create callback');
    if (callback) {
      if (args && args.length > 0) {
        void callback(...args);
      } else {
        void callback();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, argDeps]);

  // If event based, create a listener if we have a function & a provider
  const listener = useCallback(
    (_blockNumber: number): void => {
      if (readyForEvents) callFunctionWithArgs();
    },
    [callFunctionWithArgs, readyForEvents]
  );

  // connect a listener to the network to listen for changes
  useEffect(() => {
    if (readyForEvents) {
      options?.provider?.addListener?.('block', listener);
    }

    return (): void => {
      options?.provider?.removeListener?.('block', listener);
    };
  }, [options.provider, readyForEvents, listener]);

  // Set up the interval if its using polling
  useEffect(() => {
    const tick = (): void => {
      if (DEBUG) console.log('polling: call function');
      callFunctionWithArgs();
    };

    if (isPolling) {
      const safePollTime = (options?.pollTime ?? 0) > 10000 ? options.pollTime : 10000;
      const id = setInterval(tick, safePollTime);
      return (): void => {
        clearInterval(id);
      };
    }
  }, [options.pollTime, isPolling, callFunctionWithArgs]);

  // if the arguments have changed, reset the isFirstCall reference
  useEffect(() => {
    if (!isFirstCall.current) {
      isFirstCall.current = true;
    }
  }, [argDeps]);

  // trigger a first call to populate data.  Only if leadingTrigger is true
  useEffect(() => {
    if (readyForLeadTrigger && callFunctionWithArgs != null && isFirstCall?.current === true) {
      isFirstCall.current = false;
      callFunctionWithArgs();
    }
  }, [callFunctionWithArgs, readyForLeadTrigger]);
};
