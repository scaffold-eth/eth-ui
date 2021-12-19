import React, { FC, useEffect } from 'react';

import { EthersAppContext, useEthersContext } from '~~/context';
import { TCreateEthersModalConnector } from '~~/models/ethersContextTypes';

interface IMockProps {
  createMockConnector: TCreateEthersModalConnector;
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
