import 'test/helpers/chai-imports';
import { expect } from 'chai';

import { useAreSignerEqual } from '~~';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { getTestSigners, hookTestWrapper } from '~~/helpers/test-utils/wrapper';
import { TEthersSigner } from '~~/models';

type InputType = {
  signer1: TEthersSigner | undefined;
  signer2: TEthersSigner | undefined;
};

describe('useAreSignerEqual', () => {
  it('When signers are the same; then returns true', async () => {
    // ::Given::
    const wrapper = await hookTestWrapper(({ signer1, signer2 }: InputType) => useAreSignerEqual(signer1, signer2));
    const signer1 = (await getTestSigners(wrapper.mockProvider)).user1;

    // ::When::
    wrapper.rerender({ signer1, signer2: signer1 });
    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

    // ::Then::
    expect(wrapper.result.current[0]).be.equal(true);
  });

  it('When signers have different address; then returns false', async () => {
    // ::Given::
    const wrapper = await hookTestWrapper(({ signer1, signer2 }: InputType) => useAreSignerEqual(signer1, signer2));
    const signer1 = (await getTestSigners(wrapper.mockProvider)).user1;
    const signer2 = (await getTestSigners(wrapper.mockProvider)).user2;

    // ::When::
    wrapper.rerender({ signer1, signer2 });
    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

    // ::Then::
    expect(wrapper.result.current[0]).be.equal(false);
  });

  it('When signer1 is undefined (has no network); then returns undefined', async () => {
    // ::Given::
    const wrapper = await hookTestWrapper(({ signer1, signer2 }: InputType) => useAreSignerEqual(signer1, signer2));
    const signer1 = undefined;
    const signer2 = (await getTestSigners(wrapper.mockProvider)).user2;

    // ::When::
    wrapper.rerender({ signer1, signer2 });
    await wrapper.waitFor(() => wrapper.result.current[0], defaultBlockWaitOptions);

    // ::Then::
    expect(wrapper.result.current[0]).be.equal(undefined);
  });

  it('When signer2 is undefined; then returns false', async () => {
    // ::Given::
    const wrapper = await hookTestWrapper(({ signer1, signer2 }: InputType) => useAreSignerEqual(signer1, signer2));
    const signer1 = (await getTestSigners(wrapper.mockProvider)).user1;
    const signer2 = undefined;

    // ::When::
    wrapper.rerender({ signer1, signer2 });
    await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

    // ::Then::
    expect(wrapper.result.current[0]).be.equal(false);
  });
});
