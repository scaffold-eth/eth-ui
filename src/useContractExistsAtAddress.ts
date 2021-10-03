import { utils } from 'ethers';
import { useEffect, useState } from 'react';

import { useEthersContext } from '~~/context';
import { useMounted } from '~~/helpers/hooks/useMounted';

/**
 * Checks whether a contract exists on the blockchain, returns true if it exists, otherwise false
 * 
  ~ Features ~
  - Provide contractAddress to check if the contract is deployed
  - Change provider to check contract address on different chains (ex. mainnetProvider)
 * @param provider (TEthersProvider)
 * @param contractAddress (string) 
 * @returns (boolean)
 */
export const useContractExistsAtAddress = (contractAddress: string | undefined, providerKey?: string): boolean => {
  const isMounted = useMounted();
  const { ethersProvider } = useEthersContext(providerKey);

  const [contractIsDeployed, setContractIsDeployed] = useState(false);

  useEffect(() => {
    /**
     * We can look at the blockchain and see what's stored at `contractAddress`
     * If we find code then we know that a contract exists there.
     * If we find nothing (0x0) then there is no contract deployed to that address
     */
    const checkDeployment = async (): Promise<void> => {
      if (!contractAddress || !utils.isAddress(contractAddress) || !ethersProvider) {
        return;
      }

      const bytecode = await ethersProvider.getCode(contractAddress);
      if (isMounted()) setContractIsDeployed(bytecode !== '0x');
    };

    void checkDeployment();
  }, [ethersProvider, contractAddress, isMounted]);

  return contractIsDeployed;
};
