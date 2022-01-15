// export const sortContractsByChainId = <
//   GContractNames extends string,
//   GContracts extends TBaseContractExtended<GContractNames>
// >(
//   contractsByName: TContractsByName<GContractNames, GContracts>
// ): TContractsByChainId<GContractNames, GContracts> => {
//   let contractsByChainId: TContractsByChainId<GContractNames, GContracts> = {};

//   const names: GContractNames[] = Object.keys(contractsByName) as GContractNames[];
//   names.forEach((name) => {
//     const chainIds = Object.keys(contractsByName[name]).map(Number);
//     chainIds.forEach((chainId) => {
//       const contracts: GContracts | undefined = contractsByName[name][chainId];
//       const data = {
//         [chainId]: { [name]: contracts },
//       };
//       const temp = merge(contractsByChainId, data);
//       // @ts-expect-error
//       contractsByChainId = temp as TContractsByChainId<GContractNames, GContracts>;
//     });
//   });
//   return contractsByChainId;
// };

// export const sortContractsByName = <
//   GContractNames extends string,
//   GContracts extends TBaseContractExtended<GContractNames>
// >(
//   contractsByChainId: TContractsByChainId<GContractNames, GContracts>
// ): TContractsByName<GContractNames, GContracts> => {
//   const contractsByName: TContractsByName<GContractNames, GContracts> = {} as TContractsByName<
//     GContractNames,
//     GContracts
//   >;

//   const chainIds = Object.keys(contractsByChainId).map(Number);
//   chainIds.forEach((chainId) => {
//     const names = Object.keys(contractsByChainId[chainId]) as GContractNames[];
//     names.forEach((name) => {
//       const data = {
//         [name]: { [chainId]: contractsByChainId[chainId][name] },
//       };
//       const temp = merge(contractsByName, data);
//       // @ts-expect-error
//       contractsByName = temp as TContractsByName<GContractNames, GContracts>;
//     });
//   });

//   return contractsByName;
// };
