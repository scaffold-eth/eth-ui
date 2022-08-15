import { z } from 'zod';

/**
 * #### Summary
 * Zod Schema for {@link TBasicContract}
 */
export const basicContractSchema = z.object({
  address: z.string(),
  abi: z.array(z.any()).optional(),
});

/**
 * #### Summary
 * Describes the sctructure of each contract in hardhat_contracts.json
 *
 * @category Models
 */
export type TBasicContract = z.infer<typeof basicContractSchema>;

/**
 * #### Summary
 * Zod Schema for {@link TBasicContractConfig}
 */
export const basicContractConfigSchema = z.record(
  z.number({ description: 'chainId' }),
  z.object({
    address: z.string(),
    chainId: z.number(),
  })
);

/**
 * #### Summary
 * Describes a basic contract data record.
 * A record of key:chainId.  value:{address, chainId}
 * @category Models
 */
export type TBasicContractConfig = z.infer<typeof basicContractConfigSchema>;

/**
 * #### Summary
 * Zod Schema for {@link TBasicContractMap}
 */
export const basicContractMapSchema = z.record(
  z.string({ description: 'contractName' }),
  z.object({
    config: basicContractConfigSchema,
  })
);

/**
 * #### Summary
 * Contracts by contract name
 * - A record key: contractNames, values: {@link TBasicContractConfig}
 */
export type TBasicContractMap = z.infer<typeof basicContractMapSchema>;

/**
 * #### Summary
 * Zod Schema for {@link THardhatContractDataRecord}
 */
export const hardhatContractDataRecordSchema = z.record(
  z.string({ description: 'contractName' }),
  z.object({
    config: basicContractConfigSchema,
    abi: z.array(z.any()),
  })
);

/**
 * #### Summary
 * Contracts by contract name
 * - A record of key:{contract names}, values: Hardhat contract json
 * - includes chain id
 */
export type THardhatContractDataRecord = z.infer<typeof hardhatContractDataRecordSchema>;
/**
 * #### Summary
 * Zod Schema for {@link TBasicContractMap}
 */
export const deployedHardhatContractsJsonSchema = z.record(
  z.number({ description: 'chainId' }),
  z
    .object({
      name: z.string({ description: 'contractName' }),
      chainId: z.string({ description: 'chainId' }),
      contracts: z.record(z.string({ description: 'contractName' }), basicContractSchema.required()),
    })
    .array()
);

/**
 * #### Summary
 * Describes the structure of hardhat_contracts.json
 * - {chainIds: { networkNames: {contracts} }}, contains an record of contracts
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
export type TDeployedHardhatContractsJson = z.infer<typeof deployedHardhatContractsJsonSchema>;

export const externalContractAddressMap = z.record(
  z.number({ description: 'chainId' }),
  z.record(z.string({ description: 'contractName' }), z.string({ description: 'address' }))
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
 * @depcrated
 * Contract function information:
 * - contractName
 * - functionname
 * - functionArgs: functionArguments, an array
 *
 * @category Models
 */
export type TContractFunctionInfoUntyped = {
  contractName: string;
  functionName: string;
  functionArgs?: any[];
};
