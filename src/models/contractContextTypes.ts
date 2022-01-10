import { Provider } from '@ethersproject/providers';
import { BaseContract, ethers, Signer } from 'ethers';

export type TConnectorConnectorBase<
  GContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
> = {
  connect: (address: string, signerOrProvider: Signer | Provider) => GContract;
  createInterface: () => GContractInterface;
  abi: Record<string, any>[];
};

export type TContractConnector<
  GContractNames extends string,
  GContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
> = {
  contractName: GContractNames;
  config: {
    [chainId: number]: { address: string };
  };
} & TConnectorConnectorBase<GContract, GContractInterface>;

export type TConnectorList<GContactNames extends string> = {
  [contractName in GContactNames]: TContractConnector<GContactNames, BaseContract, ethers.utils.Interface>;
};

export type TTypedContract<
  GContractNames extends string,
  GAppContractConnectorList
> = GAppContractConnectorList extends {
  [key in GContractNames]: { connect: (address: any, signerOrProvider: any) => infer TypedContract };
}
  ? TypedContract
  : BaseContract;

export type TContractsByName<GContractNames extends string> = Record<
  GContractNames,
  { [chainId: number]: BaseContract | undefined }
>;

export type TContractsByChainId<GContractNames extends string> = Record<
  number,
  { [contractName in GContractNames]: BaseContract | undefined }
>;

/**
 *
 */
export type TAppContractsContext<GContractNames extends string> = {
  contractConnectors: TConnectorList<GContractNames>;
  contractsByName: TContractsByName<GContractNames>;
  contractsByChainId: TContractsByChainId<GContractNames>;
};
/**
 * Creates a default state for the contracts context
 * @returns
 * @internal
 */
export const defaultAppContractsContext = <GContractNames extends string>(): TAppContractsContext<GContractNames> => {
  return {
    contractConnectors: {} as TConnectorList<GContractNames>,
    contractsByName: {} as TContractsByName<GContractNames>,
    contractsByChainId: {} as TContractsByChainId<GContractNames>,
  };
};
