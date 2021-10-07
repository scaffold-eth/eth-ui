import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { MockProvider } from 'ethereum-waffle';
import React, { FC, useCallback, useEffect } from 'react';

export interface IMockEthersWrapper {
  mockProvider: MockProvider;
}
const ActivateWrapper: FC = (props) => {
  const { activate, library, deactivate } = useWeb3React();

  useEffect(() => {
    if (library && activate) {
      // const connector = new MockConnector(library);
      // void activate(connector, console.error);
    }
  }, [activate, library]);

  useEffect(() => {
    return (): void => {
      deactivate && deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{props.children}</>;
};

export const MockEthersWrapper: FC<IMockEthersWrapper> = (props) => {
  const getLibrary = useCallback(() => {
    new Web3Provider(props.mockProvider as any);
  }, [props.mockProvider]);

  return (
    <>
      {getLibrary != null && props.mockProvider != null && (
        <Web3ReactProvider getLibrary={getLibrary}>
          <ActivateWrapper>{props.children}</ActivateWrapper>
        </Web3ReactProvider>
      )}
    </>
  );
};
