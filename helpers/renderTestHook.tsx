import { renderHook } from '@testing-library/react-hooks';

import { MockEthersWrapper } from '~helpers/MockWeb3Provider';

type TRenderHook = typeof renderHook;

export const renderEthersHook: TRenderHook = (callback, options = {}) => {
  const Wrapper = <MockEthersWrapper />;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  options.wrapper = Wrapper as any;

  return renderHook(callback, options);
};
