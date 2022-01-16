import { merge } from 'merge-anything';

import { TContractsByName, TContractsByChainId } from '~~/models/contractAppContextTypes';

export const sortContractsByChainId = <GContractNames extends string>(
  contractsByName: TContractsByName<GContractNames>
): TContractsByChainId<GContractNames> => {
  let contractsByChainId: TContractsByChainId<GContractNames> = {} as TContractsByChainId<GContractNames>;

  for (const nameStr in contractsByName) {
    const name: GContractNames = nameStr;
    for (const chainIdStr in contractsByName[name]) {
      const chainId = parseInt(chainIdStr);
      const data: TContractsByChainId<GContractNames> = {
        [chainId]: { [name]: contractsByName[name][chainId] },
      } as TContractsByChainId<GContractNames>;
      const temp = contractsByChainId;
      // @ts-ignore
      contractsByChainId = merge(temp, data);
    }
  }

  return contractsByChainId;
};

export const sortContractsByName = <GContractNames extends string>(
  contractsByChainId: TContractsByChainId<GContractNames>
): TContractsByName<GContractNames> => {
  let contractsByName: TContractsByName<GContractNames> = {} as TContractsByName<GContractNames>;

  for (const chainIdStr in contractsByChainId) {
    const chainId = parseInt(chainIdStr);
    for (const nameStr in contractsByChainId[chainId]) {
      const name: GContractNames = nameStr;
      const data: TContractsByName<GContractNames> = {
        [name]: { [chainId]: contractsByChainId[chainId][name] },
      } as TContractsByName<GContractNames>;
      const temp = contractsByName;
      // @ts-ignore
      contractsByName = merge(temp, data);
    }
  }

  return contractsByName;
};
