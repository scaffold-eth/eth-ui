import { Provider } from '@ethersproject/providers';
import { useCallback, useEffect, useRef } from 'react';

const DEBUG = false;

interface TOptions {
  /**
   * (number) :: if >0 use polling, else use instead of onBlock event
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
 * A combination of useOnBlock and usePoller
 * helper hook to call a function regularly at time intervals when the block changes
 * @param provider ethers/web3 provider
 * @param callback any function
 * @param args function parameters
 */
/**
 * A combination of useOnBlock and usePoller
 * - the hook will invoke a callback regularly on the "block" event.  If a pollTime is provided,
 * it will use that instead.
 * - the hook will invoke the callback when the leadTrigger changes state to true as a leading invokation
 * @param callback (func) :: callback funciton, can have variable args
 * @param options (TOptions)
 * @param args varargs callback function arguments
 */
export const useOnRepetition = (
  callback: (..._args: any[]) => void | Promise<void>,
  options: TOptions,
  ...args: any[]
): void => {
  const polling = options?.pollTime != null && options.pollTime > 0;
  const leadingCall = useRef(true);

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
  }, [callback, args]);

  // Turn on the listener if we have a function & a provider
  const listener = useCallback(
    (_blockNumber: number): void => {
      if (DEBUG) console.log('listen block event', _blockNumber, ...args);
      if (options.provider) callFunctionWithArgs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callFunctionWithArgs, options.provider]
  );

  // connect a listener to the network to listen for changes
  useEffect(() => {
    if (options.provider && !polling) {
      if (DEBUG) console.log('register block event', ...args);
      options.provider.addListener('block', listener);
      return (): void => {
        if (DEBUG) console.log('unregister block event', ...args);
        options?.provider?.removeListener('block', listener);
      };
    } else {
      return (): void => {
        /* do nothing */
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.provider, polling, listener]);

  // Set up the interval if its using polling
  useEffect(() => {
    const tick = (): void => {
      if (DEBUG) console.log('polling: call function');
      callFunctionWithArgs();
    };

    if (polling && options?.pollTime) {
      const safePollTime = options?.pollTime > 10000 ? options.pollTime : 10000;
      const id = setInterval(tick, safePollTime);
      return (): void => {
        clearInterval(id);
      };
    }
  }, [options.pollTime, polling, callFunctionWithArgs]);

  // trigger a first call to populate data.  Only if leadingTrigger is true
  useEffect(() => {
    if (options.leadingTrigger && callFunctionWithArgs != null && leadingCall?.current === true) {
      if (polling || (!polling && options.provider)) {
        leadingCall.current = false;
        callFunctionWithArgs();
      }
    }
  }, [options.leadingTrigger, callFunctionWithArgs, options.provider, polling]);
};
