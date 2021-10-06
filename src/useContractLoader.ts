import { Contract, Signer } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import { useEthersContext } from '~~/context';
import { useMounted } from '~~/helpers/hooks/useMounted';
import { TDeployedContracts, TExternalContracts } from '~~/models';

/**
 * Configuration for useContractLoader
 */
export type TContractConfig = {
  hardhatNetworkName?: string;
  customAddresses?: Record<string, string>;
  deployedContracts?: TDeployedContracts;
  externalContracts?: TExternalContracts;
};

/**
 * Loads your local contracts and gives options to read values from contracts
  or write transactions into them

   ~ Features ~
  - localProvider enables reading values from contracts
  - userProvider enables writing transactions into contracts
  - Example of keeping track of "purpose" variable by loading contracts into readContracts
    and using ContractReader.js hook:
    const purpose = useContractReader(readContracts,"YourContract", "purpose")
  - Example of using setPurpose function from our contract and writing transactions by Transactor.js helper:
    tx( writeContracts.YourContract.setPurpose(newPurpose) )

  config can include:
  - chainId - to hardcode the chainId, irrespective of the providerOrSigner chainId
  - hardhatNetworkName - to hardcode the hardhat network of interest
  - customAddresses: { contractName: 0xCustomAddress } to hardcode the address for a given named contract
  - hardhatContracts: object following the hardhat deploy export format (Json with chainIds as keys, which have hardhat network names as keys, which contain arrays of contracts for each)
  - externalContracts: object with chainIds as keys, with an array of contracts for each
 * @param ethersProvider (TEthersProviderOrSigner)
 * @param config (TContractConfig) :: configuration for loader
 * @returns (Record<string, Contract>) :: a record of contractName:contract
 */
export const useContractLoader = (
  config: TContractConfig = {},
  signer?: Signer,
  providerKey?: string
): Record<string, Contract> => {
  const isMounted = useMounted();
  const { ethersProvider, chainId } = useEthersContext(providerKey);

  const [contracts, setContracts] = useState<Record<string, Contract>>({});
  const configDep: string = useMemo(() => JSON.stringify(config ?? {}), [config]);
  const networkDeps = `${chainId ?? 0}_${ethersProvider?.network?.name ?? ''}`;

  useEffect(() => {
    const loadContracts = (): void => {
      if (ethersProvider && chainId && chainId > 0) {
        console.log(`🌀 loading contracts..`);
        try {
          const contractList: TDeployedContracts = { ...(config.deployedContracts ?? {}) };
          const externalContractList: TExternalContracts = {
            ...(config.externalContracts ?? {}),
          };
          let combinedContracts: Record<string, Contract> = {};
          // combine partitioned contracts based on all the available and chain id.
          if (contractList?.[chainId] != null) {
            for (const network in contractList[chainId]) {
              if (Object.prototype.hasOwnProperty.call(contractList[chainId], network)) {
                if (!config.hardhatNetworkName || network === config.hardhatNetworkName) {
                  const chainContracts = contractList?.[chainId]?.[network]?.contracts;
                  combinedContracts = {
                    ...combinedContracts,
                    ...chainContracts,
                  };
                }
              }
            }
          }

          if (externalContractList?.[chainId] != null) {
            combinedContracts = { ...combinedContracts, ...externalContractList[chainId].contracts };
          }

          const newContracts = Object.keys(combinedContracts).reduce(
            (accumulator: Record<string, any>, contractName: string) => {
              const address: string =
                config.customAddresses && Object.keys(config.customAddresses).includes(contractName)
                  ? config.customAddresses[contractName]
                  : combinedContracts[contractName].address;
              accumulator[contractName] = new Contract(
                address,
                combinedContracts[contractName].abi,
                signer ?? ethersProvider
              );
              return accumulator;
            },
            {}
          );

          if (isMounted()) setContracts(newContracts);
        } catch (e) {
          console.log('⚠ ERROR LOADING CONTRACTS!!', e);
        }
      }
    };

    void loadContracts();
    // disable as configDep is used for dep instead of config
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethersProvider, configDep, networkDeps]);

  return contracts;
};
