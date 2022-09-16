import { z, ZodType } from 'zod';

// /**
//  * #### Summary
//  * Zod Schema for {@link TBasicContract}
//  */
// export const basicContractSchema = z.object({
//   address: z.string(),
//   abi: z.array(z.any()).optional(),
// });

/**
 * #### Summary
 * Describes the basic structure of each contract
 *
 * @category Models
 */
export type TBasicContract = {
  contractName: string;
  address: string;
  abi?: Readonly<Record<string, any>[]>;
};

/**
 * #### Summary
 * Describes a basic contract data record.
 * A record of key:chainId.  value:{address, chainId}
 * @category Models
 */
export type TBasicContractDeployment = {
  [chainId: number]: {
    chainId: number;
    address: string;
  };
};

// /**
//  * #### Summary
//  * Zod Schema for {@link TBasicContractConfig}
//  */
// export const basicContractConfigSchema = z.record(
//   z.number({ description: 'chainId' }),
//   z.object({
//     address: z.string(),
//     chainId: z.number(),
//   })
// );

/**
 * #### Summary
 * Contracts by contract name
 * - A record key: contractNames, values: {@link TBasicContractDeployment}
 */
export type TContractDeploymentMap = {
  [contractName: string]: {
    config: TBasicContractDeployment;
  };
};
/**
 * #### Summary
 * Zod Schema for {@link TContractDeploymentMap}
 */
export const contractDeploymentMapSchema: ZodType<TContractDeploymentMap> = z.record(
  z.string({ description: 'contractName' }),
  z.object({
    config: z.record(
      z.number({ description: 'chainId' }),
      z.object({
        address: z.string(),
        chainId: z.number(),
      })
    ),
  })
);

/**
 * #### Summary
 * Contracts by contract name, used by eth-hooks to connect and load contracts
 * - A record of key:{contract names}, values: Hardhat contract json
 * - includes chain id
 */

export type TContractMapWithAbi = {
  [contractName: string]: {
    config: TBasicContractDeployment;
    abi: Readonly<Record<string, any>[]>;
  };
};

/**
 * #### Summary
 * Zod Schema for {@link TContractMapWithAbi}
 */

export const contractMapWithAbiSchema: ZodType<TContractMapWithAbi> = z.record(
  z.string({ description: 'contractName' }),
  z.object({
    config: z.record(
      z.number({ description: 'chainId' }),
      z.object({
        address: z.string(),
        chainId: z.number(),
      })
    ),
    abi: z.array(z.any()),
  })
);

/**
 * {chainId: {contract: address}}, contains an record of contracts
 * #### Summary
 * A type for external contracts
 * - it is a record of contract names and their deployed address
 * - this data type is used by {@link ContractsAppContext} to connect to external contracts
 *
 * @category Models
 */
export type TExternalContractsAddressMap = z.infer<typeof externalContractAddressMap>;

/**
 * #### Summary
 * Zod Schema for {@link TExternalContractsAddressMap}
 */
export const externalContractAddressMap = z.record(
  z
    .union([z.string({ description: 'chainId' }), z.number({ description: 'chainId' })])
    .transform((s) => parseInt(s.toString())),
  z.record(z.string({ description: 'contractName' }), z.string({ description: 'address' }))
);
