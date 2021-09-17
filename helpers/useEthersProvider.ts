import { useWeb3React } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';

import { TEthersProvider } from '~~/models';

export type TEthersManager = Web3ReactContextInterface<TEthersProvider>;

export const useEthersProvider = (): TEthersManager => {
  const result = useWeb3React<TEthersProvider>();

  return { ...result };
};
