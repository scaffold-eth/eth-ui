export * from './useAreSignerEqual';
export * from './useBalance';
export * from './useBlockNumber';
export * from './useBurnerSigner';
export * from './useContractExistsAtAddress';
export * from './useContractLoader';
export * from './useContractReader';
export * from './useContractReaderUntyped';
export * from './useEthersAdaptorFromProviderOrSigners';
export * from './useEthersUpdater';
export * from './useEventListener';
export * from './useGasPrice';
export * from './useNonce';
export * from './useSignerAddress';
export * from './useSignerChainId';
export * from './useTimestamp';
export * from './useCheckIsMounted';

export const isEsmIndex = (): boolean => {
  console.log('Hello, World! from isEsm function');
  // The exports variable will be undefined in an ES module, but not in CommonJS
  // So, we can use it to discriminate between CommonJS and ES modules
  return typeof exports === 'undefined';
};
