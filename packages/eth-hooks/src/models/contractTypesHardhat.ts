import { z } from 'zod';

import { basicContractConfigSchema, basicContractSchema } from './contractTypes';

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
