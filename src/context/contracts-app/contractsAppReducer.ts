// export type TContractsByName<GContractNames extends string> = {
//   [contractName in GContractNames]: { [chainId: number]: BaseContract };
// };
// export type TContractsByChainId<GContractNames extends string> = {
//   [chainId: number]: { [contractName in GContractNames]: BaseContract };
// };

// export type TContractsAppReducerState<GContractNames extends string> = {
//   contractConnectors: TTypechainContractConnectorList<GContractNames>;
//   contractsByName: TContractsByName<GContractNames>;
//   contractsByChainId: TContractsByChainId<GContractNames>;
// };

// export class AppContractsDefinitions<GContractNames extends string, GTypedContracts>
//   implements TContractsAppReducerState<GContractNames>
// {
//   contractConnectors: TTypechainContractConnectorList<GContractNames>;
//   contractsByName: TContractsByName<GContractNames>;
//   contractsByChainId: TContractsByChainId<GContractNames>;

//   public get getAllContractsByName(): TContractsByName<GContractNames> {
//     return this.contractsByName;
//   }

//   public get getAllContractsByChainId(): TContractsByName<GContractNames> {
//     return this.getAllContractsByChainId;
//   }

//   public getContract<GContract extends TContractTypes<GContractNames, GTypedContracts>>(
//     contractName: GContractNames,
//     chainId: number
//   ): GContract {
//     return this.contractsByName[contractName][chainId] as GContract;
//   }

//   public getContractInstances<GContract extends TContractTypes<GContractNames, GTypedContracts>>(
//     contractName: GContractNames
//   ): { [chainId: number]: GContract } {
//     return this.contractsByName[contractName] as { [chainId: number]: GContract };
//   }

//   protected setContractsByChainId(): void {
//     const contractsByChainId: TContractsByChainId<GContractNames> = {};
//     Object.keys(this.contractsByName).forEach((name: string) => {
//       const contractName = name as GContractNames;
//       Object.keys(this.getAllContractsByName[contractName])
//         .map(Number)
//         .forEach((chainId: number) => {
//           contractsByChainId[chainId][contractName] = this.contractsByName[contractName][chainId];
//         });
//     });

//     this.contractsByChainId = this.contractsByChainId;
//   }

//   public constructor() {
//     this.contractsByName = {} as TContractsByName<GContractNames>;
//     this.contractsByChainId = {};
//     this.contractConnectors = {} as TTypechainContractConnectorList<GContractNames>;
//   }

//   // public constructor(
//   //   contractConnectors: Record<
//   //     GContractNames,
//   //     TTypechainContractConnector<GContractNames, BaseContract, ethers.utils.Interface>
//   //   >
//   // ) {
//   //   this._contractsByName = {} as TContractsByName<GContractNames>;
//   //   this._contractsByChainId = {};
//   //   this._contractConnectors = contractConnectors;
//   // }

//   public static connectToAllContractsReducer = async <GContractNames extends string, GTypedContracts>(
//     ethersAdaptor: TEthersAdaptor | undefined,
//     appContractConnectorList: TTypechainContractConnectorList<GContractNames>
//   ): Promise<AppContractsDefinitions<GContractNames, GTypedContracts>> => {
//     const result = new AppContractsDefinitions<GContractNames, GTypedContracts>();

//     if (!ethersAdaptor) {
//       return result;
//     }

//     await result.connectToAllContracts(ethersAdaptor);
//     return result;
//   };

//   private connectToAllContracts = async (ethersAdaptor: TEthersAdaptor): Promise<void> => {
//     if (!isValidEthersAdaptor(ethersAdaptor)) return;
//     const { chainId, signer } = ethersAdaptorAsRequired(ethersAdaptor);

//     for (const contractName in this.contractConnectors) {
//       const connector = this.contractConnectors[contractName];
//       if (chainId && connector.config[chainId] != null) {
//         const contract = await connectToContractWithSigner(connector, signer);
//         this.contractsByName[contractName][chainId] = contract;
//       }
//     }
//     this.setContractsByChainId();
//   };

//   public static connectToContractReducer = async <GContractNames extends string, GTypedContracts>(
//     definitions: AppContractsDefinitions<GContractNames, GTypedContracts>,
//     contractName: GContractNames,
//     ethersAdaptor: TEthersAdaptor
//   ): Promise<AppContractsDefinitions<GContractNames, GTypedContracts>> => {
//     const newDefinitions = definitions.clone();
//     await newDefinitions.connectToContract(contractName, ethersAdaptor);
//     return newDefinitions;
//   };

//   private connectToContract = async (contractName: GContractNames, ethersAdaptor: TEthersAdaptor): Promise<void> => {
//     if (!isValidEthersAdaptor(ethersAdaptor)) return;
//     const { chainId, signer } = ethersAdaptorAsRequired(ethersAdaptor);

//     const contractConnector = this.contractConnectors[contractName];

//     const contract = await connectToContractWithSigner(contractConnector, signer);
//     this.contractsByName[contractConnector.contractName] = {};
//     this.contractsByName[contractConnector.contractName][chainId] = contract;
//     this.setContractsByChainId();
//   };

//   public getContractInstance = async (
//     ethersAdaptor: TEthersAdaptor,
//     contractName: GContractNames
//   ): Promise<BaseContract | undefined> => {
//     if (!isValidEthersAdaptor(ethersAdaptor)) return;
//     const { chainId } = ethersAdaptorAsRequired(ethersAdaptor);

//     if (this.contractsByName[contractName][chainId] != null) {
//       return this.contractsByName[contractName][chainId];
//     } else if (this.contractConnectors[contractName].config[chainId] != null) {
//       await this.connectToContract(contractName, ethersAdaptor);
//       return this.contractsByName[contractName][chainId];
//     } else {
//       warning(false, `There is no instance of Contract ${contractName} for chain ${chainId}`);
//     }
//     return undefined;
//   };

//   // public static updateConnectorReducer = async <
//   //   GContractNames extends string,
//   //   GTypedContracts,
//   //   GContract extends BaseContract,
//   //   GContractInterface extends ethers.utils.Interface
//   // >(
//   //   definitions: AppContractDefinitions<GContractNames, GTypedContracts>,
//   //   contractName: GContractNames,
//   //   connector: TTypechainContractConnector<GContractNames, GContract, GContractInterface>
//   // ): Promise<AppContractDefinitions<GContractNames, GTypedContracts>> => {
//   //   const result = definitions.clone();
//   //   await result.updateConnector(contractName, connector);
//   //   return result;
//   // };

//   // public updateConnector = async <GContract extends BaseContract, GContractInterface extends ethers.utils.Interface>(
//   //   contractName: GContractNames,
//   //   connector: TTypechainContractConnector<GContractNames, GContract, GContractInterface>,
//   //   ethersAdaptor?: TEthersAdaptor
//   // ): Promise<void> => {
//   //   this._contractConnectors[contractName] = connector;
//   //   if (ethersAdaptor) {
//   //     await this.connectToContract(contractName, ethersAdaptor);
//   //   }
//   // };

//   public clone(): AppContractsDefinitions<GContractNames, GTypedContracts> {
//     const result = new AppContractsDefinitions<GContractNames, GTypedContracts>();
//     // const result = new AppContractDefinitions<GContractNames, GTypedContracts>({
//     //   ...this._contractConnectors,
//     // });
//     result.contractsByName = { ...this.contractsByName };
//     result.contractsByChainId = { ...this.contractsByChainId };

//     return result;
//   }
// }

// export const contractsAppReducerFactory = <GContractNames extends string, GTypedContracts>() => {
//   /**
//    *
//    * @internal
//    *
//    * @param state
//    * @param action
//    * @returns
//    */
//   const reducer = (state: IState, action: TPayloadAction): IState => {
//     const newState: IState = {
//       appContractConnectors: state.appContractConnectors,
//       appContractList: state.appContractList,
//     };
//     switch (action.action) {
//       case 'loadContracts':
//         newState.appContractList = action.payload;
//         break;
//       case 'setAppConnectors':
//         newState.appContractConnectors = action.payload.connectors;
//         newState.appContractList = action.payload.contractList;
//         break;
//       case 'updateConnector':
//         newState.appContractConnectors = state.appContractConnectors;
//         newState.appContractList = state.appContractList;
//         newState.appContractConnectors[action.payload.contractName] = action.payload.connector;
//     }

//     return newState;
//   };

//   return reducer;
// };

// export interface IAppContractsDefinitions<GContractNames extends string> {
//   getmonkeys: GContractNames;
// }

// /** *
//  * @internal
//  */
// interface IState {
//   appContractConnectors: TTypechainContractConnectorList<GContractNames>;
//   appContractList: AppContractList;
// }

// const initalState = (): IState => {
//   return {
//     appContractConnectors: {},
//     appContractList: new AppContractList(),
//   };
// };

// /**
//  * @internal
//  */
// type TSetAppContractConnectorsPayload = {
//   action: 'setAppConnectors';
//   payload: { connectors: TAppContractConnectorList; contractList: AppContractList };
// };

// /**
//  * @internal
//  */
// type TUpdateContractConnectorPayload = {
//   action: 'updateConnector';
//   payload: {
//     contractName: string;
//     connector: TTypechainContractConnector<BaseContract, ethers.utils.Interface>;
//     contract: BaseContract | undefined;
//   };
// };

// /**
//  * @internal
//  */
// type TLoadContractsPayload = {
//   action: 'loadContracts';
//   payload: AppContractList;
// };

// /**
//  *
//  * @internal
//  *
//  */
// type TPayloadAction = TUpdateContractConnectorPayload | TSetAppContractConnectorsPayload | TLoadContractsPayload;
