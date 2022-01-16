import { BaseContract, ethers } from 'ethers';

import { TConnectorConnectorBase, TContractConnector } from '~~/models';
import {
  TBasicContractDataRecord,
  TExternalContractsAddressMap,
  TDeployedHardhatContractsJson,
} from '~~/models/contractTypes';

const extractHardhatContracts = (configJson: TDeployedHardhatContractsJson): TBasicContractDataRecord => {
  const contractData: TBasicContractDataRecord = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId)) continue;

    const deployedDataByNetwork = Object.values(configJson[chainId]).filter(
      (f) => parseInt(f?.chainId) === chainId
    )?.[0];
    if (deployedDataByNetwork?.chainId != null) {
      for (const contractName in deployedDataByNetwork.contracts) {
        contractData[contractName] = { ...deployedDataByNetwork.contracts[contractName], chainId: chainId };
      }
    }
  }

  return contractData;
};

const extractExternalContracts = (configJson: TExternalContractsAddressMap): TBasicContractDataRecord => {
  const contractData: TBasicContractDataRecord = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId)) continue;

    for (const contractName in configJson[chainId]) {
      contractData[contractName] = { address: configJson[chainId][contractName], chainId: chainId };
    }
  }

  return contractData;
};

export const createConnectorForHardhatContract = <GContractNames extends string, GBaseContract extends BaseContract>(
  contractName: GContractNames,
  typechainFactory: TConnectorConnectorBase<GBaseContract>,
  deployedHardhatContractJson: TDeployedHardhatContractsJson
): TContractConnector<GContractNames, GBaseContract> => {
  const info = extractHardhatContracts(deployedHardhatContractJson)[contractName];

  if (info == null) {
    throw new Error(
      `Contract ${contractName} not found in deployed contracts (hardhat_config.json).  Check your hardhat deploy scripts and hardhat_config.json`
    );
  }

  return {
    contractName,
    connect: typechainFactory.connect,
    // createInterface: typechainFactory.createInterface,
    abi: (info?.abi ?? typechainFactory.abi ?? []) as Record<string, any>[],
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const createConnectorForExternalContract = <GContractNames extends string, GBaseContract extends BaseContract>(
  contractName: GContractNames,
  typechainFactory: TConnectorConnectorBase<GBaseContract>,
  deployedContractJson: TExternalContractsAddressMap
): TContractConnector<GContractNames, GBaseContract> => {
  const info = extractExternalContracts(deployedContractJson)[contractName];

  if (info == null) {
    throw new Error(
      `Contract ${contractName} not found in external contract map.  Check that contractName: address map is correct.  This is required by eth-sdk`
    );
  }

  return {
    contractName,
    connect: typechainFactory.connect,
    // : typechainFactory.createInterface,
    abi: (info?.abi ?? typechainFactory.abi ?? []) as Record<string, any>[],
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const createConnectorForExternalAbi = <GContractNames extends string>(
  contractName: GContractNames,
  config: { [key in number]: { address: string } },
  abi: Record<string, any>[]
): TContractConnector<GContractNames, BaseContract> => {
  return {
    contractName,
    connect: (address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider): BaseContract => {
      return new BaseContract(address, abi, signerOrProvider);
    },
    abi: abi,
    config: config,
  };
};
