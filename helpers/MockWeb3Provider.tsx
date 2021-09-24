import { Web3ReactProvider } from '@web3-react/core';
import { MockProvider } from 'ethereum-waffle';
import React, { FC, useEffect } from 'react';

import { MockConnector } from '~helpers/MockConnector';
import { useEthersProvider } from '~helpers/useEthersProvider';
import { TEthersProvider } from '~~/models';

export interface IMockEthersWrapper {
  mockProvider: MockProvider | TEthersProvider;
}
const ActivateWrapper: FC = (props) => {
  const { activate, library } = useEthersProvider();

  useEffect(() => {
    if (library && activate) {
      const connector = new MockConnector(library);
      void activate(connector, console.error);
    }
  }, [activate, library]);

  return <>{props.children}</>;
};

export const MockEthersWrapper: FC<IMockEthersWrapper> = (props) => {
  const setupMock = (): MockProvider | TEthersProvider => {
    return props.mockProvider;
  };

  return (
    <Web3ReactProvider getLibrary={setupMock}>
      <ActivateWrapper>{props.children}</ActivateWrapper>
    </Web3ReactProvider>
  );
};
