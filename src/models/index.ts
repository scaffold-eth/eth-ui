export * from './constants';
export * from './contractAppContextTypes';
export * from './contractTypes';
export * from './ethersAppContextTypes';
export * from './hookTypes';
export * from './networkTypes';
export * from './providerTypes';
export * from './utilityTypes';

export const isEsm = (): boolean => {
  console.log('Hello, World! from isEsm function');
  // The exports variable will be undefined in an ES module, but not in CommonJS
  // So, we can use it to discriminate between CommonJS and ES modules
  return typeof exports === 'undefined';
};
