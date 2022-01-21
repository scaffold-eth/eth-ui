import { MockProvider } from 'ethereum-waffle';

export const mineBlock = async (mockProvider: MockProvider): Promise<void> => {
  await mockProvider.send('evm_increaseTime', [3600]);
  await mockProvider.send('evm_mine', []);
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
  untilCondition: ((currentBlockNumber: number) => Promise<boolean>) | ((currentBlockNumber: number) => boolean)
): Promise<[success: boolean, currentBlockNumber: number]> => {
  let currentBlockNumber = await mockProvider.getBlockNumber();
  const initialBlockNumber = currentBlockNumber;
  while (!(await untilCondition(currentBlockNumber)) && maxNumberOfBlocks > currentBlockNumber - initialBlockNumber) {
    console.log('update', currentBlockNumber, initialBlockNumber, maxNumberOfBlocks);
    await mineBlock(mockProvider);
    currentBlockNumber = await mockProvider.getBlockNumber();
  }

  console.log('after', await mockProvider.getBlockNumber());
  const success = await untilCondition(currentBlockNumber);
  console.log('after2', await mockProvider.getBlockNumber());
  return [success, currentBlockNumber];
};
