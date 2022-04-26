import { expect } from 'chai';

import { useAreSignerEqual } from '~~';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { getHardhatSigner, hookTestWrapper } from '~~/helpers/test-utils/wrapper';
import { TEthersSigner } from '~~/models';

import 'test/helpers/chai-imports';

type InputType = {
  signer1: TEthersSigner | undefined;
  signer2: TEthersSigner | undefined;
};

describe('useAreSignerEqual', () => {
  it('When signers are the same; then returns true', async () => {
    // ::Given::
    const harness = await hookTestWrapper(({ signer1, signer2 }: InputType) => useAreSignerEqual(signer1, signer2));
    const signer1 = await getHardhatSigner(harness.mockProvider, 1);

    // ::When::
    harness.rerender({ signer1, signer2: signer1 });
    await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);

    // ::Then::
    expect(harness.result.current[0]).be.equal(true);
  });

  it('When signers have different address; then returns false', async () => {
    // ::Given::
    const harness = await hookTestWrapper(({ signer1, signer2 }: InputType) => useAreSignerEqual(signer1, signer2));
    const signer1 = await getHardhatSigner(harness.mockProvider, 1);
    const signer2 = await getHardhatSigner(harness.mockProvider, 2);

    // ::When::
    harness.rerender({ signer1, signer2 });
    await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);

    // ::Then::
    expect(harness.result.current[0]).be.equal(false);
  });

  it('When signer1 is undefined (has no network); then returns undefined', async () => {
    // ::Given::
    const harness = await hookTestWrapper(({ signer1, signer2 }: InputType) => useAreSignerEqual(signer1, signer2));
    const signer1 = undefined;
    const signer2 = await getHardhatSigner(harness.mockProvider, 2);

    // ::When::
    harness.rerender({ signer1, signer2 });
    await harness.waitFor(() => harness.result.current[0], defaultBlockWaitOptions);

    // ::Then::
    expect(harness.result.current[0]).be.equal(undefined);
  });

  it('When signer2 is undefined; then returns false', async () => {
    // ::Given::
    const harness = await hookTestWrapper(({ signer1, signer2 }: InputType) => useAreSignerEqual(signer1, signer2));
    const signer1 = await getHardhatSigner(harness.mockProvider, 0);
    const signer2 = undefined;

    // ::When::
    harness.rerender({ signer1, signer2 });
    await harness.waitForValueToChange(() => harness.result.current[0], defaultBlockWaitOptions);

    // ::Then::
    expect(harness.result.current[0]).be.equal(false);
  });
});
