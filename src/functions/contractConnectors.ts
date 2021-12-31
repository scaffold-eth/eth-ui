import { BaseContract, ethers, Signer } from 'ethers';

import { TContractFactory, TContractConnector } from '~~/models';
import {
  TDeployedContractJsonData,
  TExternalContractsAddressMap,
  THardhatContractsFileJson,
} from '~~/models/contractTypes';

const extractHardhatContracts = (configJson: THardhatContractsFileJson): TDeployedContractJsonData => {
  const contractData: TDeployedContractJsonData = {};
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

const extractExternalContracts = (configJson: TExternalContractsAddressMap): TDeployedContractJsonData => {
  const contractData: TDeployedContractJsonData = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId)) continue;

    for (const contractName in configJson[chainId]) {
      contractData[contractName] = { address: configJson[chainId][contractName], chainId: chainId };
    }
  }

  return contractData;
};

export const createConnectorsForHardhatContracts = <
  GContractNames extends string,
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: GContractNames,
  typechainFactory: TContractFactory<GBaseContract, GContractInterface>,
  deployedHardhatContractJson: THardhatContractsFileJson
): TContractConnector<GContractNames, GBaseContract, GContractInterface> => {
  const info = extractHardhatContracts(deployedHardhatContractJson)[contractName];

  return {
    contractName,
    connect: typechainFactory.connect,
    createInterface: typechainFactory.createInterface,
    abi: info.abi as Record<string, any>[],
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const createConnectorsForExternalContract = <
  GContractNames extends string,
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: GContractNames,
  typechainFactory: TContractFactory<GBaseContract, GContractInterface>,
  deployedContractJson: TExternalContractsAddressMap
): TContractConnector<GContractNames, GBaseContract, GContractInterface> => {
  const info = extractExternalContracts(deployedContractJson)[contractName];

  return {
    contractName,
    connect: typechainFactory.connect,
    createInterface: typechainFactory.createInterface,
    abi: info.abi as Record<string, any>[],
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const connectToContractWithSigner = async <
  GContractNames extends string,
  GContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  connector: TContractConnector<GContractNames, GContract, GContractInterface>,
  signer: Signer
): Promise<GContract> => {
  const chainId: number = await signer.getChainId();
  const address = connector.config[chainId].address;
  if (chainId != null && address != null) {
    const contract = connector.connect(connector.config[chainId].address, signer);

    if (chainId != null && contract != null) {
      return contract;
    }
  }

  throw 'Could not create contract instance';
};
