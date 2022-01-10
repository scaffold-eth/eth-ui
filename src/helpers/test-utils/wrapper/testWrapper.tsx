import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { MockProvider } from 'ethereum-waffle';
import { FC } from 'react';

import { waitForActivation, isActive } from './wrapperHelpers';

import { getMockProvider } from '~~/helpers/test-utils/wrapper/getMockProvider';
import { MockConnector } from '~~/helpers/test-utils/wrapper/MockConnector';
import { TestAppWrapper } from '~~/helpers/test-utils/wrapper/TestAppWrapper';
import { TCreateEthersModalConnector } from '~~/models/ethersAppContextTypes';
const mockProvider = getMockProvider();
const mockConnector = new MockConnector(mockProvider);

export type TTestHookResult<TCallbackToHook extends (input: any) => any> = Omit<
  RenderHookResult<Parameters<TCallbackToHook>, ReturnType<TCallbackToHook>>,
  'rerender'
> & {
  mockProvider: MockProvider;
  rerender: (input: Parameters<TCallbackToHook>[0]) => void;
};

/**
 * Created a test hook with a Web3Wrapper
 * @param callbackToHook callback to init hook
 * @see renderHook from @link testing-library/react-hooks
 * @returns (TTestHookResult)
 */
export const hookTestWrapper = async <TCallbackToHook extends (input: any) => any>(
  callbackToHook: TCallbackToHook
): Promise<TTestHookResult<TCallbackToHook>> => {
  const createMockConnector: TCreateEthersModalConnector = () => {
    return mockConnector;
  };

  const wrapper: FC<Parameters<TCallbackToHook>> = (props) => (
    <TestAppWrapper createMockConnector={createMockConnector}>{props.children}</TestAppWrapper>
  );

  const result = renderHook(callbackToHook, { wrapper });
  await waitForActivation(() => isActive(mockConnector));

  return {
    ...result,
    rerender: result.rerender as (input: Parameters<TCallbackToHook>[0]) => void,
    mockProvider: mockProvider,
  };
};
