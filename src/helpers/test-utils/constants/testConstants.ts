export const const_basicGasPrice = 875000000;

export const const_DefaultTestChainId = 31337;

/**
 *
 * This is a const based on WaitOptions from react testing lib
 */
export const defaultBlockWaitOptions: { timeout: number; interval: number } = {
  timeout: 11_000,
  interval: 250,
} as const;
