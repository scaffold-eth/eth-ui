import { renderHook } from '@testing-library/react-hooks';
import { FC } from 'react';

import { MockEthersWrapper } from '~helpers/MockWeb3Provider';

type TRenderHook = typeof renderHook;

export const renderTestHook: TRenderHook = (callback, options = {}) => {
  const Wrapper: FC = () => <MockEthersWrapper />;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  options.wrapper = Wrapper as any;

  return renderHook(callback, options);
};
