import { MockProvider } from 'ethereum-waffle';

export const mineBlock = async (mockProvider: MockProvider): Promise<void> => {
  const blockNumber1 = await mockProvider.getBlockNumber();
  await mockProvider.send('evm_increaseTime', [3600]);
  await mockProvider.send('evm_mine', []);
  const blockNumber2 = await mockProvider.getBlockNumber();
  if (!(blockNumber1 + 1 === blockNumber2)) {
    console.error('blocknumber was not mined as expected', blockNumber1, blockNumber2);
  }
};

export const setAutoMine = async (mockProvider: MockProvider, enabled: boolean): Promise<void> => {
  await mockProvider.send('evm_setAutomine', [enabled]);
};

/**
 * #### Summary
 * mine block until the a condition is met or a maximumNumberOfBlocks is reached
 * @param mockProvider
 * @param untilCondition
 * @param maxNumberOfBlocks
 * @returns [success, currentBlockNumber]
 */
export const mineBlockUntil = async (
  mockProvider: MockProvider,
  maxNumberOfBlocks: number,
  untilCondition:
    | ((currentBlockNumber: number) => Promise<boolean>)
    | ((currentBlockNumber: number) => boolean)
    | ((currentBlockNumber: number) => Promise<void>)
): Promise<[success: boolean, currentBlockNumber: number]> => {
  let currentBlockNumber = await mockProvider.getBlockNumber();
  const initialBlockNumber = currentBlockNumber;
  while (!(await untilCondition(currentBlockNumber)) && maxNumberOfBlocks >= currentBlockNumber - initialBlockNumber) {
    await mineBlock(mockProvider);
    currentBlockNumber = await mockProvider.getBlockNumber();
  }
  const success = await untilCondition(currentBlockNumber);
  return [success ?? true, currentBlockNumber];
};
