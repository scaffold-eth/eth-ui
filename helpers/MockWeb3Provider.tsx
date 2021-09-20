import { Web3ReactProvider } from '@web3-react/core';
import { MockProvider } from 'ethereum-waffle';
import React, { FC, useEffect } from 'react';

import { getMockProvider } from '~helpers/getMockProvider';
import { MockConnector } from '~helpers/MockConnector';
import { useEthersProvider } from '~helpers/useEthersProvider';

export interface IMockEthersWrapper {
  stub?: void;
}
const mockProvider = getMockProvider();
const setupMock = (_provider: any): MockProvider => {
  mockProvider.pollingInterval = 200;
  return mockProvider;
};

const ActivateWrapper: FC = (props) => {
  const { activate } = useEthersProvider();

  useEffect(() => {
    const connector = new MockConnector(mockProvider);
    void activate(connector, console.error);
  }, []);

  return <>{props.children}</>;
};

export const MockEthersWrapper: FC<IMockEthersWrapper> = (props) => {
  return (
    <Web3ReactProvider getLibrary={setupMock}>
      <ActivateWrapper>{props.children}</ActivateWrapper>
    </Web3ReactProvider>
  );
};
