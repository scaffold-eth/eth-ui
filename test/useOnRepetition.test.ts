import { expect, use } from 'chai';
import * as sinonChai from 'sinon-chai';
import sinon from 'ts-sinon';

import { hookTestHarness } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';
import { currentTestBlockNumber, harnessTestSetupHelper } from '~~/helpers/test-utils/harness/hardhatTestHelpers';
import { useOnRepetition } from '~~/hooks';
import { TEthersProvider } from '~~/models';

use(sinonChai);

let testStartCounterValue = 0;
let callbackCounter = 0;
const stubCallback = sinon.stub().callsFake(() => {
  callbackCounter++;
});

describe('useOnRepetition', function () {
  let provider: TEthersProvider;
  before(async () => {
    const harness = await harnessTestSetupHelper();
    provider = harness.mockProvider;
  });

  let testStartBockNumber = 0;
  beforeEach(async () => {
    testStartBockNumber = await currentTestBlockNumber();
    testStartCounterValue = callbackCounter;
    stubCallback.resetHistory();
  });

  describe('Given when utilizing useOnBlock event', () => {
    it('When a new block is mined and useOnRepetition is called;  then the callback is invoked without arguments', async () => {
      const harness = await hookTestHarness(() => useOnRepetition(stubCallback, { provider: provider }));
      await mineBlock(harness.mockProvider);
      await harness.waitFor(() => stubCallback.called, defaultBlockWaitOptions);
      expect(stubCallback.calledWithExactly()).be.true;

      expect(callbackCounter).to.equal(testStartCounterValue + 1);
    });

    it('When a new block is mined and useOnRepetition is called; then the callback is invoked with the provided arguments', async () => {
      const args = ['1', 3];
      const harness = await hookTestHarness(() => useOnRepetition(stubCallback, { provider: provider }, ...args));
      await mineBlock(harness.mockProvider);
      await harness.waitFor(() => stubCallback.called, defaultBlockWaitOptions);
      expect(stubCallback.calledWith(...args)).be.true;
      expect(callbackCounter).to.equal(testStartCounterValue + 1);
    });

    it('When useOnRepetition is called, there is no new block and leadingTrigger is true; then the callback is invoked with no arguments', async () => {
      const harness = await hookTestHarness(() =>
        useOnRepetition(stubCallback, { provider: provider, leadingTrigger: provider != null })
      );
      await harness.waitFor(() => stubCallback.called, defaultBlockWaitOptions);
      expect(stubCallback.calledWithExactly()).be.true;
      expect(callbackCounter).to.equal(testStartCounterValue + 1);
    });

    it('When useOnRepetition is called, there is no new block and leadingTrigger is true; then the callback is invoked with the provided arguments', async () => {
      const args = ['1', 3];
      const harness = await hookTestHarness((hookArgs: any[] | undefined) =>
        useOnRepetition(stubCallback, { provider: provider, leadingTrigger: provider != null }, ...(hookArgs ?? []))
      );
      expect(callbackCounter).to.equal(testStartCounterValue + 1);

      harness.rerender(args);
      await mineBlock(harness.mockProvider);
      await harness.waitFor(() => stubCallback.calledWith(...args), defaultBlockWaitOptions);
      expect(stubCallback.calledWith(...args)).be.true;
      expect(callbackCounter).to.equal(testStartCounterValue + 2);

      stubCallback.resetHistory();
      harness.rerender(args);
      await harness.waitFor(() => stubCallback.calledWith(...args), defaultBlockWaitOptions);
      expect(stubCallback.calledWith(...args)).be.true;
      expect(callbackCounter).to.equal(testStartCounterValue + 3);
    });

    it('When useOnRepetition is called, and there is no provider and leadingTrigger is true; the callback is not called', async () => {
      const harness = await hookTestHarness(() => useOnRepetition(stubCallback, { leadingTrigger: true }));

      await mineBlock(harness.mockProvider);
      expect(await harness.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 1);
      expect(stubCallback.notCalled).to.be.true;
      expect(callbackCounter).to.equal(testStartCounterValue + 0);
    });
  });

  describe('Given when polling', function () {
    it('When useOnRepetition is called without provider, the callback is invoked', async () => {
      const harness = await hookTestHarness(() =>
        useOnRepetition(stubCallback, { leadingTrigger: true, pollTime: 12000 })
      );

      await harness.waitFor(() => stubCallback.called, defaultBlockWaitOptions);
      expect(stubCallback.calledWithExactly()).be.true;
      expect(callbackCounter).to.equal(testStartCounterValue + 1);

      // wait for another call after leadingTrigger
      stubCallback.resetHistory();
      await harness.waitFor(() => stubCallback.called, { ...defaultBlockWaitOptions, timeout: 20000 });
      expect(stubCallback.calledWithExactly()).be.true;
      expect(callbackCounter).to.equal(testStartCounterValue + 2);
    });
  });
});
