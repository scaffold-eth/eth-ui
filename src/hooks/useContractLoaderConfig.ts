import { useState, useEffect } from 'react';

import { TContractLoaderConfig } from '~~/models';

/**
 *
 * @param loadAppContracts
 * @returns
 */
export const useContractLoaderConfig = (
  loadAppContracts: () => Promise<TContractLoaderConfig>
): TContractLoaderConfig => {
  const [contractsConfig, setContractsConfig] = useState<TContractLoaderConfig>({});

  useEffect((): void => {
    const loadFunc = async (): Promise<void> => {
      const result = await loadAppContracts();
      setContractsConfig(result);
    };
    void loadFunc();
  }, []);
  return contractsConfig;
};
