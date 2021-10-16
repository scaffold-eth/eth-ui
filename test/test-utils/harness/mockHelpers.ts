import { MockConnector } from '~test-utils/harness/wrapper/MockConnector';

export const isActive = async (connector: MockConnector): Promise<boolean> => {
  const active =
    connector != null &&
    (await connector.getChainId()) != null &&
    (await connector.getProvider()) != null &&
    (await connector.getAccount()) != null;
  return active;
};

export const waitForActivation = async (callback: () => Promise<boolean>): Promise<void> => {
  let timeout = false;
  void setTimeout(() => {
    timeout = true;
  }, 2000);
  while (!(await callback()) && !timeout) {
    // sleep for 100ms
    await (async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 100)))();
  }
};
