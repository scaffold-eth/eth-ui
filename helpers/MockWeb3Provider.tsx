import { Web3ReactProvider } from '@web3-react/core';
import { MockProvider } from 'ethereum-waffle';
import React, { FC, useEffect } from 'react';

import { getMockProvider } from '~helpers/getMockProvider';
import { MockConnector } from '~helpers/MockConnector';
import { useEthersProvider } from '~helpers/useEthersProvider';

export interface IMockEthersWrapper {
  stub?: void;
}

export const MockEthersWrapper: FC<IMockEthersWrapper> = (props) => {
  const mockProvider = getMockProvider();
  mockProvider.pollingInterval = 200;
  const connector = new MockConnector(mockProvider);

  const { activate, active } = useEthersProvider();

  useEffect(() => {
    void activate(connector ?? new MockConnector(), console.error);
  }, []);

  if (!active) return null;

  return (
    <Web3ReactProvider getLibrary={(): MockProvider => mockProvider}>
      <>{props.children}</>
    </Web3ReactProvider>
  );
};
