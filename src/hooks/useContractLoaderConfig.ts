// import { useState, useEffect } from 'react';

// import { TContractLoaderConfig as TAppContractConfig } from '~~/models';

// /**
//  *
//  * @param loadAppContracts
//  * @returns
//  */
// export const useAppContractConfig = (loadAppContracts: () => Promise<TAppContractConfig>): TAppContractConfig => {
//   const [contractsConfig, setContractsConfig] = useState<TAppContractConfig>({});

//   useEffect((): void => {
//     const loadFunc = async (): Promise<void> => {
//       const result = await loadAppContracts();
//       setContractsConfig(result);
//     };
//     void loadFunc();
//   }, []);
//   return contractsConfig;
// };
