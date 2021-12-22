import { BaseContract, ethers, Signer } from 'ethers';

import {
  TDeployedContractJsonData,
  TExternalContractsAddressMap,
  THardhatContractsFileJson,
} from '../models/contractTypes';
import { TTypechainContractFactory, TTypechainContractConnector } from '../models/typechainContractTypes';

const extractDeployedContracts = (configJson: THardhatContractsFileJson): TDeployedContractJsonData => {
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

export const createTypechainContractConnectorHardhatContract = <
  GContractNames extends string,
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: GContractNames,
  typechainFactory: TTypechainContractFactory<GBaseContract, GContractInterface>,
  deployedHardhatContractJson: THardhatContractsFileJson
): TTypechainContractConnector<GContractNames, GBaseContract, GContractInterface> => {
  const info = extractDeployedContracts(deployedHardhatContractJson)[contractName];

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

export const createTypechainContractConnectorForExternalContract = <
  GContractNames extends string,
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: GContractNames,
  typechainFactory: TTypechainContractFactory<GBaseContract, GContractInterface>,
  deployedContractJson: TExternalContractsAddressMap
): TTypechainContractConnector<GContractNames, GBaseContract, GContractInterface> => {
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
  connector: TTypechainContractConnector<GContractNames, GContract, GContractInterface>,
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
