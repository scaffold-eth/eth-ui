// import { expect } from 'chai';

// import { useBlockNumberContext } from '~~/context';
// import { hookTestHarness } from '~~/helpers/test-utils';
// import { mineBlock } from '~~/helpers/test-utils/eth';
// import { useBlockNumber } from '~~/hooks';

// const InitializationHook = (): number | undefined => {
//   return useBlockNumberContext();
// };

// describe('useBlockNumber', function () {
//   let initialBlockNumber = 0;
//   before(async () => {
//     const harness = await hookTestHarness(() => InitializationHook());
//     initialBlockNumber = await harness.mockProvider.getBlockNumber();
//     console.log('initial block number', initialBlockNumber);
//   });

//   it('When the hook called without a new block arriving, useBlockNumber gets the current blockNumber', async () => {
//     const harness = await hookTestHarness(() => useBlockNumber());

//     expect(await harness.mockProvider.getBlockNumber()).to.exist;
//     expect(initialBlockNumber).to.exist;
//     expect(harness.result.current).to.equal(initialBlockNumber);
//   });

//   it('When the a new block arrives, useBlockNumberContext updates to the latest value', async () => {
//     const harness = await hookTestHarness(() => useBlockNumber());

//     // mine a block
//     await mineBlock(harness.mockProvider);
//     expect(await harness.mockProvider.getBlockNumber()).to.equal(initialBlockNumber + 1);

//     // await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
//     expect(harness.result.current).equal(initialBlockNumber + 1);

//     // mine another block
//     await mineBlock(harness.mockProvider);
//     expect(await harness.mockProvider.getBlockNumber()).to.equal(initialBlockNumber + 2);

//     // await harness.waitForValueToChange(() => harness.result.current, defaultBlockWaitOptions);
//     expect(harness.result.current).equal(initialBlockNumber + 2);
//   });
// });
