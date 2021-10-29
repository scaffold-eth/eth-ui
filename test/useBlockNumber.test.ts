// import { expect } from 'chai';

// import { hookTestHarness } from '~~/helpers/test-utils';
// import { mineBlock } from '~~/helpers/test-utils/eth/hardhatActions';
// import { useBlockNumber } from '~~/hooks';

// describe('useBlockNumber', function () {
//   it('When the provider receives a new block, then the block returns the block number', async () => {
//     const harness = await hookTestHarness(() => useBlockNumber());
//     let blockNumber: number | undefined = undefined;
//     blockNumber = await harness.mockProvider.getBlockNumber();
//     expect(blockNumber).to.equal(0);
//     expect(harness.result.current).to.equal(0);

//     // mine a block
//     await mineBlock(harness.mockProvider);
//     harness.rerender(() => useBlockNumber());
//     console.log(harness.result);
//     expect(harness.result.current).equal(1);

//     // mine an another block
//     await mineBlock(harness.mockProvider);
//     expect(harness.result.current).equal(2);
//   });
// });
