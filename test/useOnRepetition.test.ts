import { expect, use } from 'chai';
import * as sinonChai from 'sinon-chai';
import sinon from 'ts-sinon';

import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock } from '~~/helpers/test-utils/eth';
import { currentTestBlockNumber, harnessTestSetupHelper } from '~~/helpers/test-utils/wrapper/hardhatTestHelpers';
import { useOnRepetition } from '~~/hooks';
import { TEthersProvider } from '~~/models';

use(sinonChai);

describe('useOnRepetition', function () {
  let stubCallback: sinon.SinonStub<any[], any>;
  let provider: TEthersProvider;
  before(async () => {
    stubCallback = sinon.stub();
    const harness = await harnessTestSetupHelper();
    provider = harness.mockProvider;
  });

  let testStartBockNumber = 0;
  beforeEach(async () => {
    testStartBockNumber = await currentTestBlockNumber();
    stubCallback.resetHistory();
  });

  describe('Given it is using onBlock events as a trigger', () => {
    it('When a new block is mined and useOnRepetition is called;  then the callback is invoked without arguments', async () => {
      const harness = await hookTestWrapper(() => useOnRepetition(stubCallback, { provider: provider }));
      await mineBlock(harness.mockProvider);
      await harness.waitFor(() => stubCallback.called, defaultBlockWaitOptions);
      expect(stubCallback.calledWithExactly()).be.true;
    });

    it('When a new block is mined and useOnRepetition is called; then the callback is invoked with the provided arguments', async () => {
      const args = ['1', 3];
      const harness = await hookTestWrapper(() => useOnRepetition(stubCallback, { provider: provider }, ...args));
      await mineBlock(harness.mockProvider);
      await harness.waitFor(() => stubCallback.called, defaultBlockWaitOptions);
      expect(stubCallback.calledWith(...args)).be.true;
      expect(stubCallback.callCount).to.equal(1);
    });

    it('When useOnRepetition is called, there is no new block and leadingTrigger is true; then the callback is invoked with no arguments', async () => {
      const harness = await hookTestWrapper(() =>
        useOnRepetition(stubCallback, { provider: provider, leadingTrigger: provider != null })
      );
      await harness.waitFor(() => stubCallback.called, defaultBlockWaitOptions);
      expect(stubCallback.calledWithExactly()).be.true;
      expect(stubCallback.callCount).to.equal(1);
    });

    it('When useOnRepetition is called, there is no new block and leadingTrigger is true; then the callback is invoked with the provided arguments', async () => {
      const harness = await hookTestWrapper((hookArgs: any[] | undefined) =>
        useOnRepetition(stubCallback, { provider: provider, leadingTrigger: provider != null }, ...(hookArgs ?? []))
      );

      // args with with no new block
      const args = ['1', 3];
      harness.rerender(args);
      await harness.waitFor(() => stubCallback.calledWith(...args), defaultBlockWaitOptions);
      expect(stubCallback.calledWith(...args)).be.true;
      expect(stubCallback.callCount).to.equal(2);

      // second set of args with no new block
      const args2 = ['1', 3, 5, 6];
      stubCallback.resetHistory();
      harness.rerender(args2);
      await harness.waitFor(() => stubCallback.calledWith(...args2), defaultBlockWaitOptions);
      expect(stubCallback.calledWith(...args2)).be.true;
      expect(stubCallback.callCount).to.equal(1);
    });

    it('When useOnRepetition is called, and there is no provider and leadingTrigger is true; the callback is not called', async () => {
      const harness = await hookTestWrapper(() => useOnRepetition(stubCallback, { leadingTrigger: true }));

      await mineBlock(harness.mockProvider);
      expect(await harness.mockProvider.getBlockNumber()).to.equal(testStartBockNumber + 1);
      expect(stubCallback.notCalled).to.be.true;
    });
  });

  describe('Given when polling', function () {
    it('When useOnRepetition is called without provider, the callback is invoked', async () => {
      const harness = await hookTestWrapper(() =>
        useOnRepetition(stubCallback, { leadingTrigger: true, pollTime: 12000 })
      );

      await harness.waitFor(() => stubCallback.called, defaultBlockWaitOptions);
      expect(stubCallback.calledWithExactly()).be.true;
      expect(stubCallback.callCount).to.equal(1);

      // wait for another call after leadingTrigger
      stubCallback.resetHistory();
      await harness.waitFor(() => stubCallback.called, { ...defaultBlockWaitOptions, timeout: 20000 });
      expect(stubCallback.calledWithExactly()).be.true;
      expect(stubCallback.callCount).to.equal(1);
    });
  });
});
