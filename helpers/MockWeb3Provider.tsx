import { Web3ReactProvider } from '@web3-react/core';
import { MockProvider } from 'ethereum-waffle';
import React, { FC, useEffect } from 'react';

import { MockConnector } from '~helpers/MockConnector';
import { useEthersProvider } from '~helpers/useEthersProvider';
import { TEthersProvider } from '~~/models';

export interface IMockEthersWrapper {
  mockProvider: MockProvider | TEthersProvider;
}
const ActivateWrapper: FC<IMockEthersWrapper> = (props) => {
  const { activate } = useEthersProvider();

  useEffect(() => {
    const connector = new MockConnector(props.mockProvider);
    void activate(connector, console.error);
  }, []);

  return <>{props.children}</>;
};

export const MockEthersWrapper: FC<IMockEthersWrapper> = (props) => {
  const setupMock = (): MockProvider | TEthersProvider => {
    return props.mockProvider;
  };

  return (
    <Web3ReactProvider getLibrary={setupMock}>
      <ActivateWrapper mockProvider={props.mockProvider}>{props.children}</ActivateWrapper>
    </Web3ReactProvider>
  );
};
