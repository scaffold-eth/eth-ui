import React, { FC, useEffect } from 'react';

import { CreateEthersModalConnector, EthersAppContext, useEthersContext } from '~~/context';

interface IMockProps {
  createMockConnector: CreateEthersModalConnector;
}
const TestConnectorWrapper: FC<IMockProps> = (props) => {
  const ethersContext = useEthersContext();

  useEffect(() => {
    const connector = props.createMockConnector();
    if (connector != null) {
      ethersContext.openModal(connector);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return (): void => {
      ethersContext.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{props.children}</>;
};

export const MockAppWrapper: FC<IMockProps> = (props) => {
  return (
    <EthersAppContext>
      <TestConnectorWrapper {...props}>{props.children}</TestConnectorWrapper>
    </EthersAppContext>
  );
};
