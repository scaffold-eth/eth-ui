import { Contract, utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';
/**
 * #### Summary
 * Checks whether a contract exists on the blockchain
 *
 * #### Notes
 * - uses the ethers.Contract object's provider to access the network
 * - checks the contract address to see if the contract is deployed
 *
 * @category Hooks
 *
 * @param contract ethers.Contract class
 * @returns
 */
export const useContractExistsAtAddress = (contract: Contract | undefined): boolean => {
  const isMounted = useIsMounted();

  const [contractIsDeployed, setContractIsDeployed] = useState(false);

  useEffect(() => {
    /**
     * We can look at the blockchain and see what's stored at `contractAddress`
     * If we find code then we know that a contract exists there.
     * If we find nothing (0x0) then there is no contract deployed to that address
     */
    const checkDeployment = async (): Promise<void> => {
      if (!contract?.provider || !utils.isAddress(contract.address)) {
        if (isMounted()) setContractIsDeployed(false);
        return;
      }

      const bytecode = await contract.provider.getCode(contract.address);
      if (isMounted()) setContractIsDeployed(bytecode !== '0x');
    };

    void checkDeployment();
  }, [contract, isMounted]);

  return contractIsDeployed;
};
