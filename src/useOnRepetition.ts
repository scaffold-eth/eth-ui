import { Provider } from '@ethersproject/providers';
import { useCallback, useEffect, useRef } from 'react';

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
  provider?: Provider | undefined;
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
  const readyForEvents = options?.provider && !isPolling;
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
  }, [callback, argDeps, args]);

  // If event based, create a listener if we have a function & a provider
  const listener = useCallback(
    (_blockNumber: number): void => {
      if (readyForEvents) callFunctionWithArgs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callFunctionWithArgs, readyForEvents]
  );

  // connect a listener to the network to listen for changes
  useEffect(() => {
    if (options?.provider != null && readyForEvents) {
      options?.provider?.addListener?.('block', listener);
      listener(0);
      return (): void => {
        options?.provider?.removeListener?.('block', listener);
      };
    } else {
      return (): void => {
        /* do nothing */
      };
    }
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

  // trigger a first call to populate data.  Only if leadingTrigger is true
  useEffect(() => {
    if (readyForLeadTrigger && callFunctionWithArgs != null && isFirstCall?.current === true) {
      isFirstCall.current = false;
      callFunctionWithArgs();
    }
  }, [callFunctionWithArgs, readyForLeadTrigger]);
};
