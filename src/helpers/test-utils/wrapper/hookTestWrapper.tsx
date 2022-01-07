import { Renderer, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { MockProvider } from 'ethereum-waffle';
import { FC } from 'react';

import { waitForActivation, isActive } from './wrapperHelpers';

import { getMockProvider } from '~~/helpers/test-utils/wrapper/getMockProvider';
import { MockConnector } from '~~/helpers/test-utils/wrapper/MockConnector';
import { TestAppWrapper } from '~~/helpers/test-utils/wrapper/TestAppWrapper';
import { TCreateEthersModalConnector } from '~~/models/ethersAppContextTypes';

export type TTestHookResult<PropsT, TResult> = RenderHookResult<PropsT, TResult, Renderer<PropsT>> & {
  mockProvider: MockProvider;
};

const mockProvider = getMockProvider();
const mockConnector = new MockConnector(mockProvider);

/**
 * Created a test hook with a Web3Wrapper
 * @param callbackToHook callback to init hook
 * @see renderHook from @link testing-library/react-hooks
 * @returns (TTestHookResult)
 */
export const hookTestWrapper = async <PropsT, ResultT>(
  callbackToHook: (input: PropsT) => ResultT
): Promise<TTestHookResult<PropsT, ResultT>> => {
  const createMockConnector: TCreateEthersModalConnector = () => {
    return mockConnector;
  };

  const wrapper: FC = (props) => (
    <TestAppWrapper createMockConnector={createMockConnector}>{props.children}</TestAppWrapper>
  );

  const result = renderHook(callbackToHook, { wrapper: wrapper });
  await waitForActivation(() => isActive(mockConnector));

  return {
    ...result,
    mockProvider: mockProvider,
  };
};
