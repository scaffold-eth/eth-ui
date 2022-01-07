import React, { createElement, FC, useEffect } from 'react';

import { EthersAppContext, useEthersContext } from '~~/context';
import { TCreateEthersModalConnector } from '~~/models/ethersAppContextTypes';

interface IMockProps {
  createMockConnector: TCreateEthersModalConnector;
  contractContext?: FC;
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

/**
 * This is a wrapper for tests
 * @param props
 * @returns
 */
export const TestAppWrapper: FC<IMockProps> = (props) => {
  const element = (
    <EthersAppContext>
      <TestConnectorWrapper createMockConnector={props.createMockConnector}>{props.children}</TestConnectorWrapper>
    </EthersAppContext>
  );

  // wrap in contract context if provided
  if (props.contractContext != null) {
    const wrappedElement = createElement(props.contractContext, {}, element);
    return wrappedElement;
  }

  return element;
};
