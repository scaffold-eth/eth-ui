export * from './asyncHelpers';
export * from './ethersHelpers';
export * from './hookHelpers';
export * from './keyHelpers';
export * from './parseProviderOrSigner';
// export * from './sortContracts';

export const isEsm = (): boolean => {
  console.log('Hello, World! from isEsm function');
  // The exports variable will be undefined in an ES module, but not in CommonJS
  // So, we can use it to discriminate between CommonJS and ES modules
  return typeof exports === 'undefined';
};
