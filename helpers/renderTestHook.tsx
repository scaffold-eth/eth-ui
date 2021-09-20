import '@nomiclabs/hardhat-waffle';

import { Renderer, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { MockProvider } from 'ethereum-waffle';
import { waffle } from 'hardhat';

import { MockEthersWrapper } from '~helpers/MockWeb3Provider';

// import { JsonRpcProvider } from '@ethersproject/providers';
// import { ethers } from 'hardhat';

const provider = waffle.provider;
const getMockProvider = (): MockProvider => provider;
// const getMockProvider = (): JsonRpcProvider => ethers.provider;

export const mockProvider = getMockProvider();

type TTestHookResult<TProps, TResult> = RenderHookResult<TProps, TResult, Renderer<TProps>> & {
  mockProvider: MockProvider;
};

export const renderTestHook = <TProps, TResult>(
  callback: (props: TProps) => TResult
): TTestHookResult<TProps, TResult> => {
  const result = renderHook(callback, { wrapper: (props) => <MockEthersWrapper mockProvider={mockProvider} /> });
  return {
    ...result,
    mockProvider,
  };
};
