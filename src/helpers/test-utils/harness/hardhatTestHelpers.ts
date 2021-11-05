import { useBlockNumberContext } from '~~/context';
import { hookTestHarness, TTestHookResult } from '~~/helpers/test-utils';

export const harnessTestSetupHelper = async (): Promise<TTestHookResult<void, number | undefined>> => {
  const useBeforeTestHook = (): number | undefined => {
    return useBlockNumberContext();
  };

  return await hookTestHarness<void, number | undefined>(() => useBeforeTestHook());
};

export const currentTestBlockNumber = async (): Promise<number> => {
  const harness = await harnessTestSetupHelper();
  return await harness.mockProvider.getBlockNumber();
};
