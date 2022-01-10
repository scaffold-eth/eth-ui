import { useBlockNumberContext } from '~~/context';
import { hookTestWrapper, TTestHookResult } from '~~/helpers/test-utils';

export const wrapperTestSetupHelper = async (): Promise<TTestHookResult<typeof useBlockNumberContext>> => {
  const useBeforeTestHook = (): number => {
    return useBlockNumberContext();
  };

  return await hookTestWrapper<typeof useBlockNumberContext>(() => useBeforeTestHook());
};

export const currentTestBlockNumber = async (): Promise<number> => {
  const wrapper = await wrapperTestSetupHelper();
  return await wrapper.mockProvider.getBlockNumber();
};
