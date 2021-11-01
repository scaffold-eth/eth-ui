import { useBlockNumberContext } from '~~/context';
import { hookTestHarness } from '~~/helpers/test-utils';

export const harnessTestSetupHelper = async (): Promise<ReturnType<typeof hookTestHarness>> => {
  const useBeforeTestHook = (): number | undefined => {
    return useBlockNumberContext();
  };

  return await hookTestHarness(() => useBeforeTestHook());
};

export const currentTestBlockNumber = async (): Promise<number> => {
  const harness = await harnessTestSetupHelper();
  return await harness.mockProvider.getBlockNumber();
};
