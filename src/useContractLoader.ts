import { Contract } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { TDeployedContracts, TEthersProviderOrSigner, TExternalContracts } from '~~/models';

/**
 * #### Summary
 * Configuration for useContractLoader
 */
export type TContractConfig = {
  /**
   * your local hardhat network name
   */
  hardhatNetworkName?: string;
  /**
   * the address:contractName key value pair
   */
  customAddresses?: Record<string, string>;
  /**
   * Hardhat deployed contracts
   */
  deployedContracts?: TDeployedContracts;
  /**
   * External contracts (such as DAI)
   */
  externalContracts?: TExternalContracts;
};

/**
 * #### Summary
 *  Loads your contracts returns them and gives options to read values from contracts
 * or write transactions into them
 *
 * #### Notes
 * A optional providerOrSigner is needed to initalize the contract class
 * - if none is given, the context providerOrSigner is used if the chainId is the same.
 * - A signer is required for write contracts
 * Provider
 * - uses the current ethersProvider from context
 * ChainId
 * - if chain id is not given, it will use the chainId of the provider
 *
 * @category Hooks
 *
 * @param config
 * @param providerOrSigner (optional) used to initalize the contract class
 * @param configChainId (optional) can be used to target specific a particular network (such as mainnet) instead of the current provider
 * @returns Record of contractName:Contracts
 */
export const useContractLoader = (
  config: TContractConfig = {},
  providerOrSigner?: TEthersProviderOrSigner,
  configChainId?: number
): Record<string, Contract> => {
  const isMounted = useIsMounted();
  const { ethersProvider, chainId: contextChainId } = useEthersContext();
  const chainId = configChainId ?? contextChainId;

  const [contracts, setContracts] = useState<Record<string, Contract>>({});
  const configDep: string = useMemo(() => JSON.stringify(config ?? {}), [config]);

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

          // load external contracts if its the right chain
          if (externalContractList?.[chainId] != null) {
            combinedContracts = { ...combinedContracts, ...externalContractList[chainId].contracts };
          }

          const newContracts = Object.keys(combinedContracts).reduce(
            (accumulator: Record<string, any>, contractName: string) => {
              const address: string =
                config.customAddresses && Object.keys(config.customAddresses).includes(contractName)
                  ? config.customAddresses[contractName]
                  : combinedContracts[contractName].address;

              // use providerOrSigner, or ethersContext provider or undefined if appropriate
              const provider = providerOrSigner ?? (chainId === contextChainId ? ethersProvider : undefined);
              accumulator[contractName] = new Contract(address, combinedContracts[contractName].abi, provider);
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
  }, [ethersProvider, configDep, chainId]);

  return contracts;
};
