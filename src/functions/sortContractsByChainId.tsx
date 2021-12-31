import { TContractsByName, TContractsByChainId } from '~~/models/contractAppContextTypes';

export const sortContractsByChainId = <GContractNames extends string>(
  contractsByName: TContractsByName<GContractNames>
): TContractsByChainId<GContractNames> => {
  const contractsByChainId: TContractsByChainId<GContractNames> = {};

  Object.keys(contractsByName).forEach((name: string) => {
    const contractName = name as GContractNames;
    Object.keys(contractsByName[contractName])
      .map(Number)
      .forEach((chainId: number) => {
        contractsByChainId[chainId][contractName] = contractsByName[contractName][chainId];
      });
  });

  return contractsByChainId;
};
