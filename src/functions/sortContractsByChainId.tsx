import { merge } from 'merge-anything';

import { TContractsByName, TContractsByChainId } from '~~/models/contractContextTypes';

export const sortContractsByChainId = <GContractNames extends string>(
  contractsByName: TContractsByName<GContractNames>
): TContractsByChainId<GContractNames> => {
  let contractsByChainId: TContractsByChainId<GContractNames> = {};

  Object.keys(contractsByName).forEach((name: string) => {
    const contractName = name as GContractNames;
    Object.keys(contractsByName[contractName])
      .map(Number)
      .forEach((chainId: number) => {
        const data = {
          chainId: { [contractName]: contractsByName[contractName][chainId] },
        } as TContractsByChainId<GContractNames>;
        // @ts-ignore
        contractsByChainId = merge(contractsByChainId, data);
      });
  });

  return contractsByChainId;
};
